import { Typography, Row, Col } from 'antd';
import styles from './StaticPages.module.css';

const { Title, Paragraph } = Typography;

/**
 * About Us Page
 */
export default function About() {
  return (
    <div className={styles.staticPage}>
      <div className={styles.container}>
        <Title level={1}>About Us</Title>
        
        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <Title level={2}>Our Story</Title>
            <Paragraph>
              Welcome to Addore, where timeless elegance meets modern design. 
              We are passionate about creating exquisite jewellery pieces that 
              reflect your unique style and personality.
            </Paragraph>
            <Paragraph>
              Founded with a vision to make luxury jewellery accessible to everyone, 
              we carefully curate our collection to ensure each piece meets our 
              high standards of quality and craftsmanship.
            </Paragraph>
          </Col>
          
          <Col xs={24} md={12}>
            <Title level={2}>Our Mission</Title>
            <Paragraph>
              Our mission is to provide you with beautiful, high-quality jewellery 
              that you can cherish for a lifetime. We believe that every piece 
              should tell a story and hold special meaning.
            </Paragraph>
            <Paragraph>
              We work with skilled artisans and use only the finest materials to 
              create jewellery that stands the test of time.
            </Paragraph>
          </Col>
        </Row>

        <Title level={2} style={{ marginTop: 48 }}>Why Choose Us</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8}>
            <Title level={4}>Quality Craftsmanship</Title>
            <Paragraph>
              Every piece is carefully crafted with attention to detail and 
              commitment to excellence.
            </Paragraph>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Title level={4}>Wide Selection</Title>
            <Paragraph>
              Browse through our extensive collection of rings, necklaces, 
              earrings, and more.
            </Paragraph>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Title level={4}>Customer Satisfaction</Title>
            <Paragraph>
              Your satisfaction is our priority. We're here to help you find 
              the perfect piece.
            </Paragraph>
          </Col>
        </Row>
      </div>
    </div>
  );
}

