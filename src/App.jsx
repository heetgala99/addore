import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { ROUTES } from './utils/constants';
import './App.css';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home/Home'));
const Catalogue = lazy(() => import('./pages/Catalogue/Catalogue'));
const About = lazy(() => import('./pages/StaticPages/About'));
const Contact = lazy(() => import('./pages/StaticPages/Contact'));
const Privacy = lazy(() => import('./pages/StaticPages/Privacy'));
const Terms = lazy(() => import('./pages/StaticPages/Terms'));
const Shipping = lazy(() => import('./pages/StaticPages/Shipping'));

const { Content } = Layout;

/**
 * Loading fallback component
 */
function LoadingFallback() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '400px' 
    }}>
      <Spin size="large" />
    </div>
  );
}

/**
 * 404 Not Found Page
 */
function NotFound() {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '100px 20px',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '72px', marginBottom: '16px' }}>404</h1>
      <h2 style={{ marginBottom: '16px' }}>Page Not Found</h2>
      <p style={{ color: '#666', marginBottom: '32px' }}>
        The page you're looking for doesn't exist.
      </p>
      <a href={ROUTES.HOME} style={{ 
        padding: '12px 24px', 
        background: 'var(--primary-color)', 
        color: '#fff', 
        borderRadius: '4px',
        textDecoration: 'none'
      }}>
        Go Home
      </a>
    </div>
  );
}

/**
 * Main App Component
 * Sets up routing and layout structure
 */
function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Content style={{ flex: 1 }}>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.CATALOGUE} element={<Catalogue />} />
              <Route path={ROUTES.ABOUT} element={<About />} />
              <Route path={ROUTES.CONTACT} element={<Contact />} />
              <Route path={ROUTES.PRIVACY} element={<Privacy />} />
              <Route path={ROUTES.TERMS} element={<Terms />} />
              <Route path={ROUTES.SHIPPING} element={<Shipping />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Content>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
}

export default App;

