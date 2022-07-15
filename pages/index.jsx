import Head from "next/head";

import { Flex, Box, Heading } from "@chakra-ui/react";

import { getArticles } from "../lib/getArticles.mjs";

import { PostList } from "../components/PostList";

import MyHead from "../components/MyHead.jsx";
import MotionLayout from "../components/MotionLayout.jsx";

export const getStaticProps = async () => {
	const data = await getArticles();

	return {
		props: {
			posts: data,
		},
	};
};

export default function Home({ posts }) {
	return (
		<MotionLayout>
			<MyHead
				type="blog"
				title="暇な人の技術ブログ"
				description="のんびりと忘れそうなことを綴っていく技術ブログ（仮）です。"
			/>

			<Heading
				as="h1"
				py="50"
				textAlign="center"
				style={{ fontFamily: "'Stick', 'sans-serif'" }}
				color="gray.700"
				className="font-stick"
			>
				暇な人の技術メモ（仮）
			</Heading>

			<iframe
				src="https://my.spline.design/untitled-0c6de592cab87ad982995bcc80ecdcb8/"
				frameBorder="0"
				width="100%"
				height="500px"
				className="spline-script"
			></iframe>

			<PostList posts={posts} />
		</MotionLayout>
	);
}
