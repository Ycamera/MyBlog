import { getArticlesByTag } from "../../lib/getArticles.mjs";

import { PostList } from "../../components/PostList.jsx";
import { keysOfTag } from "../../components/keys/tag.js";
import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import codeStyle from "/styles/css/decoration.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MyHead from "../../components/MyHead.jsx";

export const getStaticPaths = async () => {
	const paths = keysOfTag.map((tag) => {
		return { params: { tag: tag } };
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params }) => {
	const data = await getArticlesByTag(params.tag);
	return {
		props: {
			posts: data,
		},
	};
};

export default function Tag({ posts, router }) {
	const tag = router?.query?.tag;

	return (
		<>
			<MyHead type="article" title={`#${tag}`} description={`サイト内のタグ検索:${tag}`} />
			<Heading as="h1" py="50px" textAlign={"center"} color="gray.700" className={codeStyle["code-heading"]}>
				{tag}
			</Heading>

			<PostList posts={posts} />
		</>
	);
}

/**
export default function Tag({ articles, router }) {
	const tag = router?.query?.tag;

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		set();
		async function set() {
			setPosts(await getArticlesByTag(tag, false, articles));
		}
	}, [tag, articles]);
	 */
