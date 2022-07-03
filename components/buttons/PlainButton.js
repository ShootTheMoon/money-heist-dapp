import styles from "./plainButton.module.css";
import Link from "next/link";

const PlainButton = (props) => {
  return (
    <>
      {props.link ? (
        <Link href={props.link}>
          <button
            className={styles.wrapper}
            onClick={props.function}
            onMouseEnter={props.mouseEnter}
            onMouseLeave={props.mouseLeave}
            style={{
              height: props.buttonHeight,
              width: props.buttonWidth,
              backgroundColor: props.backgroundColor,
              border: props.border,
              boxShadow: props.boxShadow,
            }}
          >
            {props.children}
          </button>
        </Link>
      ) : (
        <button
          className={styles.wrapper}
          onClick={props.function}
          onMouseEnter={props.mouseEnter}
          onMouseLeave={props.mouseLeave}
          style={{
            height: props.buttonHeight,
            width: props.buttonWidth,
            backgroundColor: props.backgroundColor,
            border: props.border,
            boxShadow: props.boxShadow,
          }}
        >
          {props.children}
        </button>
      )}
    </>
  );
};

export default PlainButton;
