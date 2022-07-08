import { Text, Box, Flex, Heading } from "@chakra-ui/react";
import MyHead from "../components/MyHead";
import { motion } from "framer-motion";

export default function PageNotFound() {
	function random(num = 1) {
		return Math.random() * num;
	}

	function randomAnimate() {
		function minusPlus() {
			return Math.random() >= 0.5 ? -1 : 1;
		}
		return {
			y: Math.random() * -5 + "rem",
			x: `${Math.random() * 5 * minusPlus()}rem`,
			rotate: Math.random() * 360 * minusPlus() + "deg",
			opacity: 0,
		};
	}
	const variants = {
		animate: { y: 0, x: 0, rotate: "0deg", opacity: 1 },
	};

	const Num = ({ number }) => {
		return (
			<motion.div variants={variants} initial={randomAnimate()} animate="animate" transition={{ type: "spring" }}>
				<Text color="gray.700" fontSize="5rem">
					{number}
				</Text>
			</motion.div>
		);
	};

	const Word = ({ text, rotate = 0, y = 0, x = 0, delay = 0 }) => {
		return (
			<motion.div
				initial={{ y: random(20) + 10, opacity: 0, scale: 0 }}
				animate={{ y: 0, opacity: 1, scale: 1 }}
				transition={{ type: "spring", bounce: 0.7, duration: 2, delay: delay }}
			>
				<Text
					transform={`rotate(${rotate}deg) translate(${x},${y})`}
					color="pink.400"
					textAlign="center"
					fontSize="2rem"
					mt="3rem"
					mx="4"
					fontWeight="bold"
				>
					{text}
				</Text>
			</motion.div>
		);
	};

	return (
		<>
			<MyHead title="Page not found" description="ページが見つかりませんでした。" />

			<Box
				my="50px"
				alignItems="center"
				className="font-stick"
				m="auto"
				top="50%"
				transform="translateY(-50%)"
				position="relative"
			>
				<Heading as="h1" visibility="hidden">
					404
				</Heading>
				<motion.div initial={{}}>
					<Flex alignItems={"center"} justifyContent="center">
						<Box mr="3" fontSize="3.5rem" color="gray.600">
							{"<"}
						</Box>
						<Flex transform="translateY(-1.5rem)">
							<Num number={4} />
							<Num number={0} />
							<Num number={4} />
						</Flex>
						<Box ml="3" h="auto" fontSize="3.5rem" color="gray.600">
							{"/>"}
						</Box>
					</Flex>
					<Flex alignItems={"center"} justifyContent="center">
						<Word text={"Page"} />
						<Word text={"Not"} y="1rem" delay={0.1} />
						<Word text={"Found"} delay={0.2} />
					</Flex>
				</motion.div>
			</Box>
		</>
	);
}
