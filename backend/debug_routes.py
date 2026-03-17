"""
Debug script to print all registered routes in the FastAPI app
"""

from main import app

print("\n" + "="*70)
print("REGISTERED ROUTES IN FASTAPI APP")
print("="*70 + "\n")

for route in app.routes:
    if hasattr(route, "path"):
        methods = getattr(route, "methods", ["GET"])
        methods_str = ", ".join(sorted(methods)) if methods else "GET"
        print(f"  {route.path:40} | {methods_str}")

print("\n" + "="*70 + "\n")
