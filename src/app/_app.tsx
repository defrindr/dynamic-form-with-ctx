import { AppProps } from 'next/app';
import { PrimeReactProvider } from 'primereact/api';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrimeReactProvider>
      <Component {...pageProps} />
    </PrimeReactProvider>
  );
}
