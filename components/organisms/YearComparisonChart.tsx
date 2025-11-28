'use client';

import React, { useState } from 'react';
import { 
    BarChart, Bar, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Card } from '../atoms/Card';
import { ChartSwitcher, ChartType } from '../molecules/ChartSwitcher';
import { SaleData } from '@/lib/data';

interface YearComparisonChartProps {
    data2022: SaleData[];
    data2023: SaleData[];
    data2024: SaleData[];
}

export const YearComparisonChart: React.FC<YearComparisonChartProps> = ({ 
    data2022, 
    data2023, 
    data2024 
}) => {
    const [chartType, setChartType] = useState<ChartType>('bar');

    // Merge data from all three years
    const mergedData = data2022.map((item, index) => ({
        month: item.month,
        '2022': item.sales,
        '2023': data2023[index]?.sales || 0,
        '2024': data2024[index]?.sales || 0,
    }));

    const renderChart = () => {
        switch (chartType) {
            case 'line':
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={mergedData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                            <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="2022" stroke="#f59e0b" strokeWidth={2} />
                            <Line type="monotone" dataKey="2023" stroke="#10b981" strokeWidth={2} />
                            <Line type="monotone" dataKey="2024" stroke="#2563eb" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                );
            case 'bar':
            default:
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={mergedData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                            <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                                cursor={{ fill: 'transparent' }}
                            />
                            <Legend />
                            <Bar dataKey="2022" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="2023" fill="#10b981" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="2024" fill="#2563eb" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                );
        }
    };

    return (
        <Card className="w-full h-full flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between flex-wrap gap-2">
                <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                        Year-over-Year Comparison
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-300">
                        Compare sales performance across 2022, 2023, and 2024
                    </p>
                </div>
                <ChartSwitcher currentType={chartType} onSwitch={setChartType} />
            </div>
            <div className="flex-1 min-h-[400px]">
                {renderChart()}
            </div>
        </Card>
    );
};
