import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SaleData } from './data';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Calculate total sales
export function calculateTotalSales(data: SaleData[]): number {
    return data.reduce((sum, item) => sum + item.sales, 0);
}

// Calculate average sales
export function calculateAverageSales(data: SaleData[]): number {
    if (data.length === 0) return 0;
    return calculateTotalSales(data) / data.length;
}

// Calculate growth percentage between two years
export function calculateGrowth(currentYearData: SaleData[], previousYearData: SaleData[]): number {
    const currentTotal = calculateTotalSales(currentYearData);
    const previousTotal = calculateTotalSales(previousYearData);
    
    if (previousTotal === 0) return 0;
    return ((currentTotal - previousTotal) / previousTotal) * 100;
}

// Format currency
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

// Format percentage
export function formatPercentage(value: number): string {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
}

// Export data to CSV
export function exportToCSV(data: SaleData[], filename: string): void {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

