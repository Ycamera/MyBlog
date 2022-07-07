import "../styles/globals.css";
import "/styles/css/code.css";
import Nav from "/components//Nav";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "/components/Layout";

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Nav />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ChakraProvider>
	);
}

export default MyApp;
