export const formatMarketCap = (
  marketCap: number,
  numberOfDigits: number,
  moneyAmount: "K" | "M" | "B" | "T"
) => {
  const stringedMarketCap = String(marketCap);

  let validMarketCap = stringedMarketCap[0];
  for (let i = 1; i <= numberOfDigits; i++) {
    validMarketCap += stringedMarketCap[i];
  }

  validMarketCap += "," + stringedMarketCap[numberOfDigits + 1] + moneyAmount;

  return validMarketCap;
};
