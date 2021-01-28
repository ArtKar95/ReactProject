import React from "react";
import classes from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <span>
        Created by Arthur Karapetyan <FontAwesomeIcon icon={faHandPointRight} />
        <a
          href="https://github.com/ArtKar95?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          href="http://linkedin.com/in/artur-karapetyan-08a7a5204"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </span>
    </div>
  );
};

export default Footer;
