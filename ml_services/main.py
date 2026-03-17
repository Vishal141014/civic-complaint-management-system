from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, field_validator
from predict import analyze

app = FastAPI(
    title="Complaint Sentiment & Urgency Service",
    description="Detects language, translates if needed, and scores complaints with VADER.",
    version="1.0.0",
)


# ---------- Request / Response schemas ----------

class PredictRequest(BaseModel):
    text: str

    @field_validator("text")
    @classmethod
    def text_must_not_be_empty(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError("text must not be empty")
        return v.strip()


class PredictResponse(BaseModel):
    sentiment: str
    urgency: str
    anger_score: float
    compound_score: float
    translated_text: str | None
    detected_language: str


# ---------- Routes ----------

@app.get("/health", tags=["Health"])
def health_check():
    """Liveness probe — returns 200 if the service is running."""
    return {"status": "ok"}


@app.post("/predict", response_model=PredictResponse, tags=["Prediction"])
def predict(payload: PredictRequest):
    """
    Analyse the sentiment and urgency of a complaint text.

    - Detects the language automatically.
    - Translates to English when the source is not English.
    - Runs VADER and maps scores to sentiment + urgency labels.
    """
    try:
        result = analyze(payload.text)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    return result


# ---------- Entry point ----------

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
