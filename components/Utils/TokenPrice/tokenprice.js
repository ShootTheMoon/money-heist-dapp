import pancakeswapContract from "../../../blockchain/pancakeswap";
import tokenContract from "../../../blockchain/tokenAbi";
// PCS address
const pancakeswapAddress =
  "0x10ED43C718714eb63d5aA57B78B54704E256024E".toLowerCase();

async function calcSell(web3, tokenAddress) {
  const router = pancakeswapContract(web3, pancakeswapAddress);
  let tokensToSell = 1;
  // Initiate web3
  const BNBTokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";

  // Initate PCS contract

  // Initiate token contract
  const tokenRouter = tokenContract(web3, tokenAddress);

  // Get token decimals
  const tokenDecimals = await tokenRouter.methods.decimals().call();

  tokensToSell = setDecimals(tokensToSell, tokenDecimals);
  let amountOut;
  try {
    amountOut = await router.methods
      .getAmountsOut(tokensToSell, [tokenAddress, BNBTokenAddress])
      .call();
    amountOut = web3.utils.fromWei(amountOut[1]);
  } catch (error) {}

  if (!amountOut) return 0;
  return amountOut;
}
export async function calcBNBPrice(web3) {
  const router = pancakeswapContract(web3, pancakeswapAddress);
  const BNBTokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"; //BNB
  const USDTokenAddress = "0x55d398326f99059fF775485246999027B3197955"; //USDT
  let bnbToSell = web3.utils.toWei("1", "ether");
  let amountOut;
  try {
    amountOut = await router.methods
      .getAmountsOut(bnbToSell, [BNBTokenAddress, USDTokenAddress])
      .call();
    amountOut = web3.utils.fromWei(amountOut[1]);
  } catch (error) {}
  if (!amountOut) return 0;
  return amountOut;
}
function setDecimals(number, decimals) {
  number = number.toString();
  let numberAbs = number.split(".")[0];
  let numberDecimals = number.split(".")[1] ? number.split(".")[1] : "";
  while (numberDecimals.length < decimals) {
    numberDecimals += "0";
  }
  return numberAbs + numberDecimals;
}

export const tokenPrice = async (web3, tokenAddress) => {
  let bnbPrice = await calcBNBPrice(web3);
  let tokens_to_sell = 1;
  let priceInBnb = (await calcSell(web3, tokenAddress)) / tokens_to_sell;
  let priceInUSD = priceInBnb * bnbPrice;
  return { priceInUSD, bnbPrice };
};
