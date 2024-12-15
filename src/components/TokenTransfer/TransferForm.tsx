import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { TransferFormData } from '../../types/Transaction';
import { classNames } from '../../utils/styles';

interface TransferFormProps {
    onSubmit: (data: TransferFormData) => Promise<void>;
    isProcessing: boolean;
}

export const TransferForm: React.FC<TransferFormProps> = ({ onSubmit, isProcessing }) => {
    const [formData, setFormData] = useState<TransferFormData>({
        recipientAddress: '',
        amount: 0
    });
    const [focused, setFocused] = useState<'address' | 'amount' | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
                <label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-700">
                    Recipient Address
                </label>
                <div className={classNames(
                    "mt-1 relative rounded-md shadow-sm",
                    focused === 'address' ? 'ring-2 ring-indigo-500' : ''
                )}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="recipientAddress"
                        value={formData.recipientAddress}
                        onChange={(e) => setFormData(prev => ({ ...prev, recipientAddress: e.target.value }))}
                        onFocus={() => setFocused('address')}
                        onBlur={() => setFocused(null)}
                        className="block w-full pl-10 pr-12 py-3 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                        placeholder="addr1..."
                        required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">Address</span>
                    </div>
                </div>
            </div>

            <div className="space-y-1">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Amount
                </label>
                <div className={classNames(
                    "mt-1 relative rounded-md shadow-sm",
                    focused === 'amount' ? 'ring-2 ring-indigo-500' : ''
                )}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">₳</span>
                    </div>
                    <input
                        type="number"
                        id="amount"
                        min="0"
                        step="0.1"
                        value={formData.amount}
                        onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
                        onFocus={() => setFocused('amount')}
                        onBlur={() => setFocused(null)}
                        className="block w-full pl-8 pr-12 py-3 border-gray-300 rounded-md focus:outline-none sm:text-sm"
                        placeholder="0.00"
                        required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">ADA</span>
                    </div>
                </div>
            </div>

            <Button
                type="submit"
                variant="primary"
                isLoading={isProcessing}
                disabled={isProcessing}
                className="w-full py-3"
            >
                {isProcessing ? 'Processing Transfer...' : 'Send Tokens'}
            </Button>
        </form>
    );
};