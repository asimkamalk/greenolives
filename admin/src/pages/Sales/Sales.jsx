import React, { useEffect, useState } from 'react';
import './Sales.css';
import { url, currency } from '../../assets/assets';
import axios from 'axios';

const Sales = () => {
  const [tab, setTab] = useState('daily');
  const [sales, setSales] = useState({ daily: null, monthly: null, yearly: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSales = async () => {
    setLoading(true);
    setError('');
    try {
      const [daily, monthly, yearly] = await Promise.all([
        axios.get(`${url}/api/order/sales/daily`),
        axios.get(`${url}/api/order/sales/monthly`),
        axios.get(`${url}/api/order/sales/yearly`)
      ]);
      setSales({
        daily: daily.data,
        monthly: monthly.data,
        yearly: yearly.data
      });
    } catch (err) {
      setError('Failed to fetch sales data');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div className="sales add">
      <h3>Sales</h3>
      <div className="sales-tabs">
        <button className={tab === 'daily' ? 'active' : ''} onClick={() => setTab('daily')}>Daily</button>
        <button className={tab === 'monthly' ? 'active' : ''} onClick={() => setTab('monthly')}>Monthly</button>
        <button className={tab === 'yearly' ? 'active' : ''} onClick={() => setTab('yearly')}>Yearly</button>
      </div>
      <div className="sales-content">
        {loading && <div>Loading sales data...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {!loading && !error && (
          <>
            {tab === 'daily' && sales.daily && (
              <div>
                <h4>Daily Delivered Sales</h4>
                <p>Total Delivered Orders: <b>{sales.daily.count}</b></p>
                <p>Total Sales: <b>{currency}{sales.daily.total}</b></p>
              </div>
            )}
            {tab === 'monthly' && sales.monthly && (
              <div>
                <h4>Monthly Delivered Sales</h4>
                <p>Total Delivered Orders: <b>{sales.monthly.count}</b></p>
                <p>Total Sales: <b>{currency}{sales.monthly.total}</b></p>
              </div>
            )}
            {tab === 'yearly' && sales.yearly && (
              <div>
                <h4>Yearly Delivered Sales</h4>
                <p>Total Delivered Orders: <b>{sales.yearly.count}</b></p>
                <p>Total Sales: <b>{currency}{sales.yearly.total}</b></p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Sales; 