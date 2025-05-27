import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header'; // Assuming Header.tsx is in the same directory
import Footer from './Footer'; // Assuming Footer.tsx is in the same directory
import EnhancedPageTransition, {
  scrollToTopOnTransition,
} from '../transitions/EnhancedPageTransition';

export function Layout() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    // Use the smooth scrolling from Lenis if available, otherwise fallback
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: false, duration: 0.8 });
    } else {
      scrollToTopOnTransition();
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen font-rubik">
      <Header />
      <main className="flex-grow">
        <EnhancedPageTransition transitionType="fade" withBlur={true}>
          <Outlet /> {/* Child routes will render here with transition effects */}
        </EnhancedPageTransition>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
