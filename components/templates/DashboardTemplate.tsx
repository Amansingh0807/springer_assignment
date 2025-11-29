'use client';

import React, { useState, useMemo } from 'react';
import { SalesChart } from '../organisms/SalesChart';
import { YearComparisonChart } from '../organisms/YearComparisonChart';
import { FilterInput } from '../molecules/FilterInput';
import { StatCard } from '../molecules/StatCard';
import { sales2022, sales2023, sales2024 } from '@/lib/data';
import { ChartType } from '../molecules/ChartSwitcher';
import { LayoutDashboard, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';
import { ThemeToggle } from '../atoms/ThemeToggle';
import { 
    calculateTotalSales, 
    calculateAverageSales, 
    calculateGrowth,
    formatCurrency,
    formatPercentage
} from '@/lib/utils';

export const DashboardTemplate: React.FC = () => {
    const [threshold, setThreshold] = useState<number>(0);
    const [chartType2024, setChartType2024] = useState<ChartType>('bar');
    const [chartType2023, setChartType2023] = useState<ChartType>('line');
    const [chartType2022, setChartType2022] = useState<ChartType>('bar');

    // Calculate statistics
    const stats = useMemo(() => ({
        total2024: calculateTotalSales(sales2024),
        total2023: calculateTotalSales(sales2023),
        total2022: calculateTotalSales(sales2022),
        avg2024: calculateAverageSales(sales2024),
        growth2024: calculateGrowth(sales2024, sales2023),
        growth2023: calculateGrowth(sales2023, sales2022),
    }), []);

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-600/20">
                            <LayoutDashboard size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-black dark:text-white tracking-tight">Sales Dashboard</h1>
                            <p className="text-zinc-500 dark:text-zinc-400">Overview of sales performance across years</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="flex-1 md:flex-none bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <FilterInput
                                label="Minimum Sales Threshold"
                                type="number"
                                placeholder="e.g. 15000"
                                value={threshold || ''}
                                onChange={(e) => setThreshold(Number(e.target.value))}
                            />
                        </div>
                        <ThemeToggle />
                    </div>
                </header>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Total Sales 2024"
                        value={formatCurrency(stats.total2024)}
                        subtitle="Year to date"
                        icon={DollarSign}
                        trend="up"
                        trendValue={formatPercentage(stats.growth2024)}
                    />
                    <StatCard
                        title="Average Monthly Sales"
                        value={formatCurrency(stats.avg2024)}
                        subtitle="2024 average"
                        icon={BarChart3}
                    />
                    <StatCard
                        title="2023 Growth"
                        value={formatPercentage(stats.growth2023)}
                        subtitle="vs 2022"
                        icon={TrendingUp}
                        trend={stats.growth2023 >= 0 ? 'up' : 'down'}
                        trendValue={formatCurrency(stats.total2023)}
                    />
                    <StatCard
                        title="Total Sales 2022"
                        value={formatCurrency(stats.total2022)}
                        subtitle="Baseline year"
                        icon={DollarSign}
                    />
                </div>

                {/* Year Comparison Chart */}
                <YearComparisonChart 
                    data2022={sales2022}
                    data2023={sales2023}
                    data2024={sales2024}
                />

                {/* Individual Year Charts */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Detailed Year Views</h2>
                    </div>
                    
                    <div className="w-full">
                        <SalesChart
                            data={sales2024}
                            year={2024}
                            chartType={chartType2024}
                            onChartTypeChange={setChartType2024}
                            threshold={threshold}
                        />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <SalesChart
                            data={sales2023}
                            year={2023}
                            chartType={chartType2023}
                            onChartTypeChange={setChartType2023}
                            threshold={threshold}
                        />

                        <SalesChart
                            data={sales2022}
                            year={2022}
                            chartType={chartType2022}
                            onChartTypeChange={setChartType2022}
                            threshold={threshold}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

