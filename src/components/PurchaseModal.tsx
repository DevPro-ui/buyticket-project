import React from 'react';
import { Dialog } from '@headlessui/react';
import { Event } from '../types/Event';
import { Button } from './ui/Button';

interface PurchaseModalProps {
    event: Event;
    isOpen: boolean;
    isProcessing: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
    event,
    isOpen,
    isProcessing,
    onClose,
    onConfirm,
}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="fixed inset-0 z-10 overflow-y-auto"
        >
            <div className="min-h-screen px-4 text-center">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                >
                    &#8203;
                </span>

                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                    >
                        Confirm Purchase
                    </Dialog.Title>

                    <div className="mt-4">
                        <p className="text-sm text-gray-500">
                            You are about to purchase a ticket for:
                        </p>
                        <p className="mt-2 text-lg font-semibold">{event.title}</p>
                        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Price:</span>
                                <span className="font-semibold">{event.price} ADA</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex space-x-3">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={onClose}
                            disabled={isProcessing}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            className="flex-1"
                            onClick={onConfirm}
                            isLoading={isProcessing}
                        >
                            Confirm Purchase
                        </Button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};