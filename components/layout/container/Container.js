// CSS
import styles from "./container.module.css";

const Container = (props) => {
  return (
    <main style={{ gap: props.gap }} className={styles.main}>
      {props.children}
    </main>
  );
};

export default Container;
