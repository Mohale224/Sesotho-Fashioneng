import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import FeaturedProducts from './FeaturedProducts';
import UpcomingEvents from './UpcomingEvents';
import FeaturedArtists from './FeaturedArtists';
import AboutPreview from './AboutPreview';
import Shop from './Shop';
import Events from './Events';
import Artists from './Artists';
import Checkout from './Checkout';
import Cart from './Cart';
import Footer from './Footer';

export default function Router() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage(hash || 'home');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'shop':
        return <Shop />;
      case 'events':
        return <Events />;
      case 'artists':
        return <Artists />;
      case 'checkout':
        return <Checkout onBack={() => (window.location.hash = '')} />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <FeaturedProducts />
            <UpcomingEvents />
            <FeaturedArtists />
            <AboutPreview />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation onCartClick={() => setIsCartOpen(true)} />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {renderPage()}
      <Footer />
    </div>
  );
}
