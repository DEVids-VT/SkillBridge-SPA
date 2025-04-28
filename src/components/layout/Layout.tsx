import { Outlet } from 'react-router-dom';
import Header from './Header'; // Assuming Header.tsx is in the same directory
import Footer from './Footer'; // Assuming Footer.tsx is in the same directory

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet /> {/* Child routes will render here */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout; 