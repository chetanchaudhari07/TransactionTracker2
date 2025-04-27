export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string; // ISO string format
}

export interface TransactionFilters {
  startDate: string | null;
  endDate: string | null;
  category: string | null;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface TrendData {
  date: string;
  amount: number;
}