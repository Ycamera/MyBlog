export const getArticlesByTagName = (posts, tag) => {
	if (!posts?.length || !tag) return [];
	const articles = posts?.filter((d) => {
		const { tag1, tag2, tag3, tag4, tag5 } = d.attributes;
		return [tag1, tag2, tag3, tag4, tag5].some((tagName) => tagName === tag);
	});

	return articles;
};
