import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

type User = {
    id: string;
    name: string;
    recordings: Recording[];
};

type Recording = {
    id: string;
    file: string;
    script: string;
    title: string;
    created_at: string;
}

const users: User[] = [
    {
        id: "eniehack",
        name: "なかやばし",
        recordings: [
            {
                file: "/01HME4VVMBGGMG506BGYYFXZM3.ogg",
                id: "01HME4VVMBGGMG506BGYYFXZM3",
                script: "そうすると 先ほどと同じように このような形で さっきと同じような 録音されている状態になります そして もう1回話します",
                title: "デモ",
                created_at: "2024-01-19T19:14:24Z+09:00",
            },
            {
                file: "/01HME4VVMBMZCFJ27N7GR8W37X.ogg",
                id: "01HME4VVMBMZCFJ27N7GR8W37X",
                script: "えーと今は2024年1月19日の17時ですえっと今はせっかくの動画を作ろうと思って 今なんかデモ音源みたいなものを撮っています うーんなんかまあ動画を作るのめんどくさいんで とりあえず録音でもしようかなという感じです うーんまあ喋る こと特にないかな あとはまあそんなところでしょうか まあなんか残り少ないですけど頑張りまーす っていうところで以上です",
                title: "てすと",
                created_at: "2024-01-19T17:09:00Z+09:00",
            },
            {
                file: "/01HME4VVMBFYQT2YC5HH10T9TG.ogg",
                id: "01HME4VVMBFYQT2YC5HH10T9TG",
                script: "えっとまぁなんか全員みんな動画を持ってきて なんかドーンってみんなで見てなんかこう いやーみたいな感じかと思ったんですけど全然そんな感じだったとびっくりしています っていうところでまあなんかスライドっぽいものを作ってでもな んか まあ今日いろんな人がこう見せてくれたものを見ながら なるほどと言ってこうなんかちょこちょこ手を加えていったものをとりあえずお見せしようかな という感じです はい でまぁなんか はいえっとまぁ木地みたいのを作ってみたんですけどまぁなんか順番とちょっと木地が 全然対応しないんでこの辺は要修正かなという感じはするんですけど へいへいと でまぁ何作ってるんだっけってい うところでまぁちょっと前話した時と作ってるものが 違うんでまぁここで説明しますよと えっと声で日記をつけるサービスっていう話ですね だからこれさっきその 柏崎さんと松永さんが話した話にちょっと通じるところもあるかな けどなんか文章でまぁこれちょ っと後で説明するんでまぁじゃあこれは 一旦これ切っておこうかという感じなんですけどまぁ別に日記に限らなくてその まあなんか自分が思ったことをこう書いてが載せられてそれを人に人にというか まあ主になんですけどまぁリアルの友人に共有するみたいなも のを考えていますと でも進捗についても後で説明しようかなと思います なんで作ってるのっていうところまあなんか試作なんでやっぱり何でみたいなところって ちゃんと書いておいたほうがいいなぁと思ったので でまぁなんか3つあって まあなんか書くより話す方が気軽じゃねっていうところと 声にはテキストに出せないそれ以上の情報例えばコアネであるとかみたいなところ まあなんかその  ああいやこれ以上話してもいいけど先にとりあえずしましょう あとまあ頭にある表現を表現しようと表現しきれない みたいなところもやもや感感情みたいなこうどうやって表彰がすればいいかなって 思ったときにやっぱ話すみたいなっていいんじゃないかなってい うのがありましたよという話ですと でえっとまあなんか友人と 交戦の友人なんですけど交戦の友人とブログ書いて近況報告しちゃおうよって話をずっと前に していて なんか近況語る文化を作ろうと思ったら失敗したんですよね でなんかそれまあだが自分の自分も 続かなかった方なんですけど な友人だけ続いたんですけどまぁそれをいいとしてまあ書くことが面倒になって続かない なっていうのはまあ一つありますと 毎日毎日ってことじゃないですけどなんかこうまあ 研究室行ったりとかして疲れたって思った時に日記を書くかっていうともう別に日記を書き たいという気持ちにあんまりならないような気がしていて まあそれだったらスマホに向けてこうパッと話すだけなら気軽にそこそこできるん じゃないのっていうのが一つまあ ポイントとしてあります で声には的まあテキストには 出せないそれ以上の情報があるんじゃないっていうところ としてはまあなんか 自分自身が結構10月11月今年のなんですけど今年去年か もう去年ですね去年のまあ卒権とかせっかくとかの進め方で結構詰まっててどうしよう かなーって思った時に結構そのせっかくの動画会で なんか言語化うまいですねとかなんかこう情熱が伝わってきましたみたいな コメントをもらってでそこに結構救われたというか っていうのがあってますそこ考えでやっぱりその声っていうのって そう単なるそのテキスト 以上のなんか情報というか何かが 詰め込めるんじゃないっていうところが一つあり ましたと でまぁなんかちょっとパッてツイッターで見た程度なんてまぁどうなのかあれなんですけど テキストコミュニケーションで9等点 とかって結構冷たい明治受けるよねみたいな話をちょっと見たことがあった のでなんかまぁそれ とかも含めて考えるとなんかこういう感じになるかなーっていうところですと でもハイハイとえっとまぁこれはなんか まあちょっと裏を見せた方がフィードバックちゃんともらえそうだなーって思ったので ここに書き足しましたと まあちょっ と動画に入れるかちょっと要件等って感じなんですけど まあその試作ってやっぱりなんかこの人生において まあ取り組みたいことについて考えようぜみたいな まあ触れ込みというかまだがそういう感じで書いてあったと思うんですけどまぁじゃあ それならちょっとここでそう見せた方が面白いんじゃないと思っ ちょっと書いておきますと まあこうちょっとあのかけあのかき殴っただけなんでちょっと微妙にアレなんです けど まあその 私結構その場あの音楽聴くの好きで まあその中でもくるりっていうバンドがあるんですけどそれそのバンドがその キーワードとして挙げているのは旅を続けるロックバンドっていう 言葉 でまぁなんか表現してですね自分た ちを まあ結構それはそうで何かに20年くらいメジャーでして20年くらい経ってるんです けど本当にいろんなバンド えっとなんか分 野の曲を作っていて 電車音楽的なものを作っていたし まあ普通にロックバンドロックとしてやっている時もあったし なんかある時 はその って言えばいいんだろうな 8まあ 8なんだっけあの 歓迎歓迎楽団で連れてきて曲を作るとかなんかそういうのやってなんかいろいろ こう 手を出すいろいろ手を出していてなんかいろいろやってみるみたいなそういうのに ちょっと憧れているなっていう中自 分にも感じていたところとしてありましょう でまぁその中でそのまあじゃあ人生がもしも貢献なあればこれはさっき言ったの さっき藤川さんが言ったところもちょっとあるんですけど じゃあせっかくしかできなかった経験とかアドバイスとか 柏崎さんはじめそのままトレーナーの皆さんとか エビトレーナーの皆さんとかもうそのトレーニーとかもまあっていうこの環境があってこそしか できないことみたいなことを まあ形にしてまあ終了していくっていうのが一番こう いい形として終わっていけるのかなっていうような気が終わっていく まあ一つのまあ 伏見を迎えられるのかなあっていうのを一つ持っていたっていうのがありますと っていうのとまああと か山さんのリドバックまぁちょっとタイムズにちょっと 前さっき書きましたけどなんかさっきの話を聞いてなんかまあ今の なんかまあ人生における位置づけみたいな話をちょっとまあなんか思ったりして いました っていう話ですね まあっていう話だったんですけ どはい じゃあなんか今まで全然セキュリティ要素ないじゃんみたいな その作りたいものもなんかその声 声をこう録音してなんか日 記っぽくするっていうところにどこにセキュリティ要素が あるんですかっていうまあ突っ込みが多分来るのでここでこうなんか サイバーセキュリティと関係がありますというのではなくて いや俺はこのセキュリティとしていや俺は俺はこのセキュリティでやってい くけどみたいな 勝手に定義してまあそれを満たしているからはこの作品ってセキュリティっぽいよね みたいなことを言いたいみたいな感じですね でまぁ我々ってセキュリティっていう時にサイバーセキュリティ 暗黙的に言ってますよねっていうのはえっと 多分年 末のセキュリティのサーベイアンド ld の時で話した内容ですよね でまぁこの後もまあその話がちょっと続くんですけど セキュリティってなんだセキュリティの語源ってなんだっけみたいなことを考えると セキュアといって言っての名刺 リアルのまあな節技術 節 技術がくっついてセキュリティって子ができてるよねじゃあセキュアってなんだっけ みたいなことを考えたときにまあ調べたらはこ ういうのでできたよねと でまぁなんか他のサイトとかを見ていると心配から離れるとか なんかまぁ心配から離れてますなぁじゃあ安全安心とか なんかそういう言葉がこう想像できるけど まあじゃあそういうことを考えたら なんか 8はそれだな 8まあそういうこと を考えたらその 近況を話すとか まあ日記ですねとか まあそれこそなんかその柏崎先生が 者さんがよく言ってたその一人にさせないみたいな話 なんかそういうところとしてなんかまあそうなんかそういうところがやっぱり心配から離れ てみたいなところと絡んでくるのかなーって個人的に思ってるんですけど だからまあこれが言葉にまあちょっとまとまってないですね はいって思いながら って いうところですねでまぁなんか技術構成のことを話したら まあちょっと面白いかなぁと思ってちょっと付け足したんですが今うまく まだ形になっ てないんであれなんですけど なんかこれしたに来てるなえっと web アプリケーションを想定していて えっとフロントは滑るとっていうまあなんかリアクトみたいなやつですね なんかそれを使って作ろうとしていてサーバーに関して全然何の言語を使 うって いうのは考えてなくて まあちょっとなんかそうですねであとはまあなんか認証とかなんかアカウントを作る みたいなところ はファイアベースオセンティケーションてやつを使うとなんか割と雑に実装できて かつなんかまあそこそこセキュアっぽいし なんかそのツイッターとかのアカウントがログインできて嬉しそうだみたいな話があるのでまぁ そこらへんの手軽さからまあ入れてみよう かちょっとまあなんか まあ勉強がてら使ってに作ってみようかなっていうのが ありましたよと動画どうすんの スライドを作ってま ぁこんな感じで話そうかまあそれこそその声みたいなところが今回 のまあ今作ろうと思って作品のテーマとしてあるので 合成音声とか使わずになんか自分の話したい自分の声で話したいことを話すって いうのが一番やっぱりこう なんか筋が通るっていうかなんかそんな気がするのでそう話そうかなって思って ますであとはまあまああと1週間でえっと作ったもの まあそのシーテンさんとかも言っ てましたけどマキュアルコードとかをスライドに貼って使った ものを使ってもらう 作ったものなんかまあそれまでに作っておいてでプロイして使ってもらって フィードバックをもらうそのまあ入手終了を決めるみたいなところもあるんです けど まあなんかまあ目 的としては破壊てなっ 8 まあ 人生て長いのでまあこれ以上もその月今作ったものを改善するよちってまあめちゃくちゃ あるしそう いう時間もあるのでまあなんかどうせならそのフィードバックをもらう 時間として定義するというか 今回の会はそういう会にてとして定義して まあフィードバックをもらって面白いものを作れたらいいかな それこそそのまあ今のまあちょっと前に話した まあ交戦 の友人とまあなんかその近況について話すみたいなところでこうなんかいい感じに 使っていけたら面白いんじゃないかなっていうの を今考えて まああんま実装進んでないですけどまぁそんな感じです 8そうですねはい ちょっとスライドないんで以上です",
                title: "動画第1稿@思索ゼミ 2024/01/14",
                created_at: "2024-01-14T23:47:00Z+09:00",
            },
            {
                file: "/01HMQBCK83659S4F0AH37YEQJ9.ogg",
                id: "01HMQBCK83659S4F0AH37YEQJ9",
                script: "今は、2024年1月22日の9時12分です。 6時くらいまで作業してて、せっかくの動画を作っていて、めちゃくちゃ眠いし、 なんか、睡眠時間が足りない時の特有の腕の痛さというか、謎の筋肉痛みたいなのに襲われていますというか、があります 。 今、とりあえず後はデモを作って、時間を削るところをやらないとまずいので、その辺を今からやって、直せるかな、あんまり。 なんかあんまり、動画の内容が微妙だなという感じだったんですよね。 話す。ゼミの時は人がいたい、人に向かって説明するみたい な体で喋ってたんですけど、一人で話すみたいな感じになると、どうもうまく説明がいかない。 どうしたもんかなーっていう感じで すよね。 とりあえず頑張りますという感じです。",
                title: "動画提出の朝",
                created_at: "2024-01-22T09:15:00Z+09:00",
            },
        ]
    }
];

export const load: PageLoad = ({ params }) => {
    const content = users.filter(u => u.id === params.user_id);
    if (content.length < 1) {
        error(404, 'Not found');
    }
    return content[0];	
};