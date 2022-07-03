// CSS
import styles from "./ConnectWalletButton.module.css";
// React Imports
import { useContext, useState, useEffect } from "react";
// Component Imports
import PlainButton from "../../../buttons/PlainButton";
// Context Imports
import { Web3Context } from "../../../../pages/_app";

const ConnectWalletButton = ({ setToggleWalletInfoModal }) => {
  const { account, setShowWallet, chain } = useContext(Web3Context);
  const [buttonText, setButtonText] = useState("Connect Wallet");

  useEffect(() => {
    const button = document.querySelector("#connect").firstElementChild;
    button.addEventListener('click', () => setShowWallet(true))
    !account
      ? setButtonText("Connect Wallet")
      : setButtonText(account.slice(0, 2) + ".." + account.slice(-7));
  }, [account]);

  return (
    <main className={styles.walletWrapper}>
      <div id="connect" className={styles.buttonWrapper}>
        <PlainButton
          buttonHeight="4rem"
          buttonWidth="15rem"
          className={styles.connectButton}
        >
          {buttonText}
        </PlainButton>
        {/* {!account ? (
          <PlainButton
            buttonHeight="4rem"
            buttonWidth="15rem"
            className={styles.connectButton}
            function={() => setShowWallet(true)}
            id="connect"
          >
            {buttonText}
          </PlainButton>
        ) : chain != 56 ? (
          <PlainButton
            buttonHeight="4rem"
            buttonWidth="15rem"
            backgroundColor={"#ff0000"}
            color={"#fff"}
            border={"none"}
            boxShadow={"0rem 0rem 3rem .1rem rgba(255, 0, 0, 0.4)"}
            className={styles.wrongNetwork}
          >
            Wrong Network
          </PlainButton>
        ) : (
          <PlainButton
            className={styles.connectButton}
            buttonHeight="4rem"
            buttonWidth="15rem"
            backgroundColor={"#e61d2e"}
            function={() => setToggleWalletInfoModal(true)}
          >
            <div className={styles.walletInfo}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                className={styles.walletIcon}
              >
                <path d="M6 20Q4.35 20 3.175 18.825Q2 17.65 2 16V8Q2 6.35 3.175 5.175Q4.35 4 6 4H18Q19.65 4 20.825 5.175Q22 6.35 22 8V16Q22 17.65 20.825 18.825Q19.65 20 18 20ZM6 8H18Q18.55 8 19.05 8.125Q19.55 8.25 20 8.525V8Q20 7.175 19.413 6.588Q18.825 6 18 6H6Q5.175 6 4.588 6.588Q4 7.175 4 8V8.525Q4.45 8.25 4.95 8.125Q5.45 8 6 8ZM4.15 11.25 15.275 13.95Q15.5 14 15.725 13.95Q15.95 13.9 16.15 13.75L19.625 10.85Q19.35 10.475 18.925 10.238Q18.5 10 18 10H6Q5.35 10 4.863 10.337Q4.375 10.675 4.15 11.25Z" />
              </svg>
              {buttonText}
            </div>
          </PlainButton>
        )} */}
      </div>
    </main>
  );
};

export default ConnectWalletButton;
