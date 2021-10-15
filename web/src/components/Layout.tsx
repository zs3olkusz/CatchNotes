import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
