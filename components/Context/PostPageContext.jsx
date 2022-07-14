import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const LoadPostPageContext = React.createContext();

export default function PostPageContext({ children }) {
	const [pageContext, setPageContext] = useState({ route: "/", tag: "" });
	const router = useRouter();

	useEffect(() => {
		if (router.route === "/") setPageContext({ route: router.route, tag: "" });
		if (router.route === "/tags/[tag]") setPageContext({ route: "tag", tag: router.query.tag });
	}, [router.asPath]);
	return <LoadPostPageContext.Provider value={{ pageContext }}>{children}</LoadPostPageContext.Provider>;
}
