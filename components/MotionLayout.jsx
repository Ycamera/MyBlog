import { motion } from "framer-motion";

export default function MotionLayout({ children }) {
	const variants = {
		initial: {
			opacity: 0,
			y: 10,
		},
		animate: {
			opacity: 1,
			y: 0,
		},
		exit: {
			opacity: 0,
			y: 10,
			transition: { duration: 0.2 },
		},
	};

	return (
		<motion.div variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
			{children}
		</motion.div>
	);
}
