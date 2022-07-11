import fetch from "node-fetch";
import fs, { read } from "fs";

async function getArticles() {
	const response = await fetch("http://localhost:1337/api/articles");
	const json = await response.json();
	const data = json.data;

	return data;
}

async function saveArticle() {
	const articles = await getArticles();
	fs.writeFile("./getContentFromStrapi/articles.js", JSON.stringify(articles), (err, file) => {
		if (err) {
		} else {
			console.log("succesfully recieved contents");
		}
	});
}

saveArticle();
