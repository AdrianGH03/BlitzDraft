import PropTypes from 'prop-types';
import { Header } from '../components/Layout/Header';
import { Footer } from '../components/Layout/Footer';
import { useLocation } from 'react-router-dom';

export const Layout = ({ children }) => {
  const location = useLocation();
  let currentPage = location.pathname;

  const pageClasses = {
    '/': 'page-1',
    '/auth': 'page-2',
    '/reset/:token': 'page-3',
    '/user/profile': 'page-4',
    '/tutorial': 'page-5',
    '/guides': 'page-6',
    '/help': 'page-7',
    '/stats': 'page-8',
    '/test': 'page-9',
    '/game/difficulty': 'page-10',
    '/game/:token': 'page-11',
    '*': 'page-12',
  };
  if (currentPage.startsWith('/game/') && currentPage !== '/game/difficulty') {
    currentPage = '/game/:token';
  }
  const pageClass = pageClasses[currentPage] || '';
  
  return (
    <div className="layout-container">
      <Header />
        <div className={`content ${pageClass}`}>{children}</div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};