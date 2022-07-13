import { motion } from "framer-motion";
import { Box, Badge } from "@chakra-ui/react";
import NextLink from "next/link";

export const Tag = ({ tags }) => {
	return (
		<Box>
			{tags
				.filter((tag) => tag)
				.map((tag) => {
					return (
						<motion.span whileHover={{ scale: 1.1 }} style={{ display: "inline-block" }} key={tag}>
							<Badge mr="4" bg="blue.50" color="gray.600" key={tag} cursor="pointer">
								<NextLink href={`/tags/${tag}`}>
									<a style={{ letterSpacing: 0 }}># {tag}</a>
								</NextLink>
							</Badge>
						</motion.span>
					);
				})}
		</Box>
	);
};
