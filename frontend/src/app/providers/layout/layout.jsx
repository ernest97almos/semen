import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';
import Header from '../../../widgets/header';
import Footer from '../../../widgets/footer';

const Layout = () => {
  return (
    <>
      <Toaster />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
