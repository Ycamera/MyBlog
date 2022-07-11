import { Circle, Container, Flex, Box, VStack, Button, useDisclosure } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { keysOfTag } from "./keys/tag.js";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { MouseCursorContext } from "./MouseCursorLayout.jsx";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const TagsInSidebar = ({ tagsIsOpen }) => {
	const router = useRouter();
	const tag = router?.query?.tag;

	return keysOfTag.map((key, i) => {
		const current = tag === key;
		return (
			<AnimatePresence key={key}>
				{tagsIsOpen && (
					<motion.div
						initial={{ x: 10, y: 10, opacity: 0 }}
						animate={{ x: current ? -15 : 0, y: 0, opacity: 1 }}
						exit={{ scaleY: 0, opacity: 0, transition: { delay: 0 } }}
						transition={{ delay: i * 0.05 }}
						whileHover={{ x: -15 }}
						style={{ width: "100%" }}
					>
						<NextLink href={`/tags/${key}`}>
							<a
								className="pointBox" //sitebar.scss
							>
								<Flex alignItems={"center"} fontWeight={current && "bold"}>
									<Circle
										size="5px"
										bg="cyan.600"
										//ml={"30%"}
										ml={{ base: "25%", lg: "20%", xl: "30%" }}
										mr="10px"
										opacity={current ? 1 : 0}
										transitionDuration="0.5s"
										className="point"
									></Circle>
									{key}
								</Flex>
							</a>
						</NextLink>
					</motion.div>
				)}
			</AnimatePresence>
		);
	});
};
const Bar = ({
	width = { base: 0, lg: "200px", xl: "300px" },
	display = { base: "none", lg: "block" },
	mt = "100px",
}) => {
	const [tagsIsOpen, setTagsIsOpen] = useState(true);
	const { mouseLeave } = useContext(MouseCursorContext);

	return (
		<Box
			w={width}
			zIndex="10"
			h="100vh"
			minH="calc(100vh)"
			position="sticky"
			top="0"
			onMouseEnter={mouseLeave}
			cursor="default"
			bg="gray.200"
		>
			<Box m="0" display={display}>
				<VStack mt={mt}>
					<Button
						w="100%"
						bg="transparent"
						borderRadius={"5px 5px 0 0"}
						borderBottom="2px"
						borderColor="cyan.700"
						onClick={() => setTagsIsOpen((prev) => !prev)}
						className="font-stick"
					>
						タグ
					</Button>
					<TagsInSidebar tagsIsOpen={tagsIsOpen} />
				</VStack>
			</Box>
		</Box>
	);
};

const MenuIcon = ({ icon }) => {
	return (
		<motion.div
			key={icon}
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 10 }}
		>
			{icon === "closeIcon" ? (
				<CloseIcon h={"20px"} w={"20px"} zIndex="1" />
			) : (
				<HamburgerIcon h={"30px"} w={"30px"} zIndex="1" />
			)}
		</motion.div>
	);
};

const MobileBar = () => {
	const [menuShow, setMenuShow] = useState(false);

	function menuToggle() {
		setMenuShow((prev) => !prev);
	}
	function menuDisable() {
		setMenuShow(false);
	}

	return (
		<Flex pos="fixed" zIndex="100" display={{ base: "flex", lg: "none" }} mt="50px">
			<AnimatePresence>
				{menuShow && (
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
						<Box
							pos="absolute"
							bg="gray.400"
							opacity={0.5}
							w="100vw"
							h="100vh + 200px"
							onClick={menuDisable}
						></Box>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{menuShow && (
					<motion.div
						initial={{ opacity: 0, x: "-100%" }}
						animate={{ opacity: 1, x: "0" }}
						exit={{ opacity: 0, x: "-100%" }}
						style={{ background: "#E2E8F0" }}
						transition={{ duration: "0.2", type: "spring", stiffness: 500, damping: 50 }}
					>
						<Bar width="250px" display="block" mt="50px" />
					</motion.div>
				)}
			</AnimatePresence>

			<Flex
				onClick={menuToggle}
				alignItems={"center"}
				justifyContent="center"
				w="50px"
				h="50px"
				zIndex="15"
				display={{ base: "flex", lg: "none" }}
				cursor="pointer"
				pos="absolute"
				top="0"
				left="0"
			>
				<AnimatePresence>
					{menuShow && <MenuIcon icon="closeIcon" />}
					{!menuShow && <MenuIcon icon="humberger" />}
				</AnimatePresence>
			</Flex>
		</Flex>
	);
};

export function Sidebar() {
	return (
		<>
			<MobileBar />
			<Bar />
		</>
	);
}
