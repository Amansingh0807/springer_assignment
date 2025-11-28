'use client';

import React from 'react';
import { Card } from '../atoms/Card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
    title, 
    value, 
    subtitle, 
    icon: Icon,
    trend,
    trendValue
}) => {
    const getTrendColor = () => {
        switch(trend) {
            case 'up': return 'text-green-600 dark:text-green-400';
            case 'down': return 'text-red-600 dark:text-red-400';
            default: return 'text-zinc-500 dark:text-zinc-400';
        }
    };

    return (
        <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-300 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{value}</h3>
                    {subtitle && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</p>
                    )}
                    {trendValue && (
                        <p className={`text-sm font-medium mt-2 ${getTrendColor()}`}>
                            {trend === 'up' && '↑ '}
                            {trend === 'down' && '↓ '}
                            {trendValue}
                        </p>
                    )}
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
            </div>
        </Card>
    );
};
