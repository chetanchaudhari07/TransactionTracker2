import { useState, useEffect, useMemo, useCallback } from 'react';
import { isWithinInterval, parseISO } from 'date-fns';

export const DEFAULT_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Utilities',
  'Housing',
  'Healthcare',
  'Education',
  'Travel',
  'Other'
];

const STORAGE_KEY = 'finance-tracker-transactions';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    category: null
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = () => {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        try {
          setTransactions(JSON.parse(storedData));
        } catch (e) {
          console.error('Failed to parse stored transactions', e);
          setTransactions([]);
        }
      }
      setIsLoading(false);
    };

    loadTransactions();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions, isLoading]);

  const addTransaction = useCallback((transaction) => {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID()
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    return newTransaction;
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateTransaction = useCallback((updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const transactionDate = parseISO(transaction.date);

      if (filters.startDate && filters.endDate) {
        const start = parseISO(filters.startDate);
        const end = parseISO(filters.endDate);
        if (!isWithinInterval(transactionDate, { start, end })) {
          return false;
        }
      }

      if (filters.category && transaction.category !== filters.category) {
        return false;
      }

      return true;
    });
  }, [transactions, filters]);

  const totalSpending = useMemo(() => {
    return filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  }, [filteredTransactions]);

  const spendingByCategory = useMemo(() => {
    const result = {};

    filteredTransactions.forEach((transaction) => {
      if (!result[transaction.category]) {
        result[transaction.category] = 0;
      }
      result[transaction.category] += transaction.amount;
    });

    return Object.entries(result).map(([name, value]) => ({ name, value }));
  }, [filteredTransactions]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set();

    DEFAULT_CATEGORIES.forEach((cat) => uniqueCategories.add(cat));

    transactions.forEach((t) => uniqueCategories.add(t.category));

    return Array.from(uniqueCategories).sort();
  }, [transactions]);

  const spendingTrends = useMemo(() => {
    const monthlyTotals = {};

    filteredTransactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!monthlyTotals[monthYear]) {
        monthlyTotals[monthYear] = 0;
      }

      monthlyTotals[monthYear] += transaction.amount;
    });

    return Object.entries(monthlyTotals)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredTransactions]);

  return {
    transactions: filteredTransactions,
    allTransactions: transactions,
    totalSpending,
    spendingByCategory,
    spendingTrends,
    categories,
    filters,
    isLoading,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    setFilters,
  };
};
