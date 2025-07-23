from fastapi import APIRouter, Query
from schemas.stock import StockData
import yfinance as yf

stock_router = APIRouter()

@stock_router.get("/stock")
def get_stock_data(ticker: str = Query(...)):
    try:
        stock = yf.Ticker(ticker)
        hist = stock.history(period="1mo")

        info = stock.info
        data = {
            "ticker": ticker.upper(),
            "price": info.get("currentPrice"),
            "pe_ratio": info.get("trailingPE"),
            "eps": info.get("trailingEps"),
            "volume": info.get("volume"),
            "history": hist["Close"].fillna(method="ffill").round(2).tolist(),
            "dates": hist.index.strftime("%Y-%m-%d").tolist()
        }
        return data
    except Exception as e:
        return {"error": str(e)}

from fastapi import Request
from services.gemini import generate_summary

@stock_router.post("/summarize")
async def summarize_stock(stock: StockData):
    try:
        summary = generate_summary(stock.dict())
        return {"summary": summary}
    except Exception as e:
        return {"error": str(e)}

