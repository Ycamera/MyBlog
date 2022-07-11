import fs from "fs";

export async function readArticle() {
	const data = fs.readFileSync("./getContentFromStrapi/articles.js");

	return JSON.parse(data);
}
