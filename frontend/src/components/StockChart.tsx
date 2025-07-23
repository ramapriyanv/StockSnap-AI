import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Props = {
  history: number[];
  dates: string[];
};

export default function StockChart({ history, dates }: Props) {
  const data = dates.map((date, index) => ({
    date,
    price: history[index],
  }));

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>📉 Price Chart (Last 1 Month)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#0077ff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
