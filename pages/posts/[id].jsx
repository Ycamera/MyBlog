import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

import { getArticles } from "/lib/getArticles.mjs";
import { Box, Flex, Heading, Text, Badge, OrderedList, ListItem } from "@chakra-ui/react";
import { motion } from "framer-motion";

import NextLink from "next/link";
import { useState, useEffect } from "react";
import { Tag } from "/components/Tag";
import Script from "next/script";
import Head from "next/head";

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
	const data = await getArticles();
	const post = data.find((d) => String(d.id) === String(params.id));
	return {
		props: {
			post: post,
		},
	};
};

async function convertMarkdownIntoHtml(markdown) {
	const data = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeSanitize)
		.use(rehypeStringify)
		.process(markdown);

	function replaceHtml(htmlData) {
		let html = htmlData;
		const keys = {
			"<code>": "<code class='prettyprint linenums'>",
			"<h2>": "<div class='code-frame'><h2>",
			"<p>/end</p>": "</div>",
		};

		Object.keys(keys).forEach((key) => {
			const reg = new RegExp(key, "g");
			html = html.replace(reg, keys[key]);
		});

		const length = html.match(/<h2>/g)?.length;
		const tableData = html.match(/<h2.+<\/h2>/g);

		for (let i = 1; i <= length ? length : 0; i++) {
			html = html.replace(/<h2>/, `<span class='h2-linenum'>${i}.</span><tmp[h2] id=content-${i}>`);
		}

		html = html.replace(/tmp\[h2\]/g, "h2");
		const table = tableData?.map((data) => data.replace(/<h2>|<\/h2>/g, ""));

		return { html: html, tableOfContentsData: table };
	}

	const html = replaceHtml(data.value);
	return { ...html, htmlData: <div dangerouslySetInnerHTML={{ __html: html.html }}></div> };
}

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
					<Box borderBottom="solid 5px" borderBottomStyle="dotted" borderColor="gray.300" p="3" fontSize="md">
						<NextLink href={`#content-${i + 1}`}>
							<a
								style={{ display: "inline-block", width: "calc(100% - 50px)" }}
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

export default function Post({ post }) {
	const { title, content, tag1, tag2, tag3, tag4, tag5 } = post.attributes;

	const [html, setHtml] = useState();
	const [tableOfContents, setTableOfContents] = useState([]);

	useEffect(() => {
		set();
		async function set() {
			const { htmlData, tableOfContentsData } = await convertMarkdownIntoHtml(content);

			setHtml(htmlData);
			setTableOfContents(tableOfContentsData);
		}
	}, []);

	return (
		<>
			<Head>
				<script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js" />
			</Head>
			<Box mt="50px">
				<Box m="5" mb="3">
					<Heading as="h1" mb="2rem" color="gray.700" fontSize={"2.1rem"}>
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
			</Box>
		</>
	);
}
