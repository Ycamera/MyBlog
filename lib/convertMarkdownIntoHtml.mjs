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

		//codesandboxの組み込み
		html.match(/<pre><code>&#x3C;iframe((.|\n|)*)iframe>\n?<\/code><\/pre>/g)?.forEach((element) => {
			html = html.replace(element, element.replace(/<pre><code>|<\/code><\/pre>/g, ""));
			html = html.replace(/&#x3C;/g, "<");
		});

		//prettyprintの組み込み
		//文字列をcopy不可にするクラスを付加
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
		const table = tableData?.map((data) => data.replace(/<h2>|<\/h2>/g, ""));

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

		//コメントにnotCopyableクラスを付加
		html.match(/\s{0,}#[^x].*\n/g)?.forEach((element) => {
			const word = element.substring(0, element.length - 1);
			html = html.replace(word, `<div class='notCopyable'>　${word}</div>`);
		});

		//bold判定（** **）にマーカークラスを付加
		html.match(/\*\*.*\*\*/g)?.forEach((word) => {
			html = html.replace(word, `<span class='code-marker'>${word.substring(2, word.length - 2)}</span>`);
		});

		//strongをマーカークラスに変換
		html.match(/<strong>.*<\/strong>/g)?.forEach((word) => {
			html = html.replace(word, `<span class='code-marker'>${word.substring(8, word.length - 9)}</span>`);
		});

		//h3エレメントを<div></div>で囲む
		html.match(/<h3>.*<\/h3>/g)?.forEach((word) => {
			html = html.replace(word, `<div>${word}</div>`);
		});

		return { html: html, tableOfContentsData: table };
	}

	const html = replaceHtml(data.value);
	console.log(html);
	// console.log(data.value);
	return { ...html, htmlData: <div dangerouslySetInnerHTML={{ __html: html.html }}></div> };
}
