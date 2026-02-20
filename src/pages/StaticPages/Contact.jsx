import { Typography, Row, Col, Card } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import styles from './StaticPages.module.css';

const { Title, Paragraph, Text } = Typography;

/**
 * Contact Us Page
 */
export default function Contact() {
  return (
    <div className={styles.staticPage}>
      <div className={styles.container}>
        <Title level={1}>Contact Us</Title>
        <Paragraph style={{ fontSize: 16, marginBottom: 48 }}>
          We'd love to hear from you! Get in touch with us through any of the 
          following methods.
        </Paragraph>

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8}>
            <Card className={styles.contactCard}>
              <MailOutlined style={{ fontSize: 32, color: 'var(--primary-color)', marginBottom: 16 }} />
              <Title level={4}>Email</Title>
              <Text>nisha310jain@gmail.com</Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Card className={styles.contactCard}>
              <PhoneOutlined style={{ fontSize: 32, color: 'var(--primary-color)', marginBottom: 16 }} />
              <Title level={4}>Phone</Title>
              <Text>+91 77180 62292</Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Card className={styles.contactCard}>
              <EnvironmentOutlined style={{ fontSize: 32, color: 'var(--primary-color)', marginBottom: 16 }} />
              <Title level={4}>Address</Title>
              <Text>
                Surat, Gujarat<br />
                India
              </Text>
            </Card>
          </Col>
        </Row>

        <div style={{ marginTop: 48 }}>
          <Title level={2}>Send Us a Message</Title>
          <Paragraph>
            For inquiries about our products, custom orders, or any other questions, 
            please email us at <Text strong>nisha310jain@gmail.com</Text>. We typically 
            respond within 24-48 hours.
          </Paragraph>
        </div>
      </div>
    </div>
  );
}

