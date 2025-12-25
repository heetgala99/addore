import { Typography, Row, Col, Card } from 'antd';
import styles from './StaticPages.module.css';

const { Title, Paragraph } = Typography;

/**
 * Shipping & Returns Policy Page
 */
export default function Shipping() {
  return (
    <div className={styles.staticPage}>
      <div className={styles.container}>
        <Title level={1}>Shipping & Returns</Title>

        <Title level={2}>Shipping Information</Title>
        <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
          <Col xs={24} md={12}>
            <Card>
              <Title level={4}>Standard Shipping</Title>
              <Paragraph>
                <strong>Delivery Time:</strong> 5-7 business days
              </Paragraph>
              <Paragraph>
                <strong>Cost:</strong> $5.99
              </Paragraph>
              <Paragraph>
                Standard shipping is available for all orders. Orders are 
                processed within 1-2 business days.
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card>
              <Title level={4}>Express Shipping</Title>
              <Paragraph>
                <strong>Delivery Time:</strong> 2-3 business days
              </Paragraph>
              <Paragraph>
                <strong>Cost:</strong> $12.99
              </Paragraph>
              <Paragraph>
                Express shipping is available for orders placed before 2 PM EST. 
                Orders are processed and shipped the same day.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        <Title level={2}>International Shipping</Title>
        <Paragraph>
          We currently ship to select international destinations. Shipping costs 
          and delivery times vary by location. Please contact us for specific 
          international shipping information.
        </Paragraph>

        <Title level={2}>Returns & Exchanges</Title>
        <Paragraph>
          We want you to be completely satisfied with your purchase. If you're 
          not happy with your order, we're here to help.
        </Paragraph>

        <Title level={3}>Return Policy</Title>
        <ul>
          <li>Items must be returned within 30 days of delivery</li>
          <li>Items must be in original condition, unworn, and with all tags attached</li>
          <li>Original packaging should be included when possible</li>
          <li>Custom or personalized items are not eligible for return</li>
        </ul>

        <Title level={3}>How to Return</Title>
        <Paragraph>
          To initiate a return, please contact us at returns@addore.com with 
          your order number. We will provide you with a return authorization and 
          shipping instructions.
        </Paragraph>

        <Title level={3}>Refunds</Title>
        <Paragraph>
          Once we receive and inspect your returned item, we will process your 
          refund. Refunds will be issued to the original payment method within 
          5-10 business days. Shipping costs are non-refundable unless the item 
          was defective or incorrect.
        </Paragraph>

        <Title level={2}>Damaged or Defective Items</Title>
        <Paragraph>
          If you receive a damaged or defective item, please contact us immediately 
          at support@addore.com with photos of the damage. We will arrange for 
          a replacement or full refund, including return shipping costs.
        </Paragraph>

        <Title level={2}>Questions?</Title>
        <Paragraph>
          If you have any questions about shipping or returns, please don't 
          hesitate to contact us at support@addore.com or call us at 
          +1 (555) 123-4567.
        </Paragraph>
      </div>
    </div>
  );
}

