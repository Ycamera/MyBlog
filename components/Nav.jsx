import { Flex, HStack, Box } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Nav() {
	const navStyle = { width: "100px", textAlign: "center" };
	return (
		<Flex
			h="50px"
			w="100%"
			justifyContent={"space-between"}
			alignItems="center"
			pos={"sticky"}
			top="0"
			zIndex={10}
			bg="white"
			boxShadow={"0 0px 5px #2a4365"}
		>
			<NextLink href="/">
				<a style={navStyle}>Logo</a>
			</NextLink>

			<HStack>
				<NextLink href="/">
					<a style={navStyle}>TOP</a>
				</NextLink>
			</HStack>
		</Flex>
	);
}
