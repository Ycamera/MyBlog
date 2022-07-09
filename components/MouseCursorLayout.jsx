import React, { useContext, useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import useMouse from "@react-hook/mouse-position";

import { motion } from "framer-motion";

export const MouseCursorContext = React.createContext();
import { WarningTwoIcon } from "@chakra-ui/icons";

export default function MouseCursorLayout({ children, router }) {
	const [cursorText, setCursorText] = useState("test");
	const [cursorVariant, setCursorVariant] = useState("default");
	const ref = React.useRef(null);

	const mouse = useMouse(ref, {
		enterDelay: 0,
		leaveDelay: 0,
	});

	let mouseX = 0;
	let mouseY = 0;
	if (router.pathname === "/404") {
		if (mouse.x !== null) {
			mouseX = mouse.clientX;
		}

		if (mouse.y !== null) {
			mouseY = mouse.clientY;
		}
	}

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

	const variantsColor = {};
	function mouseLeave() {
		setCursorText("");
		setCursorVariant("default");
	}
	function mouseOverPost() {
		setCursorText("view");
		setCursorVariant("post");
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
			<motion.div className="mouse-cursor" variants={variants} animate={cursorVariant}>
				<Flex className="mouse-cursor-box">
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
