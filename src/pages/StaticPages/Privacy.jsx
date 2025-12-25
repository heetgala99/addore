import { Typography } from 'antd';
import styles from './StaticPages.module.css';

const { Title, Paragraph } = Typography;

/**
 * Privacy Policy Page
 */
export default function Privacy() {
  return (
    <div className={styles.staticPage}>
      <div className={styles.container}>
        <Title level={1}>Privacy Policy</Title>
        <Paragraph style={{ color: '#666', marginBottom: 32 }}>
          Last updated: {new Date().toLocaleDateString()}
        </Paragraph>

        <Title level={2}>Introduction</Title>
        <Paragraph>
          At Addore, we respect your privacy and are committed to protecting your 
          personal data. This privacy policy explains how we collect, use, and 
          safeguard your information when you visit our website.
        </Paragraph>

        <Title level={2}>Information We Collect</Title>
        <Paragraph>
          We may collect the following types of information:
        </Paragraph>
        <ul>
          <li>Personal identification information (name, email address, phone number)</li>
          <li>Browsing data and website usage information</li>
          <li>Device information and IP address</li>
        </ul>

        <Title level={2}>How We Use Your Information</Title>
        <Paragraph>
          We use the information we collect to:
        </Paragraph>
        <ul>
          <li>Provide and improve our services</li>
          <li>Process your inquiries and requests</li>
          <li>Send you updates about our products and services (with your consent)</li>
          <li>Analyze website usage and improve user experience</li>
        </ul>

        <Title level={2}>Data Security</Title>
        <Paragraph>
          We implement appropriate security measures to protect your personal 
          information. However, no method of transmission over the internet is 
          100% secure, and we cannot guarantee absolute security.
        </Paragraph>

        <Title level={2}>Your Rights</Title>
        <Paragraph>
          You have the right to:
        </Paragraph>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of marketing communications</li>
        </ul>

        <Title level={2}>Contact Us</Title>
        <Paragraph>
          If you have questions about this privacy policy, please contact us at 
          privacy@addore.com.
        </Paragraph>
      </div>
    </div>
  );
}

