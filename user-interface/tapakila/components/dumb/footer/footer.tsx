import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faRss, faGoogle, faFlickr } from "@fortawesome/free-brands-svg-icons";
import styles from "./Footer.module.css";
// import "../../../src/app/globals.css"
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
        <h1 className={styles.logo}>
            <span className="green">TAPA</span>
            <span>KILA</span>
            <img src="../../ticketlogo.png" alt="logo" className="logo" />
          </h1>
        </div>

        <div className={styles.links}>
          <div>
            <h4>CATEGORIES</h4>
            <ul>
              <li><a href="#">sport</a></li>
              <li><a href="#">concerts</a></li>
              <li><a href="#">spectacles</a></li>
            </ul>
          </div>
          <div>
            <h4>SERVICES</h4>
            <ul>
              <li><a href="#">Theme Tweak</a></li>
            </ul>
          </div>
          <div>
            <h4>FONCTIONNALITES</h4>
            <ul>
              <li><a href="#">Devenez organisateurs</a></li>
              {/* <li><a href="#">Support</a></li> */}
            </ul>
          </div>
          <div>
            <h4>à propos</h4>
            <ul>
              <li><a href="#">Contactez-nous</a></li>
              {/* <li><a href="#">Affiliates</a></li> */}
              <li><a href="#">Ressources</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.socials}>
        <FontAwesomeIcon icon={faFacebookF} />
        <FontAwesomeIcon icon={faTwitter} />
        {/* <FontAwesomeIcon icon={faRss} /> */}
        <FontAwesomeIcon icon={faGoogle} />
        <FontAwesomeIcon icon={faFlickr} />
      </div>

      <p className={styles.copyright}>© Copyright. All rights reserved.</p>
    </footer>
  );
}
