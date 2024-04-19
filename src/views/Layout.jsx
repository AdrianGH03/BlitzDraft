import PropTypes from 'prop-types';
import { Header } from '../components/Layout/Header';
import { Footer } from '../components/Layout/Footer';
import { Analytics } from "@vercel/analytics/react"

export const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
        <div className="content">{children}</div>
        <Analytics />
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

