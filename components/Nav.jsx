import { Flex, HStack, Box, Circle, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpIcon } from "@chakra-ui/icons";

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
					<a href="#" style={{ display: "block" }}>
						<Circle size="50px" bg="gray.200" pos="fixed" bottom="2rem" right="2rem">
							<ArrowUpIcon color="gray.600" />
						</Circle>
					</a>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

function Logo({ text, show }) {
	return (
		<AnimatePresence>
			{show && (
				<motion.div
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0 }}
					transition={{ type: "spring" }}
					style={{ position: "absolute", height: "100%", width: "100%" }}
				>
					<NextLink href="/">
						<a style={{ height: "100%" }}>
							<Flex
								px="5"
								h="100%"
								w="100%"
								whiteSpace="nowrap"
								alignItems="center"
								justifyContent="center"
							>
								{text}
							</Flex>
						</a>
					</NextLink>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export default function Nav({ router }) {
	const navStyle = { width: "100px", textAlign: "center" };

	const topPage = router.asPath === "/";

	return (
		<Box zIndex={100} pos={"sticky"} top="0" className="nav" fontWeight="bold">
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
					<Logo text="Logo" show={topPage} />
					<Logo text="Free time" show={!topPage} />
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
