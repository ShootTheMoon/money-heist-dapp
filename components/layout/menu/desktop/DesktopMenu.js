// CSS
import styles from "./DesktopMenu.module.css";
// React Imports
import Image from "next/image";
//Component Imports
import ConnectWalletButton from "./ConnectWalletButton";
// Asset Imports
import TextLogo from "../../../../public/images/logos/TextLogo.png";
import SplatLogo from "../../../../public/images/logos/money-drop.png";
import Logo from "../../../../public/images/logos/mask-hooded.png";

const DesktopMenu = ({ setToggleWalletInfoModal, price }) => {
  return (
    <main className={styles.main}>
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <div className={styles.headerLeft}></div>
          <div className={styles.headerRight}>
            <div className={styles.priceWrapper}>
              <div className={styles.tokenLogoWrapper}>
                <Image height={30} width={33} src={Logo}></Image>
              </div>
              <div className={styles.price}>
                0.{price.toFixed(10).toString().slice(6)}
              </div>
            </div>
            <ConnectWalletButton
              setToggleWalletInfoModal={setToggleWalletInfoModal}
            />
          </div>
        </div>
      </div>
      <div className={styles.menuWrapper}>
        <Image height={125} width={278} src={SplatLogo} />
        <div className={styles.socialsWrapper}>
          <svg
            onClick={() => window.open("https://t.me/MoonLabsOfficial")}
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 24 24"
          >
            <path d="M22.26465,2.42773a2.04837,2.04837,0,0,0-2.07813-.32421L2.26562,9.33887a2.043,2.043,0,0,0,.1045,3.81836l3.625,1.26074,2.0205,6.68164A.998.998,0,0,0,8.134,21.352c.00775.012.01868.02093.02692.03259a.98844.98844,0,0,0,.21143.21576c.02307.01758.04516.03406.06982.04968a.98592.98592,0,0,0,.31073.13611l.01184.001.00671.00287a1.02183,1.02183,0,0,0,.20215.02051c.00653,0,.01233-.00312.0188-.00324a.99255.99255,0,0,0,.30109-.05231c.02258-.00769.04193-.02056.06384-.02984a.9931.9931,0,0,0,.20429-.11456,250.75993,250.75993,0,0,1,.15222-.12818L12.416,18.499l4.03027,3.12207a2.02322,2.02322,0,0,0,1.24121.42676A2.05413,2.05413,0,0,0,19.69531,20.415L22.958,4.39844A2.02966,2.02966,0,0,0,22.26465,2.42773ZM9.37012,14.73633a.99357.99357,0,0,0-.27246.50586l-.30951,1.504-.78406-2.59307,4.06525-2.11695ZM17.67188,20.04l-4.7627-3.68945a1.00134,1.00134,0,0,0-1.35352.11914l-.86541.9552.30584-1.48645,7.083-7.083a.99975.99975,0,0,0-1.16894-1.59375L6.74487,12.55432,3.02051,11.19141,20.999,3.999Z" />
          </svg>
          <svg
            onClick={() => window.open("https://twitter.com/MoonLabOfficial")}
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 24 24"
          >
            <path d="M22.99121,3.9502a.99942.99942,0,0,0-1.51074-.85938,7.47956,7.47956,0,0,1-1.873.793,5.15234,5.15234,0,0,0-3.374-1.24219,5.23238,5.23238,0,0,0-5.22363,5.06348A11.03194,11.03194,0,0,1,4.19629,3.78125,1.01154,1.01154,0,0,0,3.33887,3.416a.99852.99852,0,0,0-.78516.5,5.2755,5.2755,0,0,0-.24219,4.76855l-.00195.00195a1.0411,1.0411,0,0,0-.49512.88868,3.04174,3.04174,0,0,0,.02637.43945,5.1854,5.1854,0,0,0,1.56836,3.3125.99813.99813,0,0,0-.06641.76953,5.20436,5.20436,0,0,0,2.36231,2.92187,7.46464,7.46464,0,0,1-3.58985.44825.99975.99975,0,0,0-.665,1.833A12.94248,12.94248,0,0,0,8.46,21.36133,12.7878,12.7878,0,0,0,20.9248,11.998,12.82166,12.82166,0,0,0,21.46,8.35156c0-.06543,0-.13281-.001-.20019A5.76963,5.76963,0,0,0,22.99121,3.9502ZM19.68457,7.16211a.995.995,0,0,0-.2334.70215c.00977.165.00879.331.00879.4873a10.82371,10.82371,0,0,1-.4541,3.08106A10.68457,10.68457,0,0,1,8.46,19.36133a10.93791,10.93791,0,0,1-2.55078-.30078,9.47951,9.47951,0,0,0,2.94238-1.56348A1.00033,1.00033,0,0,0,8.25,15.71094a3.208,3.208,0,0,1-2.21387-.93457q.22413-.04248.44532-.10547a1.00026,1.00026,0,0,0-.08008-1.94336,3.19824,3.19824,0,0,1-2.25-1.72559,5.29929,5.29929,0,0,0,.54492.0459,1.02093,1.02093,0,0,0,.9834-.69629A.9998.9998,0,0,0,5.2793,9.21484,3.19559,3.19559,0,0,1,3.85547,6.542c0-.0664.00195-.13281.00586-.19824a13.01365,13.01365,0,0,0,8.209,3.47949,1.02046,1.02046,0,0,0,.81739-.3584,1.00037,1.00037,0,0,0,.206-.86816,3.15653,3.15653,0,0,1-.08691-.72852A3.23,3.23,0,0,1,16.2334,4.6416a3.18428,3.18428,0,0,1,2.34472,1.02051A.993.993,0,0,0,19.499,5.96a9.27073,9.27073,0,0,0,1.21192-.32226A6.68126,6.68126,0,0,1,19.68457,7.16211Z" />
          </svg>
          <svg
            onClick={() => window.open("https://docs.moonlabs.site/")}
            viewBox="0 0 24 24"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.802 17.77a.703.703 0 1 1-.002 1.406.703.703 0 0 1 .002-1.406m11.024-4.347a.703.703 0 1 1 .001-1.406.703.703 0 0 1-.001 1.406m0-2.876a2.176 2.176 0 0 0-2.174 2.174c0 .233.039.465.115.691l-7.181 3.823a2.165 2.165 0 0 0-1.784-.937c-.829 0-1.584.475-1.95 1.216l-6.451-3.402c-.682-.358-1.192-1.48-1.138-2.502.028-.533.212-.947.493-1.107.178-.1.392-.092.62.027l.042.023c1.71.9 7.304 3.847 7.54 3.956.363.169.565.237 1.185-.057l11.564-6.014c.17-.064.368-.227.368-.474 0-.342-.354-.477-.355-.477-.658-.315-1.669-.788-2.655-1.25-2.108-.987-4.497-2.105-5.546-2.655-.906-.474-1.635-.074-1.765.006l-.252.125C7.78 6.048 1.46 9.178 1.1 9.397.457 9.789.058 10.57.006 11.539c-.08 1.537.703 3.14 1.824 3.727l6.822 3.518a2.175 2.175 0 0 0 2.15 1.862 2.177 2.177 0 0 0 2.173-2.14l7.514-4.073c.38.298.853.461 1.337.461A2.176 2.176 0 0 0 24 12.72a2.176 2.176 0 0 0-2.174-2.174" />
          </svg>
          <svg
            onClick={() => window.open("https://medium.com/@moonlabs")}
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 24 24"
          >
            <path d="M21.20905,6.41669H22V4.08331H14.51978l-2.48584,9.16663h-.068L9.50269,4.08331H2V6.41663h.76837A.89578.89578,0,0,1,3.5,7.11139v9.83032a.84093.84093,0,0,1-.73163.6416H2v2.33338H8V17.58331H6.5V7.25h.08752L10.0451,19.91669h2.712L16.25989,7.25h.07355V17.58331H14.83337v2.33338H22V17.58331h-.79095a.83931.83931,0,0,1-.70905-.6416V7.11145A.8976.8976,0,0,1,21.20905,6.41669Z" />
          </svg>
        </div>
      </div>
    </main>
  );
};

export default DesktopMenu;
