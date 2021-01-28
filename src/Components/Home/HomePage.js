import React from "react";
import classes from "./HomePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const HomePage = () => {
  return (
    <div className={classes.home}>
      <h1>About us</h1>
      <p>
        Our company Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Voluptas sapiente error commodi maxime vel est perferendis. Iusto ipsa
        excepturi nesciunt dolores officia odit, quibusdam, ducimus id non,
        neque totam pariatur eum voluptatibus adipisci repellendus laudantium
        incidunt. Commodi mollitia eveniet quia. Totam assumenda fugiat
        repudiandae quae consectetur in consequuntur dicta suscipit sit,
        obcaecati eligendi ad a fugit magnam velit aut dolorum vero. At dicta
        aspernatur officia aliquam dolorum asperiores modi saepe omnis doloribus
        ducimus excepturi reprehenderit explicabo necessitatibus ad maiores.
      </p>
      <h3>Abot My To-Do-List</h3>
      <p>
        My To-Do-List is provident repellat corrupti animi illum exercitationem
        voluptatem saepe sunt praesentium officia minima, reiciendis quis,
        temporibus eligendi quisquam tempore repellendus fugit mollitia
        excepturi. Fuga harum voluptates amet ipsum rem? Sit blanditiis eos
        distinctio. Nemo veniam in similique, quasi dicta ea adipisci omnis?
      </p>
      <h3>Contact</h3>
      <p>
        Contact Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Odio dolorem fuga nihil ad iusto, doloremque corrupti dolores
        repellendus laudantium voluptatibus perspiciatis animi perferendis
        temporibus velit.
      </p>
      <a href="/">
        <FontAwesomeIcon icon={faFacebook} />-
        todoFacebook.com
      </a>
      <a href="/">
        <FontAwesomeIcon icon={faTwitter} />-
        todoTwitter.com
      </a>
      <a href="/">
        <FontAwesomeIcon icon={faLinkedin} />-todoLinkedin.com
      </a>
      <a href="/">
        <FontAwesomeIcon icon={faGithub} />-
        todoGithub.com
      </a>
    </div>
  );
};

export default HomePage;
