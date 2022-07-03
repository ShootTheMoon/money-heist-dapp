import React from "react";
import Image from "next/image";
import styles from "./walletWrapper.module.css";

const WalletWrapper = (props) => {
  return (
    <div className={styles.walletWrapper} onClick={props.function}>
      <div className={styles.walletLogo}>
        <Image height={props.height} width={props.width} src={props.img} />
      </div>
      <h3>{props.name}</h3>
    </div>
  );
};

export default WalletWrapper;
