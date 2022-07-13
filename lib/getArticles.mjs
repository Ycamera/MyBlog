import { readArticle } from "../getContentFromStrapi/readContent.mjs";

const fetchData = false;

export async function getArticles() {
	let data;
	if (fetchData) {
		const response = await fetch("http://localhost:1337/api/articles");
		const json = await response.json();
		data = json.data;
	} else {
		data = await readArticle();
	}
	return sortArticles(data);
}

export async function getArticlesByTag(tag) {
	if (!tag) return [];

	let data;

	if (fetchData) {
		const response = await fetch(
			`http://localhost:1337/api/articles?tag1=${tag}&tag2=${tag}&tag3=${tag}&tag4=${tag}&tag5=${tag}`
		);
		const json = await response.json();
		data = json.data;
	} else {
		data = await readArticle();
	}

	const passData = data.filter((d) => {
		const { tag1, tag2, tag3, tag4, tag5 } = d.attributes;
		return [tag1, tag2, tag3, tag4, tag5].some((tagName) => tagName === tag);
	});

	return sortArticles(passData);
}

export async function getArticleById(id) {
	if (fetchData) {
		const response = await fetch(`http://localhost:1337/api/articles/${id}`);
		const json = await response.json();
		return json.data;
	} else {
		const articles = await readArticle();
		const article = articles.find((article) => String(article.id) === String(id));
		return article ? article : {};
	}
}

function sortArticles(articleArray) {
	const articles = articleArray.sort((a, b) => {
		const dateA = new Date(a.attributes.publishedAt).getTime();
		const dateB = new Date(b.attributes.publishedAt).getTime();
		if (dateA < dateB) {
			return 1;
		} else if (dateB < dateA) {
			return -1;
		}
		return 0;
	});
	return articles;
}
