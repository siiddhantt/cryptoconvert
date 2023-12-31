import { type AppType } from "next/dist/shared/lib/utils";
import { ThemeProvider } from "@material-tailwind/react";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
