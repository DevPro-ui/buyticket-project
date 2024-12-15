import { Dialog } from '@headlessui/react';
import React from 'react';
import { TransferFormData } from '../../types/Transaction';
import { TransferForm } from './TransferForm';

interface TransferModalProps {
    isOpen: boolean;
    isProcessing: boolean;
    onClose: () => void;
    onSubmit: (data: TransferFormData) => Promise<void>;
}

export const TransferModal: React.FC<TransferModalProps> = ({
    isOpen,
    isProcessing,
    onClose,
    onSubmit,
}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="fixed inset-0 z-10 overflow-y-auto"
        >
            <div className="min-h-screen px-4 text-center">
                <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

                <span className="inline-block h-screen align-middle" aria-hidden="true">
                    &#8203;
                </span>

                <div className="inline-block w-full max-w-md p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center space-x-4 mb-6">
                        <div className="p-3 bg-indigo-100 rounded-full">
                            <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>
                        <div>
                            <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                                Transfer Tokens
                            </Dialog.Title>
                            <p className="mt-1 text-sm text-gray-500">
                                Send ADA tokens to another wallet address
                            </p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <TransferForm onSubmit={onSubmit} isProcessing={isProcessing} />
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-center text-sm text-gray-500">
                            <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Transaction fees will be calculated automatically
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};