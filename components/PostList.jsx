import { Flex, Box, Heading, Text, Circle, HStack, Button, Image } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon, TimeIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useContext } from "react";
import { ListStyleComponent } from "/pages/_app.js";
import Head from "next/head";
import { useRouter } from "next/router";
import { scrollToTop } from "/lib/scrollToTop";
import ImageLogo from "./ImageLogo";

const Published = ({ publishedAt, color }) => {
	const dateData = new Date(publishedAt);

	const date = dateData.getFullYear() + "/" + (dateData.getMonth() + 1) + "/" + dateData.getDate();
	return (
		<Text
			w={{ base: "auto", md: "100px" }}
			letterSpacing={1}
			fontWeight="600"
			color={color}
			textAlign={{ base: "right", md: "center" }}
			mt={{ base: 0, md: 1 }}
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
			blur="5px"
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
				bg="#ffffff"
				className={clicked && "keyframe-clicked-effect-postlist-child"} //Keyframes.scss
			/>
		</Box>
	);
};

const Post = ({ post, i, listStyle }) => {
	const [clicked, setClicked] = useState();
	const [effectPosition, setEffectPosition] = useState({});

	const { id } = post;
	const { title, description, publishedAt } = post.attributes;

	const tag = post?.attributes?.tag1;

	function onClickEffect(e) {
		const rect = e.target.closest("a").getBoundingClientRect();
		const top = e.clientY - rect.top;
		const left = e.clientX - rect.left;

		setEffectPosition({ top: top, left: left });

		setClicked(false);
		setTimeout(() => setClicked(true), 50);
	}

	const variants = {
		initialList: { y: 10, opacity: 0, width: "100%" },
		initialGrid: { y: 10, opacity: 0, width: "50%" },
		animateList: { y: 0, opacity: 1, width: "100%" },
		animateGrid: { y: 0, opacity: 1, width: "50%" },
	};

	return (
		<NextLink href={`/posts/${id}`}>
			<motion.div
				variants={variants}
				initial={listStyle ? "initialList" : "initialGrid"}
				animate={listStyle ? "animateList" : "animateGrid"}
				exit={{ opacity: 0 }}
				transition={{ delay: i * 0.05 + 0.1, type: "spring", duration: 0.5 }}
				whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
				style={{ marginBottom: "2rem", padding: "0 1rem" }}
			>
				<a onClick={onClickEffect}>
					<Box
						minH={"120px"}
						h={listStyle ? "auto" : "230px"}
						rounded="5"
						boxShadow="lg"
						position="relative"
						overflow={"hidden"}
						cursor="pointer"
					>
						<Flex
							px="5"
							py="3"
							flexDirection={{ base: "column", md: "row" }}
							color="blue.900"
							bg="#deebff"
							borderRadius="5px 5px 0 0"
						>
							<Flex>
								<ImageLogo tag={tag} />
								<Heading
									as="h2"
									ml={{ base: 3, md: 4 }}
									w="100%"
									fontSize="1.4rem"
									lineHeight="initial"
									mt="1"
									noOfLines="2"
								>
									{title}
								</Heading>
							</Flex>
							{listStyle && <Published publishedAt={publishedAt} color="gray.500" />}
						</Flex>

						<Box px="5" py={{ base: 3, md: 5 }}>
							<Text color="gray.600" noOfLines={{ base: 3, sm: 2 }}>
								{description}
							</Text>
						</Box>
						{!listStyle && (
							<Flex justifyContent="end" alignItems="center" mr={"1rem"}>
								<Published publishedAt={publishedAt} color="gray.400" />
							</Flex>
						)}
						<ClickEffect clicked={clicked} effectPosition={effectPosition} setClicked={setClicked} />
					</Box>
				</a>
			</motion.div>
		</NextLink>
	);
};

