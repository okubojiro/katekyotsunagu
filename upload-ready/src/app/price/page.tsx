import Link from 'next/link'

export default function PricePage() {
  return (
    <div className="min-h-screen bg-gray-50">
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
              <Link href="/price" className="text-primary font-medium">
                料金について
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            料金について
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            家庭教師つなぐは、マッチング成立時のみ料金が発生する
            <strong className="text-primary">成功報酬型</strong>のサービスです。
          </p>
        </div>

        {/* Pricing Overview */}
        <div className="bg-gradient-to-br from-primary/5 to-green-50 rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">シンプルで透明な料金体系</h2>
            <p className="text-gray-600">
              登録・検索・応募はすべて無料。マッチングが成立した時のみお支払いいただきます。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">無料</div>
              <div className="text-sm text-gray-600">登録・検索・応募</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">無料</div>
              <div className="text-sm text-gray-600">プロフィール作成・閲覧</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">手数料</div>
              <div className="text-sm text-gray-600">マッチング成立時のみ</div>
            </div>
          </div>
        </div>

        {/* Detailed Pricing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* For Parents/Students */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">生徒・保護者の方</h3>
              <p className="text-gray-600">家庭教師を探している方</p>
            </div>
            
            <div className="space-y-6">
              {/* Free Services */}
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-700 mb-2">無料でご利用いただけるサービス</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• 家庭教師の検索・閲覧</li>
                  <li>• 指導依頼の送信</li>
                  <li>• 求人投稿</li>
                  <li>• 応募者との初回連絡</li>
                </ul>
              </div>

              {/* Paid Services */}
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold text-primary mb-2">マッチング成立時の手数料</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">小学生指導</span>
                    <span className="font-semibold text-primary">8,000円</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">中学生指導</span>
                    <span className="font-semibold text-primary">10,000円</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">高校生指導</span>
                    <span className="font-semibold text-primary">12,000円</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">大学受験・社会人</span>
                    <span className="font-semibold text-primary">15,000円</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>お支払いタイミング：</strong>
                  家庭教師との面談後、指導開始が決定した時点でお支払いいただきます。
                </p>
              </div>
            </div>
          </div>

          {/* For Teachers */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">家庭教師の方</h3>
              <p className="text-gray-600">指導を行う先生方</p>
            </div>
            
            <div className="space-y-6">
              {/* Free Services */}
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-700 mb-2">無料でご利用いただけるサービス</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• 教師登録・プロフィール作成</li>
                  <li>• 生徒の検索・閲覧</li>
                  <li>• 指導応募</li>
                  <li>• 生徒・保護者との初回連絡</li>
                </ul>
              </div>

              {/* Paid Services */}
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold text-primary mb-2">マッチング成立時の手数料</h4>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">初回時給の50%</div>
                    <p className="text-sm text-gray-600">
                      例：時給3,000円の場合 → 1,500円
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>時給2,000円の場合：</span>
                        <span className="font-semibold">1,000円</span>
                      </div>
                      <div className="flex justify-between">
                        <span>時給3,000円の場合：</span>
                        <span className="font-semibold">1,500円</span>
                      </div>
                      <div className="flex justify-between">
                        <span>時給4,000円の場合：</span>
                        <span className="font-semibold">2,000円</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>お支払いタイミング：</strong>
                  初回指導終了後、指導継続が決定した時点でお支払いいただきます。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">お支払い方法</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💳</span>
              </div>
              <h4 className="font-semibold mb-2">クレジットカード</h4>
              <p className="text-sm text-gray-600">
                Visa、MasterCard、JCB、American Express
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏦</span>
              </div>
              <h4 className="font-semibold mb-2">銀行振込</h4>
              <p className="text-sm text-gray-600">
                指定口座への振込（振込手数料はお客様負担）
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="font-semibold mb-2">電子決済</h4>
              <p className="text-sm text-gray-600">
                PayPay、楽天Pay等（順次対応予定）
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">よくあるご質問</h3>
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Q. 手数料はいつ支払うのですか？</h4>
              <p className="text-sm text-gray-600">
                A. マッチングが成立し、実際に指導が開始されることが確定した時点でお支払いいただきます。面談のみで指導に至らなかった場合は料金は発生いたしません。
              </p>
            </div>
            <div className="border-b pb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Q. 指導料は別途かかりますか？</h4>
              <p className="text-sm text-gray-600">
                A. 指導料は教師と直接ご相談・お支払いいただきます。当サービスの手数料とは別になります。
              </p>
            </div>
            <div className="border-b pb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Q. キャンセル料はかかりますか？</h4>
              <p className="text-sm text-gray-600">
                A. マッチング成立前のキャンセルは無料です。成立後のキャンセルについては、状況に応じて個別にご相談させていただきます。
              </p>
            </div>
            <div className="border-b pb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Q. 領収書は発行されますか？</h4>
              <p className="text-sm text-gray-600">
                A. はい、お支払い完了後に電子領収書を発行いたします。経理処理等にご活用ください。
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Q. 複数の教師とマッチングしたい場合は？</h4>
              <p className="text-sm text-gray-600">
                A. 科目別や曜日別など、複数の教師とのマッチングも可能です。その場合は教師ごとに手数料が発生いたします。
              </p>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="bg-gradient-to-r from-primary/5 to-green-50 rounded-lg p-8 mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">他社サービスとの比較</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">項目</th>
                  <th className="text-center py-3 px-4 text-primary font-bold">家庭教師つなぐ</th>
                  <th className="text-center py-3 px-4 text-gray-600">一般的な仲介業者</th>
                  <th className="text-center py-3 px-4 text-gray-600">個人契約サイト</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="py-3 px-4">登録料</td>
                  <td className="text-center py-3 px-4 text-green-600 font-semibold">無料</td>
                  <td className="text-center py-3 px-4">2〜5万円</td>
                  <td className="text-center py-3 px-4 text-green-600">無料</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">マッチング手数料</td>
                  <td className="text-center py-3 px-4 text-primary font-semibold">8,000〜15,000円</td>
                  <td className="text-center py-3 px-4">0円</td>
                  <td className="text-center py-3 px-4">月額3,000〜5,000円</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">継続利用料</td>
                  <td className="text-center py-3 px-4 text-green-600 font-semibold">無料</td>
                  <td className="text-center py-3 px-4">毎月数千円</td>
                  <td className="text-center py-3 px-4 text-green-600">無料</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">運営サポート</td>
                  <td className="text-center py-3 px-4 text-primary font-semibold">あり</td>
                  <td className="text-center py-3 px-4">あり</td>
                  <td className="text-center py-3 px-4">なし</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">トラブル対応</td>
                  <td className="text-center py-3 px-4 text-primary font-semibold">あり</td>
                  <td className="text-center py-3 px-4">あり</td>
                  <td className="text-center py-3 px-4">自己責任</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            透明で安心な料金体系で、理想の学習環境を
          </h3>
          <p className="text-gray-600 mb-8">
            成功報酬型だから、安心してご利用いただけます
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/students"
              className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primary/90 transition-colors inline-block"
            >
              生徒を探す
            </Link>
            <Link 
              href="/teachers"
              className="bg-white text-primary border border-primary px-8 py-3 rounded-md hover:bg-primary/5 transition-colors inline-block"
            >
              家庭教師を探す
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}