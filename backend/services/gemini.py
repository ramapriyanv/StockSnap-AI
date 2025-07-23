import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_summary(stock_data: dict) -> str:
    prompt = f"""
You are a helpful AI financial analyst.

Using the following stock data, generate a clear and structured summary for a casual investor:

- Ticker: {stock_data['ticker']}
- Current Price: ${stock_data['price']}
- Earnings Per Share (EPS): {stock_data['eps']}
- Price-to-Earnings Ratio (P/E): {stock_data['pe_ratio']}
- Volume: {stock_data['volume']}

Write the summary using the following format:

💬 AI Summary  
Let’s break down {stock_data['ticker']} stock data for a casual investor:

---

🔢 The Essentials  
Explain the price, EPS, P/E ratio, and volume in simple terms (bullet list format).

---

📊 Valuation Insight  
Give a plain-English interpretation of the P/E ratio. Is the stock likely undervalued, overvalued, or fairly priced? Be objective.

---

🤔 What Might an Average Investor Think?  
List 2–3 casual reactions a retail investor might have after seeing this data.

---

⚠️ Final Note  
Add a disclaimer that this is not financial advice and more research is needed.

Keep the tone informative, clear, and friendly — avoid filler or repetition.
"""
    
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text.strip()
