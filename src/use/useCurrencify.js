export function useCurrencify(amount) {
  // format: "+ $ 4,999.99" | "- $ 999.00"
  const sign = amount > 0 ? "+" : amount < 0 ? "-" : "";

  const currencySymbol = "$";

  const amountFormatted = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${sign} ${currencySymbol} ${amountFormatted}`;
}