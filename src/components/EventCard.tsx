import React, { useState } from 'react';
import { format } from 'date-fns';
import { Event } from '../types/Event';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { PurchaseModal } from './PurchaseModal';
import { motion } from 'framer-motion';

interface EventCardProps {
    event: Event;
    onPurchase: (event: Event) => Promise<void>;
    index: number;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onPurchase, index }) => {
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handlePurchase = async () => {
        setIsProcessing(true);
        try {
            await onPurchase(event);
            setShowPurchaseModal(false);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="event-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="relative">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 flex space-x-2">
                        <motion.div
                            animate={{ scale: isHovered ? 1.1 : 1 }}
                            className="bg-white/90 backdrop-blur-sm text-primary-600 px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
                        >
                            {event.price} ADA
                        </motion.div>
                        <span className="bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {event.availableTickets} left
                        </span>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors">
                        {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-center text-gray-500 hover:text-primary-600 transition-colors">
                            <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{format(event.date, 'PPP')}</span>
                        </div>

                        <div className="flex items-center text-gray-500 hover:text-primary-600 transition-colors">
                            <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{event.location}</span>
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => setShowPurchaseModal(true)}
                    >
                        Book Now
                    </Button>
                </div>
            </Card>

            <PurchaseModal
                event={event}
                isOpen={showPurchaseModal}
                isProcessing={isProcessing}
                onClose={() => setShowPurchaseModal(false)}
                onConfirm={handlePurchase}
            />
        </motion.div>
    );
};