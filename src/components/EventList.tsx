import React from 'react';
import { motion } from 'framer-motion';
import { EventCard } from './EventCard';
import { Event } from '../types/Event';
import { events } from '../data/mockEvents';

interface EventListProps {
    onPurchase: (event: Event) => Promise<void>;
    selectedCategory: string;
    searchQuery: string;
}

export const EventList: React.FC<EventListProps> = ({
    onPurchase,
    selectedCategory,
    searchQuery
}) => {
    const filteredEvents = events.filter(event => {
        const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {filteredEvents.map((event, index) => (
                <EventCard
                    key={event.id}
                    event={event}
                    onPurchase={onPurchase}
                    index={index}
                />
            ))}
        </motion.div>
    );
};