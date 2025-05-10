import React from 'react';
import { ContactTable } from './components/ContactTable';
import { PaymentButton } from './components/PaymentButton';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Smart. Efficient. Outreach.
          </h1>
          <PaymentButton />
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <ContactTable />
      </main>
    </div>
  );
}

export default App;