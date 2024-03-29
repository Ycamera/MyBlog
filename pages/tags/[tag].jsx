import { getArticlesByTag } from "../../lib/getArticles.mjs";
import { PostList } from "../../components/PostList.jsx";
import { keysOfTag } from "../../components/keys/tag.js";
import { Heading } from "@chakra-ui/react";
import codeStyle from "/styles/css/decoration.module.css";
import { motion, AnimatePresence } from "framer-motion";
import MyHead from "../../components/MyHead.jsx";
import MotionLayout from "../../components/MotionLayout";

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
	const tag = router?.query?.tag ? router?.query?.tag : "";

	return (
		<MotionLayout>
			<MyHead type="article" title={`#${tag}`} description={`サイト内のタグ検索:${tag}`} />
			<AnimatePresence exitBeforeEnter>
				<motion.div
					key={router.route}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
				>
					<Heading
						as="h1"
						py="50px"
						textAlign={"center"}
						color="gray.700"
						className={codeStyle["code-heading"]}
					>
						{tag}
					</Heading>
				</motion.div>
				<PostList posts={posts} />
			</AnimatePresence>
		</MotionLayout>
	);
}
