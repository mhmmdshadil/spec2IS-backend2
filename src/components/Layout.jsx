import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Footer from './Footer';

export default function Layout() {
  return (
    <>
      <TopBar />
      <main className="flex-1 py-8">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
