import "../styles/globals.css";
import Nav from "/components//Nav";
import Footer from "../components/Footer";
import { ChakraProvider } from "@chakra-ui/react";

import MouseCursorLayout from "../components/MouseCursorLayout";
import ContentLayout from "/components/ContentLayout";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
export const ListStyleComponent = React.createContext();

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	const [listStyle, setListStyle] = useState(true);

	return (
		<ChakraProvider>
			<Head>
				<meta property="og:site_name" content="暇な人の技術ブログ（仮）" />
				<title>暇な人の技術メモ（仮）</title>
			</Head>
			<ListStyleComponent.Provider
				value={{
					listStyle,
					setListStyle,
				}}
			>
				<MouseCursorLayout router={router}>
					<Nav router={router} />
					<ContentLayout router={router}>
						<AnimatePresence exitBeforeEnter>
							<Component {...pageProps} router={router} key={router.route.replace(/#.*/g, "")} />
						</AnimatePresence>
					</ContentLayout>
					<Footer router={router} />
				</MouseCursorLayout>
			</ListStyleComponent.Provider>
		</ChakraProvider>
	);
}

export default MyApp;
