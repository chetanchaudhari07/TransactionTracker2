import React from 'react';
import { format } from 'date-fns';
import { ArrowUpCircle, DollarSign, PieChart, TrendingUp } from 'lucide-react';

const Dashboard = ({ totalSpending, spendingByCategory, spendingTrends }) => {
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

  const calculateChange = () => {
    if (spendingTrends.length < 2) return { value: 0, isIncrease: false };

    const current = spendingTrends[spendingTrends.length - 1].amount;
    const previous = spendingTrends[spendingTrends.length - 2].amount;

    if (previous === 0) return { value: 0, isIncrease: false };

    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change),
      isIncrease: change > 0,
    };
  };

  const change = calculateChange();

  return (
    <div className="space-y-6 animate-fade-in">

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Spending</p>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">{formatCurrency(totalSpending)}</h2>

            {spendingTrends.length >= 2 && (
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium inline-flex items-center ${change.isIncrease ? 'text-red-600' : 'text-emerald-600'
                  }`}>
                  {change.isIncrease ? (
                    <ArrowUpCircle size={16} className="mr-1" />
                  ) : (
                    <ArrowUpCircle size={16} className="mr-1 transform rotate-180" />
                  )}
                  {change.value.toFixed(1)}% from last month
                </span>
              </div>
            )}
          </div>
          <div className="p-3 bg-indigo-100 rounded-full">
            <DollarSign size={24} className="text-indigo-600" />
          </div>
        </div>
      </div>


      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Spending by Category</h3>
            <div className="p-2 bg-indigo-100 rounded-full">
              <PieChart size={18} className="text-indigo-600" />
            </div>
          </div>

          {spendingByCategory.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No data available</p>
            </div>
          ) : (
            <div className="space-y-3">
              {spendingByCategory.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{
                        backgroundColor: `hsl(${item.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360
                          }, 70%, 60%)`
                      }}
                    />
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900 font-medium">{formatCurrency(item.value)}</span>
                    <span className="ml-2 text-xs text-gray-500">
                      {((item.value / totalSpending) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>


        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Monthly Spending Trends</h3>
            <div className="p-2 bg-indigo-100 rounded-full">
              <TrendingUp size={18} className="text-indigo-600" />
            </div>
          </div>

          {spendingTrends.length < 2 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Not enough data for trends</p>
              <p className="text-sm text-gray-400 mt-1">Add more transactions over time</p>
            </div>
          ) : (
            <div className="h-48 mt-4">
              <div className="relative h-full">

                <div className="flex items-end justify-between h-40 w-full">
                  {spendingTrends.map((item, index) => {
                    const maxAmount = Math.max(...spendingTrends.map(t => t.amount));
                    const height = maxAmount > 0 ? (item.amount / maxAmount) * 100 : 0;

                    return (
                      <div key={item.date} className="flex flex-col items-center w-1/6">
                        <div
                          className="w-12 bg-indigo-500 hover:bg-indigo-600 rounded-t-md transition-all duration-200 relative group"
                          style={{ height: `${height}%` }}
                        >
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                              {formatCurrency(item.amount)}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 mt-2 whitespace-nowrap">
                          {formatMonth(item.date)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
