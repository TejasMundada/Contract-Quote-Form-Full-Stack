
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, PieChart, Pie, LineChart, Line, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

const Dashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [mockData, setMockData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stateFilter, setStateFilter] = useState('');
  const [roofTypeFilter, setRoofTypeFilter] = useState('');


  const loadMockData = async () => {
    try {
      const res = await fetch("./mock_roofing_data.json");
      const data = await res.json();
      setMockData(data);
      setQuotes([ ...quotes, ...data ]);
    } catch (err) {
      console.error("Failed to load mock data:", err);
    }
  };


  const fetchQuotes = async () => {
    try {
      setLoading(true);
      let url = 'http://localhost:8000/api/quotes';
      const queryParams = [];
      if (stateFilter) queryParams.push(`state=${stateFilter}`);
      if (roofTypeFilter) queryParams.push(`roof_type=${roofTypeFilter}`);
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }
      const response = await axios.get(url);
      setApiData(response.data);
      setQuotes([ ...quotes, ...response.data ]);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMockData();
    fetchQuotes();
  }, [stateFilter, roofTypeFilter]);
  
  useEffect(() => {
    console.log(quotes)
  }, [quotes])

  const getProjectsByState = () => {
    const counts = {};
    quotes.forEach(q => {
      counts[q.state] = (counts[q.state] || 0) + 1;
    });
    return Object.entries(counts).map(([state, count]) => ({ state, count }));
  };

  const getAverageRoofSizeByType = () => {
    const totals = {};
    const counts = {};
    quotes.forEach(q => {
      totals[q.roofType] = (totals[q.roofType] || 0) + q.roofSize;
      counts[q.roofType] = (counts[q.roofType] || 0) + 1;
    });
    return Object.keys(totals).map(type => ({
      type,
      avgSize: totals[type] / counts[type],
    }));
  };

  const getMonthlyTrends = () => {
    const trends = {};
    quotes.forEach(q => {
      const month = q.project_date.slice(0, 7); // yyyy-mm
      trends[month] = (trends[month] || 0) + 1;
    });
    return Object.entries(trends).map(([month, count]) => ({ month, count }));
  };

  const totalProjects = quotes.length;
  const avgRoofSize = totalProjects > 0
    ? (quotes.reduce((acc, q) => acc + q.roofSize, 0) / totalProjects).toFixed(2)
    : 0;

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Performance Dashboard</h2>

        <div className="flex flex-wrap gap-6 justify-center mb-8">
          <div>
            <label className="block mb-1 font-medium text-gray-700">State</label>
            <select
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="AZ">AZ</option>
              <option value="CA">CA</option>
              <option value="NY">NY</option>
              <option value="TX">TX</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Roof Type</label>
            <select
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
              value={roofTypeFilter}
              onChange={(e) => setRoofTypeFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="Metal">Metal</option>
              <option value="TPO">TPO</option>
              <option value="Foam">Foam</option>
            </select>
          </div>
        </div>

        {loading && <p className="text-blue-500 mb-4 text-center">Loading data...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-4 text-lg text-gray-700">Projects by State</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={getProjectsByState()}>
                <XAxis dataKey="state" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-4 text-lg text-gray-700">Average Roof Size by Type</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  dataKey="avgSize"
                  data={getAverageRoofSizeByType()}
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {getAverageRoofSizeByType().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h3 className="font-semibold mb-4 text-lg text-gray-700">Monthly Project Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={getMonthlyTrends()}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-gray-800">
          <h3 className="font-semibold mb-4 text-lg">Summary</h3>
          <p><strong>Total Projects:</strong> {totalProjects}</p>
          <p><strong>Average Roof Size:</strong> {avgRoofSize} sq ft</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


