import { useState, useContext, useEffect } from "react";

import { Box, Text, Flex, Heading, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { LoadPostPageContext } from "./Context/PostPageContext";
import { getArticlesByTagName } from "../lib/getArticlesClientSide.mjs";

const NextPreviousButton = ({ id, title, icon }) => {
	const left = icon === "left";

	function IconButton({ direc }) {
		const left = direc === "left";
		return (
			<Flex
				w="3rem"
				bg="gray.100"
				justifyContent={"center"}
				alignItems="center"
				ml={left ? 0 : "0.5rem"}
				mr={left ? "0.5rem" : 0}
				rounded="5"
				py="2"
			>
				{direc === "left" ? (
					<ChevronLeftIcon color="gray.500" w="5" h="5" borderRadius="50%" />
				) : (
					<ChevronRightIcon color="gray.500" w="5" h="5" borderRadius="50%" />
				)}
			</Flex>
		);
	}

	return id && title ? (
		<Box w="40%">
			<motion.div whileHover={{ x: left ? -10 : 10 }}>
				<NextLink href={`/posts/${id}`}>
					<a>
						<Flex alignItems={"center"}>
							{left && <IconButton direc={"left"} />}

							<Text
								fontSize={{ base: "0.8rem", md: "1rem" }}
								borderBottom="solid 3px"
								borderColor="gray.200"
								color="gray.600"
								fontWeight="bold"
								noOfLines={1}
								w="100%"
								textAlign={icon === "left" ? "left" : "right"}
							>
								{title}
							</Text>

							{!left && <IconButton direc={"right"} />}
						</Flex>
					</a>
				</NextLink>
			</motion.div>
		</Box>
	) : (
		<Box w="40%" />
	);
};

export default function NextPreviousContent({ id, posts }) {
	const [next, setNext] = useState({});
	const [previous, setPrevious] = useState({});

	const { pageContext } = useContext(LoadPostPageContext);

	useEffect(() => {
		let postData = posts;

		if (pageContext?.route === "tag") {
			postData = getArticlesByTagName(posts, pageContext?.tag);
		}

		set();
		function set() {
			const index = postData?.findIndex((post) => String(post.id) === id);
			const previousId = index - 1;
			const nextId = index + 1;

			if (previousId >= 0) {
				const { title } = postData[previousId]?.attributes;
				setPrevious({ id: convertIndexToId(previousId), title: title });
			} else {
				setPrevious({});
			}

			if (nextId < postData?.length) {
				const { title } = postData[nextId]?.attributes;
				setNext({ id: convertIndexToId(nextId), title: title });
			} else {
				setNext({});
			}
		}
		function convertIndexToId(index) {
			return postData[index]?.id;
		}
	}, [id]);

	return (
		<Flex justifyContent={"space-between"} mt="5rem">
			<NextPreviousButton {...previous} icon="left" />
			<NextPreviousButton {...next} icon="right" />
		</Flex>
	);
}
