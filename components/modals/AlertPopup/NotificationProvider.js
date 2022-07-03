import styles from "./notificationProvider.module.css";
import { useReducer, createContext } from "react";
import Notification from "./Notification";
import { AnimatePresence } from "framer-motion";

export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";
export const NotificationContext = createContext(null);

const NotificationProvider = (props) => {
  const [state, dispatch] = useReducer((state, action) => {
    if (state) {
      state = []
    }
    switch (action.type) {
      case REMOVE_NOTIFICATION:
        return state.filter((el) => el.id !== action.id);

      case ADD_NOTIFICATION:
        return [...state, { ...action.payload }];

      default:
        return state;
    }
  }, []);

  return (
    <NotificationContext.Provider value={dispatch}>
      <div className={styles.wrapper}>
        <AnimatePresence>
          {state.map((note) => {
            return <Notification dispatch={dispatch} key={note.id} {...note} />;
          })}
        </AnimatePresence>
      </div>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
