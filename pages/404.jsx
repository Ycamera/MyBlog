import { Text, Box, Flex, Heading } from "@chakra-ui/react";
import MyHead from "../components/MyHead";

export default function PageNotFound() {
	return (
		<>
			<MyHead title="Page not found" description="ページが見つかりませんでした。" />
			<Box
				my="50px"
				alignItems="center"
				className="font-stick"
				top="50%"
				transform="translateY(-50%)"
				position="relative"
			>
				<Flex alignItems={"center"} justifyContent="center">
					<Box mr="3" fontSize="3.5rem" color="gray.600">
						{"<"}
					</Box>
					<Heading
						as="h1"
						color="gray.700"
						textAlign={"center"}
						fontSize="5rem"
						transform="translateY(-0.8rem)"
					>
						404
					</Heading>
					<Box ml="3" h="auto" fontSize="3.5rem" color="gray.600">
						{"/>"}
					</Box>
				</Flex>
				<Text color="gray.600" textAlign="center" fontSize="2rem" mt="5" fontWeight="bold">
					Page Not Found
				</Text>
			</Box>
		</>
	);
}
