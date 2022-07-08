import { Flex, Box, Heading, Text, Circle } from "@chakra-ui/react";
import NextLink from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const Published = ({ publishedAt }) => {
	const dateData = new Date(publishedAt);

	const date = dateData.getFullYear() + "/" + (dateData.getMonth() + 1) + "/" + dateData.getDate();
	return (
		<Text
			w={{ base: "auto", md: "100px" }}
			letterSpacing={1}
			fontWeight="600"
			color="gray.500"
			textAlign={{ md: "center" }}
			mt="1"
			mb={{ base: 0, md: 1 }}
		>
			{date}
		</Text>
	);
};

const ClickEffect = ({ clicked, effectPosition }) => {
	const top = effectPosition?.top ? effectPosition?.top : 0;
	const left = effectPosition?.left ? effectPosition?.left : 0;

	return (
		<Box
			w="2000px"
			h="2000px"
			pos="absolute"
			top={top}
			left={left}
			transform="translate(-50%,-50%)"
			visibility="hidden"
			className={clicked && "keyframe-clicked-effect-postlist-parent"} //Keyframes.scss
		>
			<Box
				w="100%"
				height="100%"
				borderRadius="100%"
				bg="gray.300"
				className={clicked && "keyframe-clicked-effect-postlist-child"} //Keyframes.scss
			/>
		</Box>
	);
};

const Post = ({ post, i }) => {
	const [clicked, setClicked] = useState();
	const [effectPosition, setEffectPosition] = useState({});

	const { id } = post;
	const { title, description, publishedAt } = post.attributes;

	function onClickEffect(e) {
		const rect = e.target.closest("a").getBoundingClientRect();
		const top = e.clientY - rect.top;
		const left = e.clientX - rect.left;

		setEffectPosition({ top: top, left: left });

		setClicked(false);
		setTimeout(() => setClicked(true), 50);
	}

	return (
		<NextLink href={`/posts/${id}`}>
			<a onClick={onClickEffect}>
				<motion.div
					initial={{ y: 10, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ delay: i * 0.1, type: "spring", duration: 0.8 }}
					whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
				>
					<Box
						minH={"120px"}
						mt={i === 0 ? 0 : "2rem"}
						mb="2rem"
						rounded="5"
						boxShadow="lg"
						position="relative"
						overflow={"hidden"}
					>
						<Flex
							px="5"
							py="3"
							flexDirection={{ base: "column", md: "row" }}
							color="blue.900"
							bg="#deebff"
							borderRadius="5px 5px 0 0"
						>
							<Heading as="h2" w="100%" fontSize="1.4rem" lineHeight="initial" mt="1" noOfLines="2">
								{title}
							</Heading>
							<Published publishedAt={publishedAt} />
						</Flex>

						<Box px="5" py="5">
							<Text color="gray.600" noOfLines={{ base: 3, sm: 2 }}>
								{description}
							</Text>
						</Box>
						<ClickEffect clicked={clicked} effectPosition={effectPosition} setClicked={setClicked} />
					</Box>
				</motion.div>
			</a>
		</NextLink>
	);
};

export function PostList({ posts }) {
	return posts?.map((post, i) => {
		return <Post post={post} i={i} key={`${post.id}${Math.random()}`} />;
	});
}
