import fs from "fs";

export async function readArticle() {
	const data = fs.readFileSync("./getContentFromStrapi/articles.json");

	return JSON.parse(data);
}
