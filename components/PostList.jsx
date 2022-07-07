import { Flex, Box, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { motion } from "framer-motion";

const Published = ({ publishedAt }) => {
	const dateData = new Date(publishedAt);

	const date = dateData.getFullYear() + "/" + dateData.getMonth() + "/" + dateData.getDate();
	return (
		<Text
			w={{ base: "auto", md: "100px" }}
			letterSpacing={1}
			fontWeight="600"
			color="gray.500"
			textAlign={{ md: "center" }}
			mt="1"
			mb={{ base: 0, md: 1 }}
		>
			{date}
		</Text>
	);
};

export function PostList({ posts }) {
	return posts?.map((post, i) => {
		const { id } = post;
		const { title, description, publishedAt } = post.attributes;

		return (
			<motion.div
				key={`${id}${Math.random()}`}
				initial={{ y: 10, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ delay: i * 0.1, type: "spring", duration: 0.8 }}
				whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
			>
				<NextLink href={`/posts/${id}`}>
					<a>
						<Box minH={"120px"} mt={i === 0 ? 0 : "2rem"} mb="2rem" rounded="5" boxShadow="lg">
							<Flex
								px="5"
								py="3"
								flexDirection={{ base: "column", md: "row" }}
								color="blue.900"
								bg="#deebff"
								borderRadius="5px 5px 0 0"
							>
								<Heading as="h2" w="100%" fontSize="1.4rem" lineHeight="initial" mt="1" noOfLines="2">
									{title}
								</Heading>
								<Published publishedAt={publishedAt} />
							</Flex>

							<Text px="5" py="5" color="gray.600">
								{description}
							</Text>
						</Box>
					</a>
				</NextLink>
			</motion.div>
		);
	});
}
