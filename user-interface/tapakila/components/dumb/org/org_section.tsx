// import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./OrgEventSection.css";
import { faPlus, faUsersBetweenLines } from "@fortawesome/free-solid-svg-icons";
// import imageSrc from "./image.png"; // Remplace par le bon chemin de ton image

const OrgEventSection = () => {
  return (
    <section className="org-container">
      <div className="org-content">
        <h2 className="org-title">GÉREZ FACILEMENT VOS ÉVÉNEMENTS</h2>
        <p className="org-description">
          Ticketplace est une plateforme 100% en ligne de gestion d’événements incluant :
          <br />
          Elle permet l’administration et la supervision  de votre événement.
        </p>
        <button className="org-button">Devenir organisateur</button>
      </div>
      <div className="org-image">
        {/* <img src={imageSrc} alt="Aperçu de la plateforme" /> */}
        <FontAwesomeIcon icon={faUsersBetweenLines} className="fa-xxl"></FontAwesomeIcon>
      </div>
    </section>
  );
};

export default OrgEventSection;
