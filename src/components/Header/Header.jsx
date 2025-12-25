import { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import styles from './Header.module.css';

const { Header: AntHeader } = Layout;

/**
 * Header Component
 * Navigation menu with mobile responsiveness
 */
export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
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

  const selectedKeys = [location.pathname];

  return (
    <AntHeader className={styles.header}>
      <div className={styles.headerContent}>
        <Link to={ROUTES.HOME} className={styles.logo}>
          <h1>Addore</h1>
        </Link>

        <div className={styles.desktopMenu}>
          <Menu
            mode="horizontal"
            items={menuItems}
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
            <Menu
              mode="vertical"
              items={menuItems}
              selectedKeys={selectedKeys}
              className={styles.mobileMenuContent}
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>
        )}
      </div>
    </AntHeader>
  );
}

