import React from "react";
import classes from "./AboutPage.module.css";
import myPhoto from "../../assets/images/owner.jpg";
import registerPhoto from "../../assets/images/register.png";
import contactPhoto from "../../assets/images/contact.png";
import toDoPhoto from "../../assets/images/tasks.png";
import addTaskPhoto from "../../assets/images/addTask.png";
import filterPhoto from "../../assets/images/filter.png";
import delSlectedsPhoto from "../../assets/images/delSlecteds.png";
import taskPhoto from "../../assets/images/task.png";
import messagePhoto from "../../assets/images/message.png";
import taskPagePhoto from "../../assets/images/taskPage.png";
import navPhoto from "../../assets/images/nav.png";
import goodLuckPhoto from "../../assets/images/goodLuck.jpg";

import { Carousel } from "react-bootstrap";

const AboutPage = () => {
  return (
    <div className={classes.home}>
      <h1>About Me</h1>
      <div className={classes.aboutMe}>
        <img src={myPhoto} alt="creator_picture" />
        <div className={classes.textBlock}>
          <p>
            I am Artur Karapetyan. i am 25 yars old(26/03/1995). <br />
            I studied at Yerevan State University as an
            economist(2012-2013,2015-2019) and graduated with honors. <br />
            In 2013-2015 i served in the army. <br />I studied programming at
            the Bitschool Programming and Business Center.(Html/Css(less),
            Bootstrap, JavaScript, React.js, Redux, Git/Github...)
            <br />I learned Sass/Scss, Typescript and Firebase on my own.
          </p>
        </div>
      </div>
      <div className={classes.sliderBlock}>
        <div>
          <h3>Abot My To-Do-List</h3>
        </div>
        <div className={classes.slider}>
          <Carousel>
            <Carousel.Item>
              <img src={registerPhoto} alt="Register_Photo" />
              <Carousel.Caption>
                <p>Nobody can see your tasks.</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img src={contactPhoto} alt="Contact_Photo" />
              <Carousel.Caption>
                <p>
                  You can write us if have problem, and read about us <br />
                  and about program whitout register
                </p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img src={toDoPhoto} alt="todoPage" />
              <Carousel.Caption>
                <p>Good and simple interface.</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img src={addTaskPhoto} alt="add_task_photo" />
              <Carousel.Caption>
                <p>Add your task, give header ,description and deadline</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img src={filterPhoto} alt="adfilter_tasks_photo" />
              <Carousel.Caption>
                <p>Filter tasks</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img src={delSlectedsPhoto} alt="delete_tasks_photo" />
              <Carousel.Caption>
                <p>Select tasks and remove its.</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img src={taskPhoto} alt="task_photo" />
              <Carousel.Caption>
                <p>Mark as active or done, edit and delete it.</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img src={messagePhoto} alt="message_photo" />
              <Carousel.Caption>
                <p>Get success and filed messages.</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img src={taskPagePhoto} alt="goTask_photo" />
              <Carousel.Caption>
                <p>Go to the task page.</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img src={navPhoto} alt="navbar_photo" />
              <Carousel.Caption>
                <p>Our navbar will accompany you wherever you are</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img src={goodLuckPhoto} alt="goodLuck_photo" />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
