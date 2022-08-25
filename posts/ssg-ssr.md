---
title: "SSGとSSRの使い分けの場面はいつなのか？"
date: "2022-8-5"
thumbnail: "/images/code.jpg"
---

**SSR・SSG・SPAって何？**
SSRは Server Side RenderingのことでVueなどによるjsレンダリングをブラウザではなくサーバーで行うことです。

SSGは Static Site Generateのことで静的書き出しとも言われています。HTML、CSS、JSだけで構成されるファイルを生成することをいいます。

SPAは Single Page Application と言われレンダーから何もかもブラウザ側で実行します。初期表示は遅いのでローディングは必須ですが、ページ遷移を感じさせず軽快なUIは非常に魅力的です。SEOを気にせず、操作するブラウザ環境が比較的新しいものに限定するならば選択しても良いと思います。内部的なwebアプリの操作画面などに使用されることが多いです。

**SSRの利点**
javaScriptは基本的にブラウザ側、つまり閲覧者のマシンで行われます。VueやReactはjsを用いてHTMLをレンダー（構築）するので、ブラウザ側でHTMLが完成します。PHPなどで書かれたwebサービスはサーバー側で完成したHTMLを閲覧者に配信します。

ブラウザでのレンダリングを前提に構築すると、サーバー側のHTMLは最低限の記述しかないためSEOが弱かったり、ブラウザ側の表示に時間がかかったり、古いブラウザや低スペックのスマホだと表示・動作が遅かったりするデメリットがあります。それを解決するのがSSRです。

本来ブラウザで実行されるjsをサーバー側で実行して、完成したHTMLを配信します。この場合、サーバーにはnode.jsが必要になりますが、クローラーは完成したHTMLを読み込み、またユーザー側も高速で表示することができます。

**SSGの利点**
昨今のwebアプリ・サイトはサーバーからの情報を当て込んだり、Ajaxなどで常に通信していることが多いです。しかしそれはwebアプリ（ブラウザ側）からサーバーへアクセスできる穴が必要で、そこを狙った脆弱性を通じてサーバーが攻撃されることがあります。（webアプリのソースとサーバで動く言語、DBが同居しているので危ない）

他にもサーバー側の実行が遅いと結果的にブラウザの表示が遅くなったり、もっと高速に表示したい場合はSSG、静的書き出しを行います。静的に書き出す際にjsを実行しますし、設計によってはあらかじめサーバーからの取得した情報も読み込んでおきます。

静的に書き出したものはHTML、CSS、JSだけであり基本的にはサーバーと通信して、DBからデータを取ってきたりなどもしません。そのためPHPやDBがインストールされていないサーバーに置いて、配信することが可能です。

配信側にサーバーへ対する攻撃手段が残らないのでセキュリティも格段に上がりますし、表示速度もある程度上がります。これがSSGの利点です。

**SPAの利点**
SPAの利点は実装のしやすさと軽快なUIにあります。レンダーはブラウザで行われるのでサーバーには最低限のHTMLとJSが配信される様にしておけばOKです。SSG・SSRはサーバーにnode.jsを入れたり、webサーバーとあれこりしたりと配信する前に手間がかかります。

SPAはそんなめんどくさいことは必要なく、クラアントに適切なHTMLとJSを渡すだけで解決します。SEOに弱く、また表示と操作がブラウザの性能に依存するので会員制のサイトで、その操作部分などSEOを気にしないサイトやwebアプリであればガンガン使ってもいいと思います。