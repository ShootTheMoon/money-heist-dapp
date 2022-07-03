import { useContext, useEffect, useState } from "react";
import styles from "./walletconnect.module.css";
import { motion } from "framer-motion";
import { Web3Context } from "../../../pages/_app";
import WalletWrapper from "./WalletWrapper";
import MetaMaskIcon from "../../../public/images/wallets/MetaMask.png";
import BinanceIcon from "../../../public/images/wallets/Binance.png";
import TrustWalletIcon from "../../../public/images/wallets/Trustwallet.png";
import WalletConnectIcon from "../../../public/images/wallets/WalletConnect.png";
import PlainButton from "../../buttons/PlainButton";

const WalletConnect = () => {

  const {
    setWeb3,
    setAccount,
    setShowWallet,
    connectInjectedWalletHandler,
    connectBinanceWalletHandler,
    connectWalletConnectHandler,
  } = useContext(Web3Context);

  const injectedWallet = async () => {
    const injected = await connectInjectedWalletHandler();
    setWeb3(injected.web3);
    setAccount(injected.account);
  };
  const binanceWallet = async () => {
    const binance = await connectBinanceWalletHandler();
    setWeb3(binance.web3);
    setAccount(binance.account);
  };
  const walletConnect = async () => {
    const wallet = await connectWalletConnectHandler();
    document.getElementsByClassName(
      "walletconnect-modal__base"
    ).style.fontSize = "3rem";

    setWeb3(wallet.web3);
    setAccount(wallet.account);
  };

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
    wallets: {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
        transition: {
          delay: 0.2,
        },
      },
      exit: {
        opacity: 0,
      },
    },
  };

  const wallets = [
    {
      id: "MetaMask",
      img: MetaMaskIcon,
      height: 35,
      width: 35,
      funciton: () => injectedWallet(),
    },
    {
      id: "Trust Wallet",
      img: TrustWalletIcon,
      height: 35,
      width: 35,
      funciton: () => injectedWallet(),
    },
    {
      id: "Binance",
      img: BinanceIcon,
      height: 35,
      width: 35,
      funciton: () => binanceWallet(),
    },
    {
      id: "Wallet Connect",
      img: WalletConnectIcon,
      height: 35,
      width: 35,
      funciton: () => walletConnect(),
    },
  ];

  return (
    <motion.div
      variants={animations.background}
      style={{ position: "relative", zIndex: "100000" }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <main className={styles.main} onClick={() => setShowWallet(false)}>
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
            <h2>Select your wallet</h2>
          </div>
          <div className={styles.walletsBackground}>
            <motion.div
              variants={animations.wallets}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={styles.wallets}
            >
              {wallets.map((wallet, i) => (
                <motion.div
                  key={wallet.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 + 0.1 * (i + 1) }}
                >
                  <WalletWrapper
                    name={wallet.id}
                    img={wallet.img}
                    height={wallet.height}
                    width={wallet.width}
                    function={wallet.funciton}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className={styles.popupFooter}>
            <PlainButton
              buttonHeight={35}
              buttonWidth={60}
              function={() => setShowWallet(false)}
              backgroundColor="#e61d2e"
            >
              Exit
            </PlainButton>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default WalletConnect;
