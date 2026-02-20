import { useState } from 'react';
import { Layout, Menu, Button, Collapse } from 'antd';
import { MenuOutlined, CloseOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import logo from '../../assets/logo.jpeg';
import styles from './Header.module.css';

const { Header: AntHeader } = Layout;

/**
 * Header Component
 * Navigation menu with mobile responsiveness and working submenus
 */
export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Desktop menu items for Ant Design Menu
  const desktopMenuItems = [
    {
      key: ROUTES.HOME,
      label: <Link to={ROUTES.HOME}>Home</Link>,
    },
    {
      key: ROUTES.CATALOGUE,
      label: <Link to={ROUTES.CATALOGUE}>Catalogue</Link>,
    },
    {
      key: 'about',
      label: 'About',
      children: [
        {
          key: ROUTES.ABOUT,
          label: <Link to={ROUTES.ABOUT}>About Us</Link>,
        },
        {
          key: ROUTES.CONTACT,
          label: <Link to={ROUTES.CONTACT}>Contact</Link>,
        },
      ],
    },
    {
      key: 'policies',
      label: 'Policies',
      children: [
        {
          key: ROUTES.PRIVACY,
          label: <Link to={ROUTES.PRIVACY}>Privacy Policy</Link>,
        },
        {
          key: ROUTES.TERMS,
          label: <Link to={ROUTES.TERMS}>Terms & Conditions</Link>,
        },
        {
          key: ROUTES.SHIPPING,
          label: <Link to={ROUTES.SHIPPING}>Shipping & Returns</Link>,
        },
      ],
    },
  ];

  // Mobile menu items using Collapse for submenus
  const mobileCollapseItems = [
    {
      key: 'about',
      label: 'About',
      children: (
        <div className={styles.mobileSubmenu}>
          <Link 
            to={ROUTES.ABOUT} 
            className={styles.mobileSubmenuLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link 
            to={ROUTES.CONTACT} 
            className={styles.mobileSubmenuLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      ),
    },
    {
      key: 'policies',
      label: 'Policies',
      children: (
        <div className={styles.mobileSubmenu}>
          <Link 
            to={ROUTES.PRIVACY} 
            className={styles.mobileSubmenuLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Privacy Policy
          </Link>
          <Link 
            to={ROUTES.TERMS} 
            className={styles.mobileSubmenuLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Terms & Conditions
          </Link>
          <Link 
            to={ROUTES.SHIPPING} 
            className={styles.mobileSubmenuLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Shipping & Returns
          </Link>
        </div>
      ),
    },
  ];

  const handleMobileNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const selectedKeys = [location.pathname];

  return (
    <AntHeader className={styles.header}>
      <div className={styles.headerContent}>
        <Link to={ROUTES.HOME} className={styles.logo}>
          <img src={logo} alt="Accessories You Addore logo" className={styles.logoImage} />
          <span className={styles.logoText}>Addore</span>
        </Link>

        <div className={styles.desktopMenu}>
          <Menu
            mode="horizontal"
            items={desktopMenuItems}
            selectedKeys={selectedKeys}
            className={styles.menu}
          />
        </div>

        <Button
          type="text"
          icon={mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuContent}>
              {/* Simple Links */}
              <button 
                className={`${styles.mobileNavLink} ${location.pathname === ROUTES.HOME ? styles.active : ''}`}
                onClick={() => handleMobileNavClick(ROUTES.HOME)}
              >
                Home
              </button>
              <button 
                className={`${styles.mobileNavLink} ${location.pathname === ROUTES.CATALOGUE ? styles.active : ''}`}
                onClick={() => handleMobileNavClick(ROUTES.CATALOGUE)}
              >
                Catalogue
              </button>
              
              {/* Collapsible Sections */}
              <Collapse
                items={mobileCollapseItems}
                className={styles.mobileCollapse}
                expandIconPosition="end"
                bordered={false}
                expandIcon={({ isActive }) => 
                  isActive ? <DownOutlined /> : <RightOutlined />
                }
              />
            </div>
          </div>
        )}
      </div>
    </AntHeader>
  );
}
