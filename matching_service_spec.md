# 要件定義書 - 家庭教師マッチングサービス

以下のページ構成・URL設計について、不足情報は特にありません。
必要に応じてフォーム項目や認証要件を別途追記してください。

## ページ一覧と URL 構造

| No. | ページ名                                | パス                                                                                         | URL                                                           |
|-----|-----------------------------------------|----------------------------------------------------------------------------------------------|---------------------------------------------------------------|
| 1   | トップページ                            | `/`                                                                                          | https://katekyotsunagu.com/                                  |
| 2   | 家庭教師一覧                            | `/teachers/`                                                                                 | https://katekyotsunagu.com/teachers/                         |
| 3   | 都道府県別家庭教師一覧                  | `/teachers/{prefecture}/`                                                                    | https://katekyotsunagu.com/teachers/{prefecture}/            |
| 4   | 市区町村別家庭教師一覧                  | `/teachers/{prefecture}/{city}/`                                                             | https://katekyotsunagu.com/teachers/{prefecture}/{city}/     |
| 5   | 最寄駅別家庭教師一覧                    | `/teachers/{prefecture}/{city}/{nearest_station}/`                                           | https://katekyotsunagu.com/teachers/{prefecture}/{city}/{nearest_station}/ |
| 6   | 科目別家庭教師一覧                      | `/teachers/subject/{subject}/`                                                               | https://katekyotsunagu.com/teachers/subject/{subject}/       |
| 7   | 地域×科目別家庭教師一覧                 | `/teachers/{prefecture}/{subject}/`                                                         | https://katekyotsunagu.com/teachers/{prefecture}/{subject}/  |
| 8   | 家庭教師個別ページ                      | `/teachers/{teacher-slug}/`                                                                  | https://katekyotsunagu.com/teachers/{teacher-slug}/          |
| 9   | 生徒一覧                                | `/students/`                                                                                 | https://katekyotsunagu.com/students/                         |
| 10  | 都道府県別生徒一覧                      | `/students/{prefecture}/`                                                                    | https://katekyotsunagu.com/students/{prefecture}/            |
| 11  | 科目別生徒一覧                          | `/students/subject/{subject}/`                                                               | https://katekyotsunagu.com/students/subject/{subject}/       |
| 12  | 地域×科目別生徒一覧                     | `/students/{prefecture}/{subject}/`                                                         | https://katekyotsunagu.com/students/{prefecture}/{subject}/  |
| 13  | 生徒個別ページ                          | `/students/{student-slug}/`                                                                  | https://katekyotsunagu.com/students/{student-slug}/          |
| 14  | 家庭教師を募集する（求人作成）           | `/post-job/`                                                                                 | https://katekyotsunagu.com/post-job/                         |
| 15  | 家庭教師として登録する                  | `/registration-teacher/`                                                                    | https://katekyotsunagu.com/registration-teacher/             |
| 16  | 料金について                            | `/price/`                                                                                   | https://katekyotsunagu.com/price/                            |
| 17  | お客様の声                              | `/voice/`                                                                                   | https://katekyotsunagu.com/voice/                            |
| 18  | コラム一覧（名称未定）                  | `/blog/`                                                                                    | https://katekyotsunagu.com/blog/                             |
| 19  | コラム個別ページ（名称未定）            | `/blog/{blog-slug}/`                                                                        | https://katekyotsunagu.com/blog/{blog-slug}/                 |
| 20  | よくあるご質問                          | `/faq/`                                                                                    | https://katekyotsunagu.com/faq/                              |
| 21  | お問い合わせ                            | `/contact/`                                                                                | https://katekyotsunagu.com/contact/                          |
| 22  | プライバシーポリシー                    | `/privacy-policy/`                                                                         | https://katekyotsunagu.com/privacy-policy/                   |
| 23  | サイトマップ                            | `/sitemap.xml`                                                                             | https://katekyotsunagu.com/sitemap.xml                       |

---

上記を Markdown 形式で出力しました。エンジニア（Claude Code）にそのまま渡して開発を進められます。必要に応じて、各ページのフォーム項目定義や認証要件を追加してください。

