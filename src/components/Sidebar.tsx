import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../data/categories';

interface SidebarProps {
    selectedCategory: string;
    onSelectCategory: (categoryId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory }) => {
    return (
        <div className="w-64 bg-white shadow-lg rounded-lg p-6 h-fit sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
            <div className="space-y-2">
                {categories.map((category) => (
                    <motion.button
                        key={category.id}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelectCategory(category.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${selectedCategory === category.id
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={category.icon}
                            />
                        </svg>
                        <span className="text-sm font-medium">{category.name}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};