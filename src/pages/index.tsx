import React from "react";
import Head from "next/head";
import { Poppins } from "next/font/google";
import { Select, Option } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { API } from "../api";
import { CURRENCIES } from "../constants";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
export default function Home() {
  const [data, setData] = React.useState([]);
  const [coin, setCoin] = React.useState("");
  const [currency, setCurrency] = React.useState("USD");
  const [amount, setAmount] = React.useState("");
  const [result, setResult] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  React.useMemo(() => {
    API.getTop(currency)
      .then((res) => {
        res
          .json()
          .then((data: []) => {
            setData(data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [currency]);
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    if (/^\d*\.?\d*$/.test(inputValue)) setAmount(inputValue);
  };
  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    setLoading(true);
    e.preventDefault();
    if (!coin || !currency || !amount) {
      toast.error("Some fields are empty!");
      setLoading(false);
      return;
    }
    await API.convert(coin, currency, parseFloat(amount))
      .then((res) => {
        res
          .json()
          .then((data: number) => {
            setResult(data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };
  return (
    <>
      <Head>
        <title>Currency Convert</title>
        <meta name="description" content="Currency converter Web App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#121212]">
        <div className="w-full opacity-20">
          <div id="stars"></div>
        </div>
        <div>
          <form className="flex flex-col items-center justify-center gap-3 rounded-xl border border-solid border-gray-500/[0.5] bg-white/[0.01] p-16 backdrop-blur">
            <Select
              size="lg"
              label="Crypto"
              placeholder={""}
              selected={(element) =>
                element &&
                React.cloneElement(element, {
                  disabled: true,
                  className:
                    "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                })
              }
              color={"blue"}
              className={`text-[#9ca3af] ${poppins.className}`}
            >
              {data.map(({ id, name, image }) => (
                <Option
                  key={name}
                  value={name}
                  className={`flex items-center gap-2 ${poppins.className}`}
                  onClick={() => {
                    setCoin(id);
                  }}
                >
                  <img
                    src={image}
                    alt={name}
                    className="h-5 w-5 rounded-full object-cover"
                  />
                  {name}
                </Option>
              ))}
            </Select>
            <input
              className={`border-blue-gray-200 w-full rounded-lg border bg-white bg-opacity-[0] p-2 text-[#9ca3af] outline-0 ${poppins.className}`}
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={handleChange}
            />
            <Select
              size="lg"
              label="Currency"
              placeholder={""}
              value="USD"
              selected={(element) =>
                element &&
                React.cloneElement(element, {
                  disabled: true,
                  className:
                    "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                })
              }
              color={"blue"}
              className={`text-[#9ca3af] ${poppins.className}`}
            >
              {CURRENCIES.map(({ name }) => (
                <Option
                  key={name}
                  value={name}
                  className={`flex items-center gap-2 ${poppins.className}`}
                  onClick={() => {
                    setCurrency(name);
                    setResult(0);
                  }}
                >
                  {name}
                </Option>
              ))}
            </Select>
            <div
              className={`mt-4 flex w-full items-center justify-center gap-2 ${poppins.className}`}
            >
              <h1 className="text-start text-sm text-[#9ca3af]">Amount:</h1>
              <h1 className="overflow-hidden text-end text-white">
                {result.toLocaleString("en-US", {
                  style: "currency",
                  currency: currency,
                  maximumFractionDigits: 4,
                })}
              </h1>
            </div>
            <button
              className={`rounded-lg bg-blue-500/[0.8] px-6 py-2 text-white ${poppins.className} flex h-10 w-28 items-center justify-center text-sm`}
              onClick={handleSubmit}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-white"></div>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </main>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
