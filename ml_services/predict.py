import re
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from deep_translator import GoogleTranslator
from langdetect import detect, detect_langs, LangDetectException

_analyzer = SentimentIntensityAnalyzer()
_translator = GoogleTranslator(source='auto', target='en')

# Hindi/Hinglish keywords that indicate urgency
URGENT_KEYWORDS = [
    "nahi aa raha",
    "band hai",
    "toot gaya",
    "bahut bura",
    "buri baat",
    "problem ho rahi",
    "emergency",
    "turant",
    "jaldi",
    "please",
    "kab tak",
    "koi nahi sunta",
    "complain",
]

# Pattern for detecting "X days" (e.g., "3 din", "5 din")
DIN_PATTERN = r"\d+\s*(?:din|day)"


def count_urgent_keywords(text: str) -> int:
    """Count how many urgent keywords appear in the text."""
    text_lower = text.lower()
    count = 0
    for keyword in URGENT_KEYWORDS:
        if keyword in text_lower:
            count += 1
    return count


def has_din_pattern(text: str) -> bool:
    """Check if text contains 'X din' or 'X day' pattern (e.g., '3 din', '5 days')."""
    return bool(re.search(DIN_PATTERN, text, re.IGNORECASE))


def analyze(text: str) -> dict:
    """
    Analyzes sentiment with intelligent language handling and urgency boosting.
    
    Steps:
    1. Detect language with confidence checking
    2. If not English with high confidence, translate to English
    3. Run VADER sentiment analysis
    4. Apply keyword-based urgency boosting for Hindi/Hinglish
    """
    translated_text: str | None = None
    detected_language: str = "en"
    confidence: float = 0.0

    # --- Language detection with confidence ---
    try:
        # detect_langs returns list sorted by probability, highest first
        lang_probs = detect_langs(text)
        if lang_probs:
            detected_language = lang_probs[0].lang
            confidence = lang_probs[0].prob
    except LangDetectException:
        detected_language = "en"
        confidence = 1.0

    # --- Translation logic: translate unless detected "en" with high confidence ---
    should_translate = not (detected_language == "en" and confidence > 0.7)

    if should_translate and detected_language != "en":
        try:
            translated_text = _translator.translate(text)
        except Exception:
            # Fall back to original text if translation fails
            translated_text = text
        working_text = translated_text
    else:
        working_text = text

    # --- VADER sentiment analysis on (potentially translated) text ---
    scores = _analyzer.polarity_scores(working_text)
    compound: float = scores["compound"]

    # Map compound score to sentiment label
    if compound >= 0.05:
        sentiment = "POSITIVE"
    elif compound <= -0.05:
        sentiment = "NEGATIVE"
    else:
        sentiment = "NEUTRAL"

    # --- Initial urgency from VADER compound score ---
    if compound <= -0.6:
        urgency = "HIGH"
    elif compound <= -0.2:
        urgency = "MEDIUM"
    else:
        urgency = "LOW"

    # --- Keyword-based urgency boosting (check ORIGINAL text) ---
    keyword_count = count_urgent_keywords(text)
    has_din = has_din_pattern(text)

    # If X din pattern found, always bump to at least MEDIUM
    if has_din and urgency == "LOW":
        urgency = "MEDIUM"

    # If 2+ keywords found, bump to HIGH (unless already HIGH)
    if keyword_count >= 2 and urgency != "HIGH":
        urgency = "HIGH"
    # If 1+ keywords found and current urgency is LOW/NEUTRAL, bump to MEDIUM
    elif keyword_count >= 1 and urgency == "LOW":
        urgency = "MEDIUM"

    # anger_score: VADER's negative component (closest proxy for anger)
    anger_score: float = round(scores["neg"], 4)

    return {
        "sentiment": sentiment,
        "urgency": urgency,
        "anger_score": anger_score,
        "compound_score": round(compound, 4),
        "translated_text": translated_text,
        "detected_language": detected_language,
        "detection_confidence": round(confidence, 4),
        "keyword_count": keyword_count,
    }
