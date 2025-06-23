import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, HelpCircle } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary">家庭教師つなぐ</h1>
            </Link>
            <div className="flex gap-4">
              <Link href="/teachers">
                <Button variant="ghost">教師を探す</Button>
              </Link>
              <Button variant="outline" disabled>
                ログイン（準備中）
              </Button>
              <Button disabled>
                登録（準備中）
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">料金について</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            家庭教師つなぐは<strong>マッチング成立時のみ</strong>お支払いいただく明確な料金体系です。
            <br />
            月額料金や登録料は一切不要で、安心してご利用いただけます。
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* For Parents */}
          <Card className="relative">
            <CardHeader className="text-center">
              <Badge className="w-fit mx-auto mb-4">保護者の方</Badge>
              <CardTitle className="text-2xl">マッチング成立時のみ</CardTitle>
              <CardDescription>
                教師とのマッチングが成立した時点で一度だけお支払い
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-primary mb-2">¥5,000</div>
                <div className="text-gray-600">マッチング成立時</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>教師検索・閲覧</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>指導依頼送信</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>運営による仲介サポート</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>連絡先交換</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>トラブル時のサポート</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">月額料金</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">登録料</span>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/teachers">
                  <Button className="w-full" size="lg">
                    教師を探す
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* For Teachers */}
          <Card className="relative">
            <CardHeader className="text-center">
              <Badge variant="secondary" className="w-fit mx-auto mb-4">教師の方</Badge>
              <CardTitle className="text-2xl">完全無料</CardTitle>
              <CardDescription>
                登録から指導開始まで一切費用はかかりません
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-green-600 mb-2">¥0</div>
                <div className="text-gray-600">すべて無料</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>プロフィール登録</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>指導依頼の受信</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>運営による仲介サポート</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>連絡先交換</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>トラブル時のサポート</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">手数料</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">登録料</span>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/register-teacher">
                  <Button variant="outline" className="w-full" size="lg">
                    教師として登録
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How Payment Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">お支払いの流れ</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-semibold mb-2">教師検索</h3>
              <p className="text-sm text-gray-600">条件に合う教師を検索・閲覧（無料）</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-semibold mb-2">指導依頼</h3>
              <p className="text-sm text-gray-600">気に入った教師に指導依頼を送信（無料）</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-semibold mb-2">マッチング成立</h3>
              <p className="text-sm text-gray-600">教師が承諾したら決済リンクをお送りします</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="font-semibold mb-2">指導開始</h3>
              <p className="text-sm text-gray-600">お支払い確認後、連絡先を交換して指導開始</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">お支払い方法</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center text-sm font-bold">💳</div>
                  クレジットカード
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Stripe決済により安全にお支払いいただけます</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Visa、Mastercard、JCB、American Express</li>
                  <li>• 即座に決済完了</li>
                  <li>• SSL暗号化による安全な取引</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-600 text-white rounded flex items-center justify-center text-sm font-bold">🏦</div>
                  銀行振込
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">指定口座へのお振込も可能です</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 振込手数料はお客様負担</li>
                  <li>• 営業日1-2日で確認</li>
                  <li>• 振込確認後に連絡先交換</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">よくある質問</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <HelpCircle className="w-5 h-5 text-blue-500" />
                  マッチング成立とはどの時点ですか？
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  教師が指導依頼を承諾した時点で「マッチング成立」となります。運営が教師に確認を取り、教師が「指導可能」と回答した段階で決済をお願いしております。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <HelpCircle className="w-5 h-5 text-blue-500" />
                  指導料金は別途必要ですか？
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  はい。マッチング手数料とは別に、教師への指導料金は直接お支払いいただきます。指導料金・支払い方法・頻度などは教師と直接ご相談ください。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <HelpCircle className="w-5 h-5 text-blue-500" />
                  複数の教師にマッチングした場合の料金は？
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  マッチング成立ごとに¥5,000をお支払いいただきます。例えば、数学の教師と英語の教師、2名とマッチングした場合は合計¥10,000となります。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <HelpCircle className="w-5 h-5 text-blue-500" />
                  マッチング後に指導が開始されなかった場合は？
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  マッチング成立後、連絡先交換から1週間以内に指導が開始されない場合、または教師側の都合で指導ができなくなった場合は、全額返金いたします。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">今すぐ理想の家庭教師を見つけよう</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            明確な料金体系で安心。まずは無料で教師を検索してみませんか？
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/teachers">
              <Button size="lg" className="px-8">
                教師を探す
              </Button>
            </Link>
            <Link href="/register-teacher">
              <Button size="lg" variant="outline" className="px-8">
                教師として登録
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}