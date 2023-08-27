import type { AppProps } from "next/app";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../styles/home.css";
import "../styles/admin.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
