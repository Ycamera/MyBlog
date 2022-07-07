import { Container, Flex, Box } from "@chakra-ui/react";

import Head from "next/head";
import { Sidebar } from "/components/Sidebar";
import Script from "next/script";

//h="minMax(100vh,auto)"
function Layout({ children }) {
	return (
		<>
			<Box w="100%" position={"reative"}>
				<Box
					pos="absolute"
					bg="gray.200"
					left="0"
					w="50%"
					h="calc(100% - 50px)"
					zIndex={-1}
					display={{ base: "none", xl: "block" }}
				></Box>
				<Flex h="100%" w="100%" maxW="1300px" m="auto" justifyContent={"center"}>
					<Sidebar />
					<Container
						w="100%"
						minH="calc(100vh - 50px)"
						maxW="1000px"
						px={{ base: "1rem", md: "50px" }}
						pb="200px"
						mx="auto"
						bg="white"
					>
						{children}
					</Container>
				</Flex>
			</Box>
		</>
	);
}

export default Layout;
