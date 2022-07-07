export async function getArticles() {
	const response = await fetch("http://localhost:1337/api/articles");
	const json = await response.json();
	const data = json.data;
	return sortArticles(json.data);
}

export async function getArticlesByTag(tag, fetchData = true, articles = []) {
	let data;

	if (fetchData) {
		const response = await fetch(
			`http://localhost:1337/api/articles?tag1=${tag}&tag2=${tag}&tag3=${tag}&tag4=${tag}&tag5=${tag}`
		);
		const json = await response.json();
		data = json.data;
	} else {
		data = articles;
	}

	const passData = data.filter((d) => {
		const { tag1, tag2, tag3, tag4, tag5 } = d.attributes;
		return [tag1, tag2, tag3, tag4, tag5].some((tagName) => tagName === tag);
	});

	return sortArticles(passData);
}

export async function getArticleById(id, fetchData = true, articles = []) {
	if (fetchData) {
		const response = await fetch(`http://localhost:1337/api/articles/${id}`);
		const json = await response.json();
		return json.data;
	} else {
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
