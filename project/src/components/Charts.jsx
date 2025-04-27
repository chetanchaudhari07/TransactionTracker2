import React from 'react';
import { PieChart as RechartPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip } from 'recharts';
import { format } from 'date-fns';

const COLORS = [
  '#4F46E5',
  '#10B981',
  '#8B5CF6',
  '#F59E0B',
  '#EF4444',
  '#3B82F6',
  '#EC4899',
  '#6366F1',
  '#14B8A6',
  '#F97316',
];

const Charts = ({ spendingByCategory, spendingTrends, totalSpending }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatMonth = (dateStr) => {
    const [year, month] = dateStr.split('-');
    return format(new Date(parseInt(year), parseInt(month) - 1), 'MMM yyyy');
  };

  const lineChartData = spendingTrends.map((item) => ({
    name: formatMonth(item.date),
    amount: item.amount,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-indigo-600 font-medium">
            {formatCurrency(payload[0].value)}
          </p>
          <p className="text-gray-500 text-sm">
            {((payload[0].value / totalSpending) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const LineChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-indigo-600 font-medium">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-8 animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Detailed Analysis</h2>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">Spending by Category</h3>
        <div className="h-80">
          {spendingByCategory.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No data available</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <RechartPieChart>
                <Pie
                  data={spendingByCategory}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={60}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ value }) => `$${value.toFixed(2)}`}
                  animationDuration={800}
                >
                  {spendingByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </RechartPieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">Monthly Spending Trends</h3>
        <div className="h-80">
          {spendingTrends.length < 2 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Not enough data for trends</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <LineTooltip content={<LineChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#4F46E5"
                  strokeWidth={3}
                  dot={{ r: 6, fill: '#4F46E5', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8, fill: '#4F46E5', strokeWidth: 2, stroke: '#fff' }}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts;
