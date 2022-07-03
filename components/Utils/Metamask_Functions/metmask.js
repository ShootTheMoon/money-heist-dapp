const tokenAddress = "";
const tokenSymbol = "";
const tokenDecimals = 18;
const tokenImage = "";
const chainId = "0x38";

//Add BSC to MetaMask
async function addBscMainnet() {
  try {
    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: chainId,
          chainName: "BSC",
          nativeCurrency: {
            name: "Binance Coin",
            symbol: "BNB",
            decimals: 18,
          },
          rpcUrls: [rpcURL],
          blockExplorerUrls: [blockExplorerUrls],
        },
      ],
    });
  } catch (addError) {
    console.log("Error: Something went wrong");
    console.log(addError);
  }
}

//Switch to BSC Mainnet on MetaMask
async function switchToBscMainnet() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainId }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        addBscMainnet();
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }
}

// Add Token To MetaMask
async function addTokenFunction() {
  try {
    const addToken = await ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage,
        },
      },
    });

    if (addToken) {
      console.log("Token has been added!");
    } else {
      console.log("Error: Something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
}

export { addTokenFunction, switchToBscMainnet, addBscMainnet };
