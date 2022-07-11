import { Flex, Box, Heading, Text, Circle, HStack } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

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
					transition={{ delay: i * 0.05 + 0.1, type: "spring", duration: 0.5 }}
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

const PostPage = ({ posts, pageNum, setPageNum, numberOfPosts }) => {
	const numberOfPage = Math.ceil(posts.length / numberOfPosts);

	const styleBox = {
		w: "30px",
		h: "30px",
		bg: "gray.100",
		justifyContent: "center",
		alignItems: "center",
		cursor: "pointer",
		borderRadius: "5px",
	};

	function pageNumValid(num, calc) {
		if (num + calc <= 0) return;
		if (num + calc > numberOfPage) return;
		return num + calc;
	}

	const PreviousPage = () => {
		const previous = pageNum - 1;
		const valid = previous > 0;

		function previousPage() {
			if (valid) setPageNum(previous);
		}

		return (
			valid && (
				<Flex {...styleBox} onClick={previousPage}>
					<ChevronLeftIcon />
				</Flex>
			)
		);
	};
	const NextPage = () => {
		const next = pageNum + 1;
		const valid = next <= numberOfPage;

		function nextPage() {
			if (valid) setPageNum(next);
		}

		return (
			valid && (
				<Flex {...styleBox} onClick={nextPage}>
					<ChevronRightIcon />
				</Flex>
			)
		);
	};

	const Num = ({ text, style }) => {
		return text ? (
			<Flex {...styleBox} onClick={() => setPageNum(text)} {...style}>
				{text}
			</Flex>
		) : (
			<Flex w="30px" h="30px" borderRadius="5px" />
		);
	};

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
			<HStack justifyContent={"center"} mt="50px" gap="5px">
				<PreviousPage />
				<Num text={pageNumValid(pageNum, -2)} />
				<Num text={pageNumValid(pageNum, -1)} />
				<Num text={pageNum} style={{ bg: "#fff", boxShadow: "0 0px 3px #b1b8c1" }} />
				<Num text={pageNumValid(pageNum, 1)} />
				<Num text={pageNumValid(pageNum, 2)} />
				<NextPage />
			</HStack>
		</motion.div>
	);
};

const NoPosts = () => {
	return (
		<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
			<Flex
				className="font-stick"
				justifyContent={"center"}
				alignitems="center"
				fontSize="1.2rem"
				color="blue.700"
			>
				まだ投稿がないようです。
			</Flex>
		</motion.div>
	);
};

export function PostList({ posts, page = 1 }) {
	const [pageNum, setPageNum] = useState(page);
	const numberOfPosts = 5;
	const pageStart = pageNum * numberOfPosts - numberOfPosts;
	const postEmpty = !posts?.length;
	console.log(posts);

	const Posts = ({ posts }) => {
		return posts?.slice(pageStart, pageNum * numberOfPosts).map((post, i) => {
			return <Post post={post} i={i} key={`${post.id}${Math.random()}`} />;
		});
	};
	return (
		<>
			<Posts posts={posts} />
			{postEmpty && <NoPosts />}
			{!postEmpty && (
				<PostPage posts={posts} pageNum={pageNum} setPageNum={setPageNum} numberOfPosts={numberOfPosts} />
			)}
		</>
	);
}
