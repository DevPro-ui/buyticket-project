import { useState } from 'react';
import { EventList } from './components/EventList';
import { Sidebar } from './components/Sidebar';
import { WalletConnect } from './components/WalletConnect';
import { Event } from './types/Event';

import { toast, Toaster } from 'react-hot-toast';
import { useLucid } from './context/LucidProvider';
import { createTransaction } from './utils/cardano';

function App() {
  const { lucid, address } = useLucid();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handlePurchaseTicket = async (event: Event) => {
    if (!lucid || !address) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      const tx = await createTransaction(lucid, address, event.price);
      const signedTx = await tx.sign().complete();
      const txHash = await signedTx.submit();

      toast.success(
        <div>
          <p>Transaction submitted successfully!</p>
          <p className="text-sm mt-1">
            <a
              href={`https://preprod.cardanoscan.io/transaction/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View on Explorer
            </a>
          </p>
        </div>
      );

    } catch (error) {
      console.error('Transaction failed:', error);
      toast.error('Failed to purchase ticket. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Toaster position="top-right" />

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <nav className="relative bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Travel Adventures
                </h1>
                <p className="text-sm text-gray-500">Discover Amazing Destinations</p>
              </div>
            </div>
            <WalletConnect />
          </div>
        </div>
      </nav>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative bg-gradient-to-b from-primary-500 to-secondary-500 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Discover Amazing Adventures
              </h1>
              <p className="text-xl md:text-2xl text-primary-50 max-w-3xl mx-auto">
                Book unique travel experiences and create unforgettable memories
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Upcoming Events
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Secure your spot with blockchain-verified tickets
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-center p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100">
            <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border-none focus:ring-2 focus:ring-primary-500 rounded-lg"
            />
          </div>
        </div>

        <div className="flex gap-8">
          <Sidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <div className="flex-1">
            <EventList
              onPurchase={handlePurchaseTicket}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </main>

      <footer className="relative bg-white/80 backdrop-blur-md mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Built with Cardano blockchain technology</p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Documentation
              </a>
              <span className="text-gray-300">|</span>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Support
              </a>
              <span className="text-gray-300">|</span>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;