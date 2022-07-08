import { Container, Box, Flex } from "@chakra-ui/react";

import { Sidebar } from "/components/Sidebar";

//h="minMax(100vh,auto)"
function Layout({ children }) {
	return (
		<>
			<Flex justifyContent="center" w="100%" position={"reative"}>
				<Box
					pos="absolute"
					bg="gray.200"
					left="0"
					w="50%"
					h="calc(100% - 50px)"
					zIndex={-1}
					display={{ base: "none", lg: "block" }}
				></Box>
				<Flex h="100%" w="100%" maxW="1300px" mx="auto">
					<Sidebar />

					<Box flex="1">
						<Container
							minH="calc(100vh - 50px)"
							maxW="1300px"
							pb="200px"
							mx="auto"
							px={{ base: "1rem", md: "50px" }}
							bg="white"
						>
							{children}
						</Container>
					</Box>
				</Flex>
			</Flex>
		</>
	);
}

export default Layout;
