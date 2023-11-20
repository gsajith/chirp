import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { SignOut } from "~/components/signoutbutton";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <Head>
        <title>Chirp - Emoji Twitter</title>
        <meta name="description" content="Emoji-only Twitter clone." />
      </Head>
      <Toaster position="bottom-center" />
      <Component {...pageProps} />
      <SignOut />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
