import React from 'react';
import { Button } from '../atoms/Button';
import { BarChart3, LineChart, PieChart } from 'lucide-react';

export type ChartType = 'bar' | 'line' | 'pie';

interface ChartSwitcherProps {
    currentType: ChartType;
    onSwitch: (type: ChartType) => void;
}

export const ChartSwitcher: React.FC<ChartSwitcherProps> = ({ currentType, onSwitch }) => {
    return (
        <div className="flex space-x-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg w-fit">
            <Button
                variant={currentType === 'bar' ? 'primary' : 'ghost'}
                onClick={() => onSwitch('bar')}
                className="flex items-center gap-2 px-3 py-1.5 text-sm shadow-none"
            >
                <BarChart3 size={16} />
                Bar
            </Button>
            <Button
                variant={currentType === 'line' ? 'primary' : 'ghost'}
                onClick={() => onSwitch('line')}
                className="flex items-center gap-2 px-3 py-1.5 text-sm shadow-none"
            >
                <LineChart size={16} />
                Line
            </Button>
            <Button
                variant={currentType === 'pie' ? 'primary' : 'ghost'}
                onClick={() => onSwitch('pie')}
                className="flex items-center gap-2 px-3 py-1.5 text-sm shadow-none"
            >
                <PieChart size={16} />
                Pie
            </Button>
        </div>
    );
};
