import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { TransferModal } from './TransferModal';
import { TransferFormData } from '../../types/Transaction';

import { validateAddress, validateAmount, transferTokens } from '../../utils/transaction';
import { toast } from 'react-hot-toast';
import { useLucid } from '../../context/LucidProvider';

export const TokenTransferButton: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const { lucid, address } = useLucid();

    const handleTransfer = async (formData: TransferFormData) => {
        if (!lucid || !address) {
            toast.error('Please connect your wallet first');
            return;
        }

        if (!validateAddress(formData.recipientAddress)) {
            toast.error('Invalid recipient address');
            return;
        }

        if (!validateAmount(formData.amount)) {
            toast.error('Invalid amount');
            return;
        }

        setIsProcessing(true);
        try {
            const result = await transferTokens(lucid, formData.recipientAddress, formData.amount);

            if (result.success) {
                toast.custom((t) => (
                    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 pt-0.5">
                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                        Transfer Successful!
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        <a
                                            href={`https://preprod.cardanoscan.io/transaction/${result.txHash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 hover:text-indigo-500"
                                        >
                                            View on Explorer →
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-l border-gray-200">
                            <button
                                onClick={() => toast.dismiss(t.id)}
                                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ), { duration: 5000 });
                setIsModalOpen(false);
            } else {
                toast.error(result.error || 'Transfer failed');
            }
        } catch (error) {
            toast.error('Transfer failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            <Button
                variant="secondary"
                onClick={() => setIsModalOpen(true)}
                className="ml-4 flex items-center space-x-2"
            >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span>Transfer</span>
            </Button>

            <TransferModal
                isOpen={isModalOpen}
                isProcessing={isProcessing}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleTransfer}
            />
        </>
    );
};