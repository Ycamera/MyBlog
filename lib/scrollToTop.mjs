export const scrollToTop = (num = 0) => {
	window.scrollTo({ top: num, behavior: "instant" });
};

export const scrollToTopSmooth = (num = 0) => {
	window.scrollTo({ top: num, behavior: "smooth" });
};
