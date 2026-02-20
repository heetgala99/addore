import { Typography } from 'antd';
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

        <Title level={2}>Shipping & Payment Policy</Title>
        <ul>
          <li><strong>Processing Time:</strong> All orders are packed with love and shipped within 24–48 hours.</li>
          <li><strong>Delivery Timeline:</strong> Once shipped, expect your sparkle to arrive within 5–7 working days.</li>
          <li><strong>Payment Method:</strong> We currently do not provide Cash on Delivery (COD).</li>
          <li><strong>Order Confirmation:</strong> Orders are only confirmed and processed once the full payment is received.</li>
          <li><strong>No Partial Payments:</strong> We do not accept partial deposits; 100% payment is required upfront.</li>
        </ul>

        <Title level={2}>Returns & Exchange Policy</Title>
        <ul>
          <li><strong>The Unboxing Rule:</strong> To protect your purchase, a complete unboxing video is mandatory. The video must start from the sealed package and have no cuts or edits.</li>
          <li><strong>Reporting Issues:</strong> If there is any damage, you must contact us and share the unboxing video within 24 hours of delivery.</li>
          <li><strong>Exchanges:</strong> Exchanges are only available for damaged items with a valid, uncut unboxing video.</li>
          <li><strong>Non-Returnable Items:</strong> Due to hygiene reasons, we do not accept returns or exchanges on earrings.</li>
          <li><strong>Refund Policy:</strong> We do not offer cash refunds; we only provide exchanges for valid damage claims.</li>
        </ul>

        <Title level={2}>Questions?</Title>
        <Paragraph>
          If you have any questions about shipping or returns, please contact us at 
          nisha310jain@gmail.com or call us at +91 77180 62292.
        </Paragraph>
      </div>
    </div>
  );
}

