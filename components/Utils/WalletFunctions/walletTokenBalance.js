import Web3 from "web3";

const getTokenBalance = async (account, tokenAddress) => {
  const web3 = new Web3("https://bsc-dataseed1.binance.org");
  account = account.toLowerCase();

  if (tokenAddress) {
    tokenAddress = tokenAddress.toLowerCase();
    let minABI = [
      // balanceOf
      {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
      },
      // decimals
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint8" }],
        type: "function",
      },
    ];
    const vm = new web3.eth.Contract(minABI, tokenAddress);
    let decimals = await vm.methods.decimals().call();
    let bnbBalance = await web3.eth.getBalance(account);
    let tokenBalance = await vm.methods.balanceOf(account).call();
    bnbBalance = web3.utils.fromWei(bnbBalance, "ether");
    tokenBalance = tokenBalance / 10**(parseInt(decimals))
    bnbBalance = parseFloat(bnbBalance);
    tokenBalance = parseFloat(tokenBalance);
    return { bnbBalance, tokenBalance };
  } else {
    let bnbBalance = await web3.eth.getBalance(account);
    bnbBalance = web3.utils.fromWei(bnbBalance, "ether");
    bnbBalance = parseFloat(bnbBalance);
    return bnbBalance;
  }
};

export default getTokenBalance;
