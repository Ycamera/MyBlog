import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import useMouse from "@react-hook/mouse-position";
import { motion } from "framer-motion";
import { WarningTwoIcon } from "@chakra-ui/icons";

export const MouseCursorContext = React.createContext();
export default function MouseCursorLayout({ children, router }) {
	const [cursorText, setCursorText] = useState("test");
	const [cursorVariant, setCursorVariant] = useState("default");
	const ref = React.useRef(null);

	const mouse = useMouse(ref, {
		enterDelay: 0,
		leaveDelay: 0,
	});

	const [mouseX, setMouseX] = useState(0);
	const [mouseY, setMouseY] = useState(0);

	useEffect(() => {
		if (router.pathname === "/404") {
			if (mouse.x !== null) {
				setMouseX(mouse.clientX);
			}
			if (mouse.y !== null) {
				setMouseY(mouse.clientY);
			}
		}
	}, [mouse.clientX, mouse.clientY]);

	const variants = {
		default: {
			opacity: 0,
			height: 0,
			width: 0,
			x: mouseX,
			y: mouseY,
			fontSize: "1rem",
		},

		post: {
			opacity: 1,
			height: 60,
			width: 80,
			x: mouseX,
			y: mouseY,
			fontSize: "1rem",
		},

		spring: { damping: 5000 },
	};

	function mouseLeave() {
		setCursorText("");
		setCursorVariant("default");
	}

	function mouseOverPageNotFound() {
		setCursorText("Error");
		setCursorVariant("post");
	}

	useEffect(() => {
		mouseLeave();
	}, [router.asPath]);

	return (
		<div ref={ref} style={{ height: "100%", width: "100%" }}>
			<motion.div className="mouse-cursor" variants={variants} initial={"default"} animate={cursorVariant}>
				<Flex className="mouse-cursor-box" transform="translate(-50%,50%)">
					<span className="mouse-cursor-text font-stick">
						{cursorText}
						<WarningTwoIcon />
					</span>
				</Flex>
			</motion.div>

			<MouseCursorContext.Provider value={{ mouseLeave, mouseOverPageNotFound }}>
				{children}
			</MouseCursorContext.Provider>
		</div>
	);
}
