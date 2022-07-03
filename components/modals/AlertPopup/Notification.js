import { useState, useEffect } from "react";
import styles from "./notification.module.css";
import { motion } from "framer-motion";
import { REMOVE_NOTIFICATION } from "./NotificationProvider";

const Notification = (props) => {
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  const startTimerHandler = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(intervalID);
        return prev;
      });
    }, 20);

    setIntervalID(id);
  };

  const pauseTimerHandler = () => {
    clearInterval(intervalID);
  };

  const closeNotificationHandler = () => {
    pauseTimerHandler();
    props.dispatch({
      type: REMOVE_NOTIFICATION,
      id: props.id,
    });
  };

  useEffect(() => {
    if (width >= 100) {
      closeNotificationHandler();
    }
  }, [width]);

  useEffect(() => {
    startTimerHandler();
  }, []);

  const animation = {
    initial: {
      opacity: 0,
      x: 200,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        opacity: {
          durration: 0.2,
        },
        x: {
          durration: 0.2,
        },
      },
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      variants={animation}
      initial="initial"
      animate="visible"
      exit="exit"
      onMouseEnter={pauseTimerHandler}
      onMouseLeave={startTimerHandler}
    >
      <div className={styles.wrapper}>
        <div className={styles.alert}>
          {props.icon}
          <div className={styles.info}>
            <p>{props.message}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Notification;
