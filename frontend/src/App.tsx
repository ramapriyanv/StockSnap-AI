import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import StockChart from './components/StockChart';
import ReactMarkdown from 'react-markdown';


function App() {
  const [ticker, setTicker] = useState('');
  const [loading, setLoading] = useState(false);
  const [stockData, setStockData] = useState<any | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setStockData(null);
    setSummary(null);

    try {
      // Fetch stock data
      const stockRes = await axios.get(`https://stocksnap-ai.onrender.com/stock?ticker=${ticker}`);
      setStockData(stockRes.data);

      // Fetch AI summary
      const summaryRes = await axios.post(
  `https://stocksnap-ai.onrender.com/summarize`,
  stockRes.data,
  { headers: { 'Content-Type': 'application/json' } }
);
      setSummary(summaryRes.data.summary);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch data. Please check the ticker or try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  if (stockData?.ticker) {
    document.title = `${stockData.ticker} – StockSnap AI`;
  } else {
    document.title = "StockSnap AI";
  }
}, [stockData]);


  return (
    <div className="app-container">
      <h1>📈 StockSnap AI</h1>

      <form onSubmit={handleSubmit} className="ticker-form">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="Enter stock ticker (e.g. AAPL)"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Analyze'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {stockData && (
        <div className="results">
          <h2>{stockData.ticker} Snapshot</h2>
          <ul>
            <li><strong>Price:</strong> ${stockData.price}</li>
            <li><strong>P/E Ratio:</strong> {stockData.pe_ratio}</li>
            <li><strong>EPS:</strong> {stockData.eps}</li>
            <li><strong>Volume:</strong> {stockData.volume?.toLocaleString()}</li>
          </ul>
        </div>
      )}
      {stockData?.history && stockData?.dates && (
  <StockChart history={stockData.history} dates={stockData.dates} />
)}


      {summary && (
  <div className="summary-box">
    <h3>💬 AI Summary</h3>
    <ReactMarkdown>{summary}</ReactMarkdown>
  </div>
)}
    </div>
  );
}

export default App;
