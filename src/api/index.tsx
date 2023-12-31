export const API = {
  getCurrencies: () => {
    return fetch(`${process.env.NEXT_PUBLIC_URI}/api/crypto/currencies`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getTop: (text: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_URI}/api/crypto/top`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currency: text }),
    });
  },
  convert: (fromCurr: string, toCurr: string, amount: number) => {
    return fetch(`${process.env.NEXT_PUBLIC_URI}/api/crypto/convert`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromCurrency: fromCurr,
        toCurrency: toCurr,
        amount: amount,
      }),
    });
  },
};
