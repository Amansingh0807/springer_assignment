import React from 'react';
import { Input } from '../atoms/Input';
import { Filter } from 'lucide-react';

interface FilterInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const FilterInput: React.FC<FilterInputProps> = ({ label, className, ...props }) => {
    return (
        <div className="flex flex-col gap-1.5 w-full max-w-xs">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Filter size={14} />
                {label}
            </label>
            <Input className={className} {...props} />
        </div>
    );
};
