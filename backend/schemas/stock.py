from pydantic import BaseModel

class StockData(BaseModel):
    ticker: str
    price: float
    pe_ratio: float
    eps: float
    volume: int
