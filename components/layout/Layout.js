// CSS
import styles from "./Layout.module.css";
// React Imports

// Component imports

const Layout = (props) => {
  return (
    <main className={styles.layoutWrapper}>
      {props.children}
    </main>
  );
};

export default Layout;
