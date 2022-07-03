//CSS
import styles from "../styles/index.module.css";
// Component Imports
import Container from "../components/layout/container/Container";

const index = () => {
  return (
    <main className={styles.main}>
      <Container gap={'5rem'}>
        <div className={styles.introWrapper}>
          <h2>Join The Heist</h2>
        </div>
        <div className={styles.itemWrapper}>
          <div className={styles.statsWrapper}>
            <div className={styles.stats}>
              <div>Holder Count</div>
              <div>Holder Count</div>
            </div>
            <div className={styles.stats}>
              <div>Market Cap</div>
              <div>Market Cap</div>
            </div>
            <div className={styles.stats}>
              <div>Liquidity</div>
              <div>Liquidity</div>
            </div>
          </div>
          <iframe
            className={styles.chart}
            src="https://dexscreener.com/bsc/0x745EE6424F5692242F6941E7165379325c4Fb567?embed=1&theme=dark&trades=0&info=0"
          ></iframe>
        </div>
      </Container>
    </main>
  );
};

export default index;