const PostPage = ({ posts, pageNum, setPageNum, numberOfPosts }) => {
	const numberOfPage = Math.ceil(posts.length / numberOfPosts);
	const router = useRouter();

	const styleBox = {
		w: "45px",
		h: "30px",
		bg: "gray.50",
		color: "gray.600",
		justifyContent: "center",
		alignItems: "center",
		className: "notCopyable",
		margin: "0 1px",
		transition: "0.3s",
	};
	const styleBoxEmpty = {
		w: "45px",
		h: "30px",
		margin: "0 1px",
	};
	const hover = { boxShadow: "0 0  3px #A0AEC0" };

	function pageNumValid(num, calc) {
		if (num + calc <= 0) return;
		if (num + calc > numberOfPage) return;
		return num + calc;
	}

	function getPositionOfPostsTop() {
		try {
			const el = document.getElementById("posts-top");
			const rect = el.getBoundingClientRect();
			const top = window.scrollY + rect.top - 120;

			return top;
		} catch (err) {
			return 0;
		}
	}

	const NextPreviousPage = ({ direc = "previous" }) => {
		const direction = direc === "previous";

		const previous = pageNum - 1;
		const previousValid = previous > 0;

		const next = pageNum + 1;
		const nextValid = next <= numberOfPage;

		function previousPage() {
			if (previousValid) {
				setPageNum(previous);
				scrollToTop(getPositionOfPostsTop());
			}
		}

		function nextPage() {
			if (nextValid) {
				setPageNum(next);
				scrollToTop(getPositionOfPostsTop());
			}
		}

		return direction ? (
			<Flex
				{...styleBox}
				onClick={previousPage}
				_hover={previousValid && hover}
				cursor={previousValid && "pointer"}
			>
				<ChevronLeftIcon />
			</Flex>
		) : (
			<Flex {...styleBox} onClick={nextPage} _hover={nextValid && hover} cursor={nextValid && "pointer"}>
				<ChevronRightIcon />
			</Flex>
		);
	};

	const Num = ({ text, style, cursor = "pointer" }) => {
		return text ? (
			<Flex
				{...styleBox}
				_hover={hover}
				onClick={() => {
					setPageNum(text);
					scrollToTop(getPositionOfPostsTop());
				}}
				{...style}
				cursor={cursor}
			>
				{text}
			</Flex>
		) : (
			<Flex {...styleBoxEmpty} />
		);
	};

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={router.asPath}>
			<Flex justifyContent={"center"} mt="50px">
				<Flex borderRadius="5px" overflow="hidden" py="5px">
					<NextPreviousPage direc="previous" />
					<Num text={pageNumValid(pageNum, -2)} />
					<Num text={pageNumValid(pageNum, -1)} />
					<Num
						text={pageNum}
						style={{ bg: "gray.100", color: "gray.900", boxShadow: "0 0px 3px #b1b8c1" }}
						cursor="default"
					/>
					<Num text={pageNumValid(pageNum, 1)} />
					<Num text={pageNumValid(pageNum, 2)} />
					<NextPreviousPage direc="next" />
				</Flex>
			</Flex>
		</motion.div>
	);
};

const NoPosts = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0 }}
			transition={{ delay: 0.2 }}
		>
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

const ChangeListStyle = ({ setListStyle, listStyle }) => {
	const style = { w: "40px", h: "40px", justifyContent: "center", alignItems: "center" };

	const StyleChangeButton = ({ children, onClick, listColor }) => {
		return (
			<Flex
				{...style}
				{...listColor}
				cursor="pointer"
				onClick={onClick}
				_hover={{ bg: "gray.200" }}
				transition="0.3s"
			>
				{children}
			</Flex>
		);
	};

	const buttonColorNormal = { bg: "gray.50", color: "gray.400" };
	const buttonColorActive = { bg: "gray.200", color: "gray.600" };

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
			<Flex justifyContent="end" mb="1rem">
				<Flex borderRadius="5px" overflow={"hidden"} mr="1rem">
					<StyleChangeButton
						onClick={() => setListStyle(true)}
						listColor={!listStyle ? buttonColorNormal : buttonColorActive}
					>
						<span className="material-symbols-outlined">format_list_bulleted</span>
					</StyleChangeButton>
					<StyleChangeButton
						onClick={() => setListStyle(false)}
						listColor={listStyle ? buttonColorNormal : buttonColorActive}
					>
						<span className="material-symbols-outlined">grid_view</span>
					</StyleChangeButton>
				</Flex>
			</Flex>
		</motion.div>
	);
};

export function PostList({ posts, page = 1 }) {
	const [pageNum, setPageNum] = useState(page);
	const numberOfPosts = 6; //１ページあたりの投稿表示数
	const pageStart = pageNum * numberOfPosts - numberOfPosts;
	const postEmpty = !posts?.length;

	const router = useRouter();

	const { listStyle, setListStyle } = useContext(ListStyleComponent);

	const Posts = ({ posts }) => {
		return (
			<Flex flexWrap={"wrap"} id="posts-top">
				{posts?.slice(pageStart, pageNum * numberOfPosts).map((post, i) => {
					return <Post post={post} i={i} listStyle={listStyle} key={post.id} />;
				})}
			</Flex>
		);
	};

	return (
		<>
			{!postEmpty && <ChangeListStyle setListStyle={setListStyle} listStyle={listStyle} />}

			<Posts posts={posts} />
			{postEmpty && <NoPosts />}
			{!postEmpty && (
				<PostPage posts={posts} pageNum={pageNum} setPageNum={setPageNum} numberOfPosts={numberOfPosts} />
			)}
		</>
	);
}
