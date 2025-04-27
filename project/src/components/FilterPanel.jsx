import React, { useState } from 'react';
import { FilterX, Filter } from 'lucide-react';
import { format } from 'date-fns';

const FilterPanel = ({ filters, setFilters, categories }) => {
  const [startDate, setStartDate] = useState(filters.startDate || '');
  const [endDate, setEndDate] = useState(filters.endDate || '');
  const [category, setCategory] = useState(filters.category || '');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleApplyFilters = () => {
    setFilters({
      startDate: startDate || null,
      endDate: endDate || null,
      category: category || null,
    });
  };

  const handleResetFilters = () => {
    setStartDate('');
    setEndDate('');
    setCategory('');
    setFilters({
      startDate: null,
      endDate: null,
      category: null,
    });
  };

  const hasActiveFilters = filters.startDate || filters.endDate || filters.category;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 animate-fade-in">
      <div
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Filter size={18} className="text-indigo-600 mr-2" />
          <h3 className="font-medium text-gray-800">
            {hasActiveFilters ? 'Filtered View' : 'Filter Transactions'}
          </h3>
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full">
              Active
            </span>
          )}
        </div>
        <div>
          <button
            type="button"
            className={`p-1 rounded-full transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 pt-0 border-t border-gray-100 animate-slide-down">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category-filter"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <FilterX size={16} className="mr-1" />
              Reset
            </button>
            <button
              type="button"
              onClick={handleApplyFilters}
              className="flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Apply Filters
            </button>
          </div>

          {hasActiveFilters && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                <span className="font-medium">Active filters: </span>
                {filters.startDate && filters.endDate && (
                  <span className="mr-2">
                    {format(new Date(filters.startDate), 'MMM d, yyyy')} - {format(new Date(filters.endDate), 'MMM d, yyyy')}
                  </span>
                )}
                {filters.category && (
                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs">
                    {filters.category}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
