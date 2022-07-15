import { Flex, Box } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Footer() {
	return (
		<Flex
			zIndex={10}
			h="80px"
			w="100%"
			bg="white"
			justifyContent={"center"}
			boxShadow={"0 0px 5px #2a4365"}
			mt="5px"
			className="font-stick"
			pos="absolute"
			bottom="0"
		>
			<Flex alignItems={"center"}>
				<NextLink href="/">
					<a>
						<Box px="5">Nothing is here yet</Box>
					</a>
				</NextLink>
			</Flex>
		</Flex>
	);
}
