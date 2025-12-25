import { Typography } from 'antd';
import styles from './StaticPages.module.css';

const { Title, Paragraph } = Typography;

/**
 * Terms & Conditions Page
 */
export default function Terms() {
  return (
    <div className={styles.staticPage}>
      <div className={styles.container}>
        <Title level={1}>Terms & Conditions</Title>
        <Paragraph style={{ color: '#666', marginBottom: 32 }}>
          Last updated: {new Date().toLocaleDateString()}
        </Paragraph>

        <Title level={2}>Agreement to Terms</Title>
        <Paragraph>
          By accessing and using this website, you accept and agree to be bound 
          by the terms and provision of this agreement. If you do not agree to 
          these terms, please do not use our website.
        </Paragraph>

        <Title level={2}>Use License</Title>
        <Paragraph>
          Permission is granted to temporarily view the materials on Addore's 
          website for personal, non-commercial transitory viewing only. This is 
          the grant of a license, not a transfer of title.
        </Paragraph>

        <Title level={2}>Product Information</Title>
        <Paragraph>
          We strive to provide accurate product descriptions and images. However, 
          we do not warrant that product descriptions or other content on this 
          site is accurate, complete, reliable, current, or error-free.
        </Paragraph>

        <Title level={2}>Pricing</Title>
        <Paragraph>
          All prices are subject to change without notice. We reserve the right 
          to modify prices at any time. Prices displayed are in the currency 
          specified and may not include applicable taxes or shipping fees.
        </Paragraph>

        <Title level={2}>Intellectual Property</Title>
        <Paragraph>
          All content on this website, including text, graphics, logos, images, 
          and software, is the property of Addore and is protected by copyright 
          and other intellectual property laws.
        </Paragraph>

        <Title level={2}>Limitation of Liability</Title>
        <Paragraph>
          In no event shall Addore or its suppliers be liable for any damages 
          (including, without limitation, damages for loss of data or profit, 
          or due to business interruption) arising out of the use or inability 
          to use the materials on Addore's website.
        </Paragraph>

        <Title level={2}>Governing Law</Title>
        <Paragraph>
          These terms and conditions are governed by and construed in accordance 
          with the laws of the jurisdiction in which Addore operates.
        </Paragraph>

        <Title level={2}>Contact Information</Title>
        <Paragraph>
          For questions about these Terms & Conditions, please contact us at 
          legal@addore.com.
        </Paragraph>
      </div>
    </div>
  );
}

