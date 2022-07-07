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
						<motion.span whileHover={{ scale: 1.05 }} style={{ display: "inline-block" }} key={tag}>
							<NextLink href={`/tags/${tag}`}>
								<Badge mr="4" bg="blue.50" color="gray.600" key={tag} cursor="pointer">
									<a style={{ letterSpacing: 0 }}># {tag}</a>
								</Badge>
							</NextLink>
						</motion.span>
					);
				})}
		</Box>
	);
};
