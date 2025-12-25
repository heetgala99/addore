import { Layout, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import styles from './Footer.module.css';

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

/**
 * Footer Component
 * Links to static pages and contact information
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className={styles.footer}>
      <div className={styles.footerContent}>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={8}>
            <Title level={4} className={styles.footerTitle}>
              Addore
            </Title>
            <Text className={styles.footerText}>
              Your trusted destination for exquisite jewellery. 
              Discover timeless pieces that reflect your unique style.
            </Text>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Title level={5} className={styles.footerTitle}>
              Quick Links
            </Title>
            <ul className={styles.footerLinks}>
              <li>
                <Link to={ROUTES.HOME}>Home</Link>
              </li>
              <li>
                <Link to={ROUTES.CATALOGUE}>Catalogue</Link>
              </li>
              <li>
                <Link to={ROUTES.ABOUT}>About Us</Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT}>Contact</Link>
              </li>
            </ul>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Title level={5} className={styles.footerTitle}>
              Policies
            </Title>
            <ul className={styles.footerLinks}>
              <li>
                <Link to={ROUTES.PRIVACY}>Privacy Policy</Link>
              </li>
              <li>
                <Link to={ROUTES.TERMS}>Terms & Conditions</Link>
              </li>
              <li>
                <Link to={ROUTES.SHIPPING}>Shipping & Returns</Link>
              </li>
            </ul>
          </Col>
        </Row>

        <div className={styles.footerBottom}>
          <Text className={styles.copyright}>
            © {currentYear} Addore. All rights reserved.
          </Text>
        </div>
      </div>
    </AntFooter>
  );
}

