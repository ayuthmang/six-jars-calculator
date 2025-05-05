export const toFixed = (num: number) => +num.toFixed(4);

export const toDisplay = (num: number) =>
  new Intl.NumberFormat("default", { maximumFractionDigits: 2 }).format(num);
