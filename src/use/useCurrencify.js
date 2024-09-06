import { useStoreSettings } from "src/stores/storeSettings";

const storeSettings = useStoreSettings();

export function useCurrencify(amount) {
  const sign = amount > 0 ? "+" : amount < 0 ? "-" : "";

  const currencySymbol = storeSettings.settings.currencySymbol;

  const amountFormatted = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${sign} ${currencySymbol} ${amountFormatted}`;
}
