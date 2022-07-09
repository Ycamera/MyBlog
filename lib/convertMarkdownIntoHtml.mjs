import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

export default async function convertMarkdownIntoHtml(markdown) {
	const data = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeSanitize)
		.use(rehypeStringify)
		.process(markdown);

	function replaceHtml(htmlData) {
		let html = htmlData;
		const keys = {
			"<code>": "<code class='prettyprint linenums'>",
			"<p>": "<p class='notCopyable'>",
		};

		Object.keys(keys).forEach((key) => {
			const reg = new RegExp(key, "g");
			html = html.replace(reg, keys[key]);
		});

		const length = html.match(/<h2>/g)?.length;
		const tableData = html.match(/<h2.+<\/h2>/g);

		console.log(html);
		for (let i = 1; i <= length ? length : 0; i++) {
			html = html.replace(
				/<h2>/,
				`${
					i > 1 ? "</div>" : ""
				}<div class='code-frame'><span class='h2-linenum'>${i}.</span><tmp[h2] id=content-${i}>`
			);
		}

		html = html.replace(/tmp\[h2\]/g, "h2");
		html = html.replace(/\t/g, "   ");
		html += "</div>";

		//
		console.log(html.match(/#[^x].*\n/g));
		html.match(/\s{0,}#[^x].*\n/g)?.forEach((element) => {
			const word = element.substring(0, element.length - 1);
			console.log(word);
			html = html.replace(word, `<div class='notCopyable'>　${word}</div>`);
		});
		// console.log(html);
		const table = tableData?.map((data) => data.replace(/<h2>|<\/h2>/g, ""));

		return { html: html, tableOfContentsData: table };
	}

	const html = replaceHtml(data.value);
	return { ...html, htmlData: <div dangerouslySetInnerHTML={{ __html: html.html }}></div> };
}
