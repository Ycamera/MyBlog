import { Container, Box, Flex } from "@chakra-ui/react";

import { Sidebar } from "/components/Sidebar";
import React, { useContext, useMemo, useState } from "react";
import { MouseCursorContext } from "./MouseCursorLayout";

function ContentLayout({ children, router }) {
	const { mouseLeave, mouseOverPageNotFound } = useContext(MouseCursorContext);

	return (
		<>
			<Flex
				pos="relative"
				justifyContent="center"
				w="100%"
				cursor={router?.pathname === "/404" ? "none" : "default"}
				onMouseLeave={mouseLeave}
				onMouseEnter={() => {
					if (router.pathname === "/404") mouseOverPageNotFound();
				}}
			>
				<Box
					zIndex="1"
					pos="fixed"
					bg={{ base: "transparent", xl: "gray.200" }}
					left="0"
					w="50vw"
					minH="100vh"
					h="100%"
					display={{ base: "none", lg: "block" }}
					cursor="default"
					onMouseEnter={mouseLeave}
				></Box>
				<Flex h="100%" w="100%" maxW="1300px" mx="auto" zIndex="2">
					<Sidebar />

					<Container
						flex="1"
						minH="calc(100vh - 50px)"
						maxW="1000px"
						pt={{ base: "60px", lg: "50px" }}
						pb="200px"
						mx="auto"
						px={{ base: "1.5rem", sm: "2rem", md: "50px" }}
						bg="white"
						overflow={"hidden"}
					>
						{children}
					</Container>
				</Flex>
			</Flex>
		</>
	);
}

export default ContentLayout;
