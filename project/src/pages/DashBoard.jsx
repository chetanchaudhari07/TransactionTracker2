import React, { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/fireBase';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import Dashboard from '../components/Dashboard';
import Charts from '../components/Charts';
import FilterPanel from '../components/FilterPanel';
import { PlusCircle, X, BarChart4, ListFilter, Wallet, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ViewMode = {
    DASHBOARD: 'dashboard',
    TRANSACTIONS: 'transactions',
    CHARTS: 'charts',
};

function DashBoard() {
    const navigate = useNavigate();
    const {
        transactions,
        totalSpending,
        spendingByCategory,
        spendingTrends,
        categories,
        filters,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        setFilters,
    } = useTransactions();

    const [showTransactionForm, setShowTransactionForm] = useState(false);
    const [currentView, setCurrentView] = useState(ViewMode.DASHBOARD);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('user');
            alert('Logout Successful!');
            navigate('/');
        } catch (error) {
            console.error('Logout Error: ', error);
            alert('An error occurred while logging out');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-indigo-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Wallet
                                className="h-8 w-8 mr-2"
                                onClick={() => window.location.reload()}
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setShowTransactionForm(true)}
                                className="bg-white text-indigo-600 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 transition-colors flex items-center"
                            >
                                <PlusCircle className="h-5 w-5 mr-1" />
                                <span>Add Transaction</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-white text-red-600 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 transition-colors flex items-center"
                            >
                                <LogOut className="h-5 w-5 mr-1" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-3/4 space-y-6">
                        <div className="bg-white rounded-lg shadow-md p-2 flex justify-between">
                            <div className="flex">
                                <button
                                    onClick={() => setCurrentView(ViewMode.DASHBOARD)}
                                    className={`px-4 py-2 rounded-md flex items-center ${currentView === ViewMode.DASHBOARD
                                            ? 'bg-indigo-100 text-indigo-700'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <BarChart4 className="h-5 w-5 mr-1" />
                                    Dashboard
                                </button>
                                <button
                                    onClick={() => setCurrentView(ViewMode.TRANSACTIONS)}
                                    className={`px-4 py-2 rounded-md flex items-center ${currentView === ViewMode.TRANSACTIONS
                                            ? 'bg-indigo-100 text-indigo-700'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <ListFilter className="h-5 w-5 mr-1" />
                                    Transactions
                                </button>
                                <button
                                    onClick={() => setCurrentView(ViewMode.CHARTS)}
                                    className={`px-4 py-2 rounded-md flex items-center ${currentView === ViewMode.CHARTS
                                            ? 'bg-indigo-100 text-indigo-700'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <BarChart4 className="h-5 w-5 mr-1" />
                                    Charts
                                </button>
                            </div>
                        </div>

                        <FilterPanel
                            filters={filters}
                            setFilters={setFilters}
                            categories={categories}
                        />

                        {currentView === ViewMode.DASHBOARD && (
                            <Dashboard
                                totalSpending={totalSpending}
                                spendingByCategory={spendingByCategory}
                                spendingTrends={spendingTrends}
                            />
                        )}

                        {currentView === ViewMode.TRANSACTIONS && (
                            <TransactionList
                                transactions={transactions}
                                onDeleteTransaction={deleteTransaction}
                                onUpdateTransaction={updateTransaction}
                            />
                        )}

                        {currentView === ViewMode.CHARTS && (
                            <Charts
                                spendingByCategory={spendingByCategory}
                                spendingTrends={spendingTrends}
                                totalSpending={totalSpending}
                            />
                        )}
                    </div>

                    <div className="w-full lg:w-1/4">
                        {showTransactionForm ? (
                            <TransactionForm
                                onAddTransaction={addTransaction}
                                onCancel={() => setShowTransactionForm(false)}
                                categories={categories}
                            />
                        ) : (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Total Transactions</p>
                                        <p className="text-2xl font-bold text-indigo-600">{transactions.length}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Categories</p>
                                        <p className="text-2xl font-bold text-indigo-600">{spendingByCategory.length}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Largest Transaction</p>
                                        <p className="text-2xl font-bold text-indigo-600">
                                            {transactions.length > 0
                                                ? new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                }).format(
                                                    Math.max(...transactions.map((t) => t.amount))
                                                )
                                                : '$0.00'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Average Transaction</p>
                                        <p className="text-2xl font-bold text-indigo-600">
                                            {transactions.length > 0
                                                ? new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                }).format(
                                                    transactions.reduce((sum, t) => sum + t.amount, 0) /
                                                    transactions.length
                                                )
                                                : '$0.00'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowTransactionForm(true)}
                                    className="w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
                                >
                                    <PlusCircle className="h-5 w-5 mr-1" />
                                    <span>Add Transaction</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <footer className="bg-white mt-6 py-4 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-500 text-sm">
                        FinanceTracker © {new Date().getFullYear()} - Your personal finance companion
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default DashBoard;
