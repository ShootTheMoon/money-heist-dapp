// React Imports
import { useContext, useState } from "react";
// Library Imports
import { AnimatePresence } from "framer-motion";
// Component Imports
import DesktopMenu from "./desktop/DesktopMenu";
import WalletConnect from "../../modals/WalletConnect/WalletConnect";
import WalletInfo from "../../modals/WalletInfo/WalletInfo";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const Menu = ({ showWallet, price, children }) => {
  const [toggleWalletInfoModal, setToggleWalletInfoModal] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(800);

  return (
    <main>
      <DesktopMenu
        setToggleWalletInfoModal={setToggleWalletInfoModal}
        price={price}
      />
      <AnimatePresence exitBeforeEnter>
        {showWallet && <WalletConnect />}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        {toggleWalletInfoModal && (
          <WalletInfo setToggleWalletInfoModal={setToggleWalletInfoModal} />
        )}
      </AnimatePresence>
      {children}
    </main>
  );
};

export default Menu;
