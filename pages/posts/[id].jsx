import { getArticles, getArticleById } from "/lib/getArticles.mjs";
import { Box, Flex, Heading, Text, Badge, OrderedList, ListItem } from "@chakra-ui/react";
import { motion } from "framer-motion";

import NextLink from "next/link";
import { useState, useEffect } from "react";
import { Tag } from "/components/Tag";
import Script from "next/script";
import Head from "next/head";
import NextPreviousContent from "../../components/NextPreviousContent";
import MyHead from "/components/MyHead";
import convertMarkdownIntoHtml from "/lib/convertMarkdownIntoHtml";
import MotionLayout from "../../components/MotionLayout";

export const getStaticPaths = async () => {
	const data = await getArticles();

	const paths = data.map((d) => {
		return { params: { id: String(d.id) } };
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params }) => {
	const post = await getArticleById(params.id);
	const posts = await getArticles();

	return {
		props: {
			post: post,
			posts: posts,
		},
	};
};

//目次
const TableOfContents = ({ tableOfContents }) => {
	function highlightHeading(id) {
		try {
			const el = document.getElementById(id);
			el.classList.add("highlight");
			setTimeout(() => el.classList.remove("highlight"), 3000);
		} catch (err) {}
	}

	return (
		<Box bg="gray.50" p="2rem" rounded="5" mt="10">
			<Box ml="2" fontWeight="bold" fontSize={"lg"} color="gray.800">
				目次
			</Box>
			{tableOfContents?.map((content, i) => {
				return (
					<Box
						key={content}
						borderBottom="solid 5px"
						borderBottomStyle="dotted"
						borderColor="gray.300"
						p="3"
						fontSize="md"
					>
						<NextLink href={`#content-${i + 1}`}>
							<a
								style={{ display: "inline-block", width: "100%" }}
								onClick={() => highlightHeading(`content-${i + 1}`)}
							>
								<Box display="inline-block" mr="2" fontWeight={"bold"} color="blue.900">
									{i + 1}.
								</Box>
								{content}
							</a>
						</NextLink>
					</Box>
				);
			})}
		</Box>
	);
};

export default function Post({ posts, post, router }) {
	const id = router?.query?.id;

	const { title, content, tag1, tag2, tag3, tag4, tag5, description } = post?.attributes ? post?.attributes : {};

	const [html, setHtml] = useState();
	const [tableOfContents, setTableOfContents] = useState([]);

	useEffect(() => {
		set();
		async function set() {
			const { htmlData, tableOfContentsData } = await convertMarkdownIntoHtml(content);

			setHtml(htmlData);
			setTableOfContents(tableOfContentsData);
		}
	}, [content]);

	return (
		<MotionLayout>
			<MyHead type="article" title={title} description={description} />

			{html && tableOfContents && (
				<Box mt="50px">
					<Box mb="3">
						<Heading
							as="h1"
							mb="2rem"
							color="gray.700"
							fontSize={{ base: "1.6rem", sm: "1.8rem", md: "2.1rem" }}
						>
							{title}
						</Heading>
						<Tag tags={[tag1, tag2, tag3, tag4, tag5]} />
					</Box>
					{tableOfContents && <TableOfContents tableOfContents={tableOfContents} />}
					<Box mt="50" className="code">
						{html}

						<Flex mt="10" justifyContent={"end"}>
							<Box fontWeight="bold" bg="cyan.50" color="blue.900" rounded="5" p="3">
								{"</以上>"}
							</Box>
						</Flex>
					</Box>
					<NextPreviousContent id={id} posts={posts} />
				</Box>
			)}
		</MotionLayout>
	);
}
