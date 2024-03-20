import PropTypes from 'prop-types';
import { Header } from '../components/Layout/Header';
import { Footer } from '../components/Layout/Footer';

export const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
        <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

