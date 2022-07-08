import { Circle, Container, Flex, Box, VStack, Button, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { keysOfTag } from "./keys/tag.js";
import NextLink from "next/link";
import { useRouter } from "next/router";

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
										ml={{ base: "20%", xl: "30%" }}
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

export function Sidebar() {
	const [tagsIsOpen, setTagsIsOpen] = useState(true);

	return (
		<Box w={{ base: 0, lg: "200px", xl: "300px" }}>
			<Box
				h="calc(100vh - 50px)"
				bg="gray.200"
				m="0"
				display={{ base: "none", lg: "block" }}
				position="sticky"
				top="50px"
			>
				<VStack mt="50px">
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
}
