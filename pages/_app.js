import "../styles/globals.css";
// React Imports
import { useState, useEffect, createContext, useContext } from "react";
// Library Imports
import Web3 from "web3";
import { BscConnector } from "@binance-chain/bsc-connector";
import WalletConnectProvider from "@walletconnect/web3-provider";
// Custom Imports
import tokenContract from "../blockchain/tokenAbi";
import {
  switchToBscMainnet,
  addBscMainnet,
} from "../components/Utils/Metamask_Functions/metmask";
import NotificationProvider from "../components/modals/AlertPopup/NotificationProvider";
import { tokenPrice } from "../components/Utils/TokenPrice/tokenprice";
// Components
import Layout from "../components/layout/Layout";
import Menu from "../components/layout/menu/Menu";

// Contexts
export const Web3Context = createContext(null);

function MyApp({ Component, pageProps, holders }) {
  /////////////////////////////////////////////////////////////////////

  // State variables
  const [showWallet, setShowWallet] = useState(false);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(
    new Web3("https://bsc-dataseed1.binance.org")
  );
  const [provider, setProvider] = useState(null);
  const [chain, setChain] = useState(56);
  const [price, setPrice] = useState(0.0);
  const [bnbPrice, setBnbPrice] = useState(0.0);
  const nativeTokenAddress = "0x223963cb59b1b0a0345365958146fd44cde2b7d1".toLowerCase();
  const tokenVM = tokenContract(web3, nativeTokenAddress);

  /////////////////////////////////////////////////////////////////////

  // Get token price every 10 seconds
  useEffect(() => {
    const getPrice = async () => {
      let p = await tokenPrice(web3, nativeTokenAddress);
      setPrice(p.priceInUSD);
      setBnbPrice(p.bnbPrice);
    };
    getPrice();
  }, []);

  // Disconnect Wallet
  const disconnectWalletHandler = async () => {
    setAccount(null);
    setWeb3(new Web3("https://bsc-dataseed1.binance.org"));
    if (provider) {
      await provider.disconnect();
      setProvider(null);
    }
  };

  /////////////////////////////////////////////////////////////////////

  // Wallet Providers

  //Injected web3 wallet connector
  const connectInjectedWalletHandler = async () => {
    //Check if metamask is available
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        if (window.ethereum) {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          web3 = new Web3(window.ethereum);

          //Get account address
          let addresses = await web3.eth.getAccounts();
          account = addresses[0];
          setShowWallet(false);

          // Check if chain is not bsc
          if ((await web3.eth.net.getId()) !== 56) {
            setChain(await web3.eth.net.getId());
            addBscMainnet();
            switchToBscMainnet();
          }

          //Check for accounts
          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
              setAccount(accounts[0]);
            } else {
              setAccount(null);
            }
          });

          window.ethereum.on("chainChanged", (networkId) => {
            if (networkId !== 56) {
              switchToBscMainnet();
              setChain(networkId);
            }
          });
        } else if (web3) {
          setWeb3(new Web3(web3.currentProvider));
        } else {
          console.log("No wallet installed");
        }
      } catch (err) {
        console.log(err + "Error");
      }
      //If not then return "error"
    } else {
      console.log("Injected wallet provider not found");
    }
    setWeb3(web3);
    setAccount(account.toLowerCase());
    return { account, web3 };
  };

  //Binance wallet connector
  const connectBinanceWalletHandler = async () => {
    if (typeof window !== "undefined" && typeof BinanceChain !== "undefined") {
      try {
        const binanceWallet = new BscConnector({
          supportedChainIds: [56, 97],
        });
        await binanceWallet.activate();

        //Set web3 provider
        web3 = new Web3(BinanceChain);

        //Get eth account address
        let addresses = await BinanceChain.requestAccounts();
        account = addresses[0].addresses[2].address;
        setShowWallet(false);

        //Check for accounts
        BinanceChain.on("accountsChanged", (accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          } else {
            setAccount(null);
          }
        });
      } catch (err) {
        console.log(err + "Error");
      }
    } else {
      console.log("Binance wallet not installed");
    }
    setWeb3(web3);
    setAccount(account.toLowerCase());
    return { web3, account };
  };

  //WalletConnect connector
  const connectWalletConnectHandler = async () => {
    try {
      const provider = new WalletConnectProvider({
        rpc: {
          56: "https://bsc-dataseed.binance.org/",
        },
      });
      await provider.enable();
      setProvider(provider);

      provider.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      });

      const web3 = new Web3(provider);
      const addresses = await web3.eth.getAccounts();
      account = addresses[0];

      if (web3 && addresses) {
        setShowWallet(false);
        setAccount(account.toLowerCase());
        setWeb3(web3);
        return { account, web3 };
      }
    } catch (err) {
      console.log(err);
    }
  };

  /////////////////////////////////////////////////////////////////////

  return (
    <Web3Context.Provider
      value={{
        disconnectWalletHandler,
        connectBinanceWalletHandler,
        connectInjectedWalletHandler,
        connectWalletConnectHandler,
        setShowWallet,
        setWeb3,
        setAccount,
        nativeTokenAddress,
        chain,
        account,
        price,
        bnbPrice,
        tokenVM,
        chain,
        showWallet,
        holders,
      }}
    >
      <NotificationProvider>
        <Menu showWallet={showWallet} price={price} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationProvider>
    </Web3Context.Provider>
  );
}

export default MyApp;

export async function getStaticProps() {
  const API_KEY = process.env.MY_API_KEY;
  const nativeTokenAddress = process.env.NATIVE_TOKEN_ADDRESS;
  // Get Holders
  let res = await fetch(
    `https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress="${nativeTokenAddress}"&apikey=${API_KEY}`
  );
  let data = await res.json();
  let holders = parseInt(data.result.length);

  return {
    props: {
      holders: holders,
    },
    revalidate: 30,
  };
}
