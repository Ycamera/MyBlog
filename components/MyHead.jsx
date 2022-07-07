import Head from "next/head";

export default function MyHead({ url, type, title, description, image, children }) {
	return (
		<Head>
			{url && <meta property="og:url" content={url} />}
			{type && <meta property="og:type" content={type} />}
			{title && <meta property="og:title" content={title} />}
			{description && (
				<>
					<meta property="og:description" content={description} />
					<meta name="description" content={description} />
				</>
			)}

			{image && <meta property="og:image" content={image} />}
			{children}
		</Head>
	);
}
