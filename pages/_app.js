import "../styles/globals.css";
import "/styles/css/code.css";
import Nav from "/components//Nav";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "/components/Layout";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getArticles } from "../lib/getArticles.mjs";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	return (
		<ChakraProvider>
			<Head>
				<meta property="og:site_name" content="暇な人の技術ブログ（仮）" />
				<title>暇な人の技術ブログ（仮）</title>
			</Head>

			<Nav router={router} />
			<Layout>
				<Component {...pageProps} router={router} />
			</Layout>
		</ChakraProvider>
	);
}

export default MyApp;

/**

export const ArticleContext = React.createContext();

function MyApp({ Component, pageProps }) {
	
	
	const [articles, setArticles] = useState([]);

	const router = useRouter();
	
	useEffect(() => {
		set();
		async function set() {
			if (!articles.length) setArticles(await getArticles());
		}
	}, []);

	return (
		<ChakraProvider>
			<Head>
				<meta property="og:site_name" content="暇な人の技術ブログ（仮）" />
				<title>暇な人の技術ブログ（仮）</title>
			</Head>
			<ArticleContext.Provider value={articles}>
				<Nav />
				<Layout>
					<Component {...pageProps} articles={articles} setArticles={setArticles} router={router} />
				</Layout>
			</ArticleContext.Provider>
		</ChakraProvider>
	);
}
 */
