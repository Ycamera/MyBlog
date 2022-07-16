import { Flex, HStack, Box, Circle, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { MouseCursorContext } from "./MouseCursorLayout";
import { scrollToTopSmooth } from "../lib/scrollToTop";

const ToTopButton = () => {
	const [toTopIsShown, setToTopIsShown] = useState();

	useEffect(() => {
		function addScrollToTop() {
			window.pageYOffset > 100 ? setToTopIsShown(true) : setToTopIsShown(false);
		}
		window.addEventListener("scroll", addScrollToTop);

		return () => window.removeEventListener("scroll", addScrollToTop);
	}, []);

	return (
		<AnimatePresence>
			{toTopIsShown && (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
					<Circle
						size="50px"
						bg="gray.200"
						pos="fixed"
						bottom="2rem"
						right="2rem"
						onClick={scrollToTopSmooth}
						cursor="pointer"
					>
						<ArrowUpIcon color="gray.600" />
					</Circle>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

function Logo({ text, show = true }) {
	return (
		show && (
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0 }}
				style={{ position: "absolute", height: "100%", width: "100%" }}
			>
				<NextLink href="/">
					<a style={{ height: "100%" }}>
						<Flex px="5" h="100%" w="75px" whiteSpace="nowrap" alignItems="center" justifyContent="center">
							{text}
						</Flex>
					</a>
				</NextLink>
			</motion.div>
		)
	);
}

export default function Nav({ router }) {
	const { mouseLeave } = useContext(MouseCursorContext);
	const navStyle = { width: "75px", textAlign: "center" };

	return (
		<Box zIndex={100} pos={"fixed"} top="0" w="100%" className="nav" fontWeight="bold" onMouseEnter={mouseLeave}>
			<Flex
				h="50px"
				w="100%"
				justifyContent={"space-between"}
				alignItems="center"
				zIndex={10}
				bg="white"
				boxShadow={"0 0px 5px #2a4365"}
			>
				<Box pos="relative" w="120px" h="100%">
					<Logo text="Logo" />
					{/* <Logo text="Logo" show={topPage} />
					<Logo text="Free time" show={!topPage} /> */}
				</Box>
				<HStack>
					<NextLink href="/">
						<a style={navStyle}>TOP</a>
					</NextLink>
				</HStack>
			</Flex>
			<ToTopButton />
		</Box>
	);
}
