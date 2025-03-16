
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthTester from '@/components/AuthTester';

const TestAuth = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 mt-14">
        <AuthTester />
      </main>
      <Footer />
    </div>
  );
};

export default TestAuth;
