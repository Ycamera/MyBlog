import { getArticlesByTag } from "../../lib/getArticles.mjs";

import { PostList } from "../../components/PostList.jsx";
import { keysOfTag } from "../../components/keys/tag.js";
import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import codeStyle from "/styles/css/decoration.module.css";
import { motion } from "framer-motion";

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
	console.log(params);
	const data = await getArticlesByTag(params.tag);
	return {
		props: {
			posts: data,
		},
	};
};

export default function Tag({ posts }) {
	const router = useRouter();
	const tag = router?.query?.tag;

	return (
		<>
			<Heading as="h1" py="50px" textAlign={"center"} color="gray.700" className={codeStyle["code-heading"]}>
				{tag}
			</Heading>

			<PostList posts={posts} />
		</>
	);
}