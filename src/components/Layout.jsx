import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Footer from './Footer';

export default function Layout() {
  return (
    <>
      <TopBar />
      <main className="flex-1 pt-24 sm:pt-28 pb-12">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
