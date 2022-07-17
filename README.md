
<img src='https://user-images.githubusercontent.com/96303806/179424172-f1270775-5f0f-4a4a-b782-9759e981a0e5.png' />

<h1>技術メモブログ</h1>
https://myblog-lac-ten.vercel.app/

<h2>主要技術</h2>
<h4>フロント</h4>

- <a href='https://nextjs.org/'>Next.js</a>
- <a href='https://www.framer.com/motion/'>Framer Motion</a>
- <a href='https://chakra-ui.com/'>Chakra UI</a>

<h4>ヘッドレスCMS</h4>

  - <a href='https://strapi.io/'>Strapi</a>

<h2>ファイル構造</h2>
  
```
$root
│
│   # ページファイル
├── pages
│
│   # React component ファイル
├── components
│
│   # JavaScript モジュール
└── lib
```

<h2>概要</h2>
Headless CMSのStrapiとNext.jsを利用して、ブログサイトを構築しました。
<br>ローカル環境にStrapi経由で保存されているコンテンツ情報を読み取り、Next.jsで静的HTMLを生成して表示する仕組みになっています。

<h4>こだわった点</h4>

  - CSSの代わりにChakra-UIを活用し、スタイルシート情報をcomponentごとにまとめることで、ページごとのメンテナンス性を向上。
  - アニメーションにはFramer Motionを活用し、React componentの離着脱時にもエフェクトを付加することで、スムーズなページの切り替わりを演出。
  - スタイルシート情報と同じく、アニメーションもcomponent単位でまとめあげ、全体的にメンテナンス性の高いサイト作り。
  - 記事情報の可読性と視認性を向上させるため、重要な情報は目立つように、ニーズの低い情報は目立ちすぎないように配色。
