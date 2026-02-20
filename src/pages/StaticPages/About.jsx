import { Typography } from 'antd';
import styles from './StaticPages.module.css';
import logo from '../../assets/logo.jpeg';

const { Title, Paragraph } = Typography;

/** 
 * About Us Page
 */
export default function About() {
  return (
    <div className={styles.staticPage}>
      <div className={styles.container}>
        <div className={styles.aboutUsLogoContainer}>
          <img 
            src={logo} 
            alt="AYA - Accessories You Addore"
            className={styles.aboutUsLogo}
          />
        </div>

        <Title level={1}>About Us</Title>
        <Paragraph>
          Welcome to a world where every piece tells a story. Accessories You Addore 
          was born out of a simple passion: the belief that luxury should be accessible, 
          and every woman deserves to feel like royalty every single day.
        </Paragraph>
        <Paragraph>
          We don't just sell jewelry; we curate confidence. From our signature gold-plated 
          Kadas to our delicate everyday earrings, every item in our collection is 
          hand-picked for its craftsmanship and 'wow' factor. Whether you are gifting a 
          loved one or—like many of our favorite customers—giving yourself the 'birthday 
          treat' you truly deserve, we are here to make that moment shine.
        </Paragraph>
        <Paragraph>
          Thank you for letting us be a small part of your big moments.
        </Paragraph>

        <Title level={2} style={{ marginTop: 48 }}>Maintenance</Title>
        <Title level={3}>Your Care Guide</Title>
        <ul>
          <li><strong>Water Friendly:</strong> Our pieces are crafted to be Anti-Tarnish and Water-Resistant, so you don't have to worry about the occasional splash.</li>
          <li><strong>Maintain the Glow:</strong> While the metal won't tarnish, we recommend wiping your jewelry with a soft cloth after wearing it to remove dust and skin oils.</li>
          <li><strong>Storage:</strong> To prevent surface scratches, store your kadas and earrings in your Accessories You Addore box when you aren't wearing them.</li>
          <li><strong>Best Practice:</strong> To keep the gold "mirror-bright," avoid direct contact with strong chemicals like bleach or heavy perfumes.</li>
        </ul>
      </div>
    </div>
  );
}

