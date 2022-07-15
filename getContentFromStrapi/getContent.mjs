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
	fs.writeFile("./getContentFromStrapi/articles.json", JSON.stringify(articles), (err, file) => {
		if (err) {
			console.log(err);
			console.log("failed to fetch data");
		} else {
			console.log("succesfully recieved and saved the articles");
		}
	});
}

saveArticle();
