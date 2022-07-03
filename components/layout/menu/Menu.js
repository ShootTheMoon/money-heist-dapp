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

const Menu = ({ showWallet, price }) => {
  const [toggleWalletInfoModal, setToggleWalletInfoModal] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(800);

  return (
    <div>
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
    </div>
  );
};

export default Menu;
