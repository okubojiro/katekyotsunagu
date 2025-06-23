import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-primary">
              家庭教師つなぐ
            </Link>
            <div className="flex gap-4">
              <Link href="/teachers" className="hover:text-primary">
                家庭教師を探す
              </Link>
              <Link href="/students" className="hover:text-primary">
                生徒を探す
              </Link>
              <Link href="/post-job" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                求人を投稿
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              🎓 安心の運営仲介型マッチングサービス
            </span>
          </div>
          <h1 className="text-4xl md:text-4xl font-bold mb-6 text-gray-900">
            理想の家庭教師を<br />
            <span className="text-primary">簡単に見つけよう</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            質の高い家庭教師と生徒を安全にマッチング。<br />
            運営が仲介するから安心して個人契約を結べます。
          </p>
          
          {/* CTAボタン */}
          <div className="flex gap-4 justify-center mb-12">
            <Link href="/teachers" className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors shadow-lg">
              家庭教師を探す
            </Link>
            <Link href="/students" className="border border-primary text-primary px-8 py-4 rounded-lg text-lg font-medium hover:bg-primary hover:text-white transition-colors">
              生徒を探す
            </Link>
          </div>

          {/* 統計情報 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <div className="text-gray-600">登録教師数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600">マッチング成功率</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.8</div>
              <div className="text-gray-600">平均評価</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">なぜ家庭教師つなぐが選ばれるのか</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              安心・安全・確実なマッチングで、理想の学習環境を提供します
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                🛡️
              </div>
              <h3 className="text-xl font-semibold mb-3">安心の運営仲介</h3>
              <p className="text-gray-600">
                全ての依頼は運営が確認・仲介。教師の承諾後に連絡先を交換するので、安全な個人契約が可能です。
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                👥
              </div>
              <h3 className="text-xl font-semibold mb-3">質の高い教師陣</h3>
              <p className="text-gray-600">
                厳選された経験豊富な家庭教師が登録。教科・地域・料金など詳細な条件で理想の先生を見つけられます。
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                ✅
              </div>
              <h3 className="text-xl font-semibold mb-3">明確な料金体系</h3>
              <p className="text-gray-600">
                マッチング成立時のみ手数料をお支払い。時給や契約期間は教師と直接相談できます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">簡単4ステップで理想の家庭教師と出会える</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              安心・安全な承認フローで、質の高いマッチングを実現
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-lg flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h4 className="font-semibold mb-3 text-lg">教師を検索</h4>
                <p className="text-gray-600">条件に合う家庭教師を探して詳細を確認</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-lg flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h4 className="font-semibold mb-3 text-lg">依頼送信</h4>
                <p className="text-gray-600">気に入った先生に指導依頼を送信</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-lg flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h4 className="font-semibold mb-3 text-lg">運営確認</h4>
                <p className="text-gray-600">運営が教師に確認し、承諾されたらマッチング成立</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-lg flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  4
                </div>
                <h4 className="font-semibold mb-3 text-lg">指導開始</h4>
                <p className="text-gray-600">連絡先を交換して指導スケジュールを相談</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/teachers" className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors shadow-lg">
              今すぐ教師を探す
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">家庭教師つなぐ</h4>
              <p className="text-gray-400">信頼できる家庭教師マッチングサービス</p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">サービス</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/teachers" className="hover:text-white">家庭教師を探す</Link></li>
                <li><Link href="/students" className="hover:text-white">生徒を探す</Link></li>
                <li><Link href="/price" className="hover:text-white">料金について</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">サポート</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-white">お問い合わせ</Link></li>
                <li><Link href="/faq" className="hover:text-white">よくある質問</Link></li>
                <li><Link href="/help" className="hover:text-white">ヘルプ</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">法的情報</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/terms" className="hover:text-white">利用規約</Link></li>
                <li><Link href="/privacy" className="hover:text-white">プライバシーポリシー</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 家庭教師つなぐ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}