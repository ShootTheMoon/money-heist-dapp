//CSS
import styles from "./walletInfo.module.css";
// Custom Function
import { copyToClipboard } from "../../Utils/CopyText/copyText";
import getTokenBalance from "../../Utils/WalletFunctions/walletTokenBalance";
// React Imports
import { useState, useEffect, useContext } from "react";
// Library Imports
import { motion } from "framer-motion";
//Context Imports
import { Web3Context } from "../../../pages/_app";
// Component Imports
import PlainButton from "../../buttons/PlainButton";

const WalletInfo = ({ setToggleWalletInfoModal }) => {
  const { account, setAccount, nativeTokenAddress } = useContext(Web3Context);
  const [bnbBalance, setBnbBallance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);

  const balance = async () => {
    const balance = await getTokenBalance(account, nativeTokenAddress);
    setBnbBallance(balance.bnbBalance.toFixed(4));
    setTokenBalance(balance.tokenBalance.toFixed(4));
  };

  useEffect(() => {
    balance();
  }, []);


  const animations = {
    background: {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
      },
      exit: {
        opacity: 0,
      },
    },
    modal: {
      hidden: {
        scale: 0.5,
        opacity: 0,
      },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          delay: 0.1,
        },
      },
      exit: {
        scale: 0.5,
        opacity: 0,
        transition: {
          scale: {
            delay: 0.1,
          },
        },
      },
    },
  };

  return (
    <motion.div
      variants={animations.background}
      style={{ position: "relative", zIndex: "100000" }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div
        className={styles.main}
        onClick={() => setToggleWalletInfoModal(false)}
      >
        <motion.div
          variants={animations.modal}
          initial="hidden"
          animate="visible"
          exit="exit"
          id="popUp"
          className={styles.popupWrapper}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.popupHeader}>
            <h2>Wallet Info</h2>
          </div>
          <div className={styles.popupBody}>
            <div className={styles.infoWrapper}>
              <div className={styles.infoWrapper}>
                <div>BNB Balance:</div>
                <div>{bnbBalance}</div>
              </div>
              <div className={styles.infoWrapper}>
                <div>$HEIST Balance:</div>
                <div>{tokenBalance}</div>
              </div>
              <div
                className={styles.address}
                onClick={() => copyToClipboard(account)}
              >
                {account && `${account.slice(0, 3)}...${account.slice(-20)}`}
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                  <path d="M9.825 17.9Q8.8 17.9 8.088 17.188Q7.375 16.475 7.375 15.45V3.875Q7.375 2.85 8.088 2.125Q8.8 1.4 9.825 1.4H18.35Q19.375 1.4 20.1 2.125Q20.825 2.85 20.825 3.875V15.45Q20.825 16.475 20.1 17.188Q19.375 17.9 18.35 17.9ZM9.825 15.75H18.35Q18.475 15.75 18.575 15.662Q18.675 15.575 18.675 15.45V3.875Q18.675 3.75 18.575 3.65Q18.475 3.55 18.35 3.55H9.825Q9.7 3.55 9.613 3.65Q9.525 3.75 9.525 3.875V15.45Q9.525 15.575 9.613 15.662Q9.7 15.75 9.825 15.75ZM5.025 22.7Q4 22.7 3.288 21.987Q2.575 21.275 2.575 20.25V6.3H4.725V20.25Q4.725 20.375 4.812 20.462Q4.9 20.55 5.025 20.55H15.925V22.7ZM9.525 3.55Q9.525 3.55 9.525 3.637Q9.525 3.725 9.525 3.875V15.45Q9.525 15.575 9.525 15.662Q9.525 15.75 9.525 15.75Q9.525 15.75 9.525 15.662Q9.525 15.575 9.525 15.45V3.875Q9.525 3.725 9.525 3.637Q9.525 3.55 9.525 3.55Z" />
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.popupFooter}>
            <PlainButton
              function={() => {
                setToggleWalletInfoModal(false);
                setAccount(null);
              }}
              buttonHeight="4rem"
              backgroundColor="#e61d2e"
            >
              Disconnect
            </PlainButton>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WalletInfo;
