'use client';

import React, { useMemo } from 'react';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { Card } from '../atoms/Card';
import { ChartSwitcher, ChartType } from '../molecules/ChartSwitcher';
import { Button } from '../atoms/Button';
import { Download } from 'lucide-react';
import { SaleData } from '@/lib/data';
import { exportToCSV } from '@/lib/utils';

interface SalesChartProps {
    data: SaleData[];
    year: number;
    chartType: ChartType;
    onChartTypeChange: (type: ChartType) => void;
    threshold?: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57', '#ffc658', '#8dd1e1'];

export const SalesChart: React.FC<SalesChartProps> = ({
    data,
    year,
    chartType,
    onChartTypeChange,
    threshold = 0
}) => {

    const filteredData = useMemo(() => {
        return data.filter(item => item.sales >= threshold);
    }, [data, threshold]);

    const renderChart = () => {
        if (filteredData.length === 0) {
            return (
                <div className="h-[300px] flex items-center justify-center text-zinc-500">
                    No data meets the threshold criteria.
                </div>
            );
        }

        switch (chartType) {
            case 'line':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={filteredData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                            <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                );
            case 'pie':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={filteredData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={(entry: any) => `${entry.month} ${((entry.percent || 0) * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="sales"
                            >
                                {filteredData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                );
            case 'bar':
            default:
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={filteredData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                            <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                                cursor={{ fill: 'transparent' }}
                            />
                            <Legend />
                            <Bar dataKey="sales" fill="#2563eb" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                );
        }
    };

    const handleExport = () => {
        exportToCSV(data, `sales_${year}`);
    };

    return (
        <Card className="w-full h-full flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between flex-wrap gap-2">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    Sales Overview {year}
                </h3>
                <div className="flex items-center gap-2">
                    <Button 
                        variant="ghost" 
                        onClick={handleExport}
                        className="flex items-center gap-2 cursor-pointer"
                        title={`Export ${year} data as CSV`}
                    >
                        <Download size={16} />
                        <span className="hidden sm:inline">Export CSV</span>
                    </Button>
                    <ChartSwitcher currentType={chartType} onSwitch={onChartTypeChange} />
                </div>
            </div>
            <div className="flex-1 min-h-[300px]">
                {renderChart()}
            </div>
        </Card>
    );
};
