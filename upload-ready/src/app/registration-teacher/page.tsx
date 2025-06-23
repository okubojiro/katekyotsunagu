import Link from 'next/link'

export default function TeacherRegistrationPage() {
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
              <Link href="/registration-teacher" className="text-primary font-medium">
                教師登録
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              家庭教師として登録
            </h1>
            <p className="text-gray-600">
              質の高い指導で生徒の成長をサポートしませんか？
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Registration Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <form className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-semibold mb-6 pb-2 border-b">基本情報</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">お名前 *</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="山田太郎"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">フリガナ *</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="ヤマダタロウ"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">性別 *</label>
                        <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
                          <option value="">選択してください</option>
                          <option value="男性">男性</option>
                          <option value="女性">女性</option>
                          <option value="その他">その他</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">年齢 *</label>
                        <input 
                          type="number" 
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="25"
                          min="18"
                          max="70"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">メールアドレス *</label>
                        <input 
                          type="email" 
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="teacher@example.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">電話番号 *</label>
                        <input 
                          type="tel" 
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="090-1234-5678"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Education & Status */}
                  <div>
                    <h3 className="text-xl font-semibold mb-6 pb-2 border-b">学歴・現在の身分</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">現在の身分 *</label>
                        <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
                          <option value="">選択してください</option>
                          <option value="大学生">大学生</option>
                          <option value="大学院生">大学院生</option>
                          <option value="社会人">社会人</option>
                          <option value="専業家庭教師">専業家庭教師</option>
                          <option value="その他">その他</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">学年（学生の場合）</label>
                        <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                          <option value="">選択してください</option>
                          <option value="1年">1年</option>
                          <option value="2年">2年</option>
                          <option value="3年">3年</option>
                          <option value="4年">4年</option>
                          <option value="修士1年">修士1年</option>
                          <option value="修士2年">修士2年</option>
                          <option value="博士課程">博士課程</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">大学名 *</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="○○大学"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">学部・学科 *</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="○○学部○○学科"
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">最終学歴・その他学歴</label>
                      <textarea 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={3}
                        placeholder="高校名、資格、その他の学歴など"
                      ></textarea>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <h3 className="text-xl font-semibold mb-6 pb-2 border-b">活動地域</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">都道府県 *</label>
                        <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
                          <option value="">選択してください</option>
                          <option value="東京都">東京都</option>
                          <option value="神奈川県">神奈川県</option>
                          <option value="埼玉県">埼玉県</option>
                          <option value="千葉県">千葉県</option>
                          <option value="茨城県">茨城県</option>
                          <option value="栃木県">栃木県</option>
                          <option value="群馬県">群馬県</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">市区町村 *</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="例：新宿区"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">最寄駅</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="例：JR新宿駅"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">指導可能地域</label>
                      <textarea 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={3}
                        placeholder="指導に伺える地域を詳しく教えてください&#10;例：新宿区、渋谷区、中野区、JR山手線沿線、京王線沿線など"
                      ></textarea>
                    </div>
                  </div>

                  {/* Teaching Subjects */}
                  <div>
                    <h3 className="text-xl font-semibold mb-6 pb-2 border-b">指導可能科目</h3>
                    <div className="space-y-6">
                      {/* Elementary */}
                      <div>
                        <h4 className="font-medium mb-3">小学生</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {['算数', '国語', '理科', '社会', '英語'].map((subject) => (
                            <label key={subject} className="flex items-center">
                              <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary focus:ring-primary" />
                              <span className="text-sm">{subject}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Junior High */}
                      <div>
                        <h4 className="font-medium mb-3">中学生</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {['数学', '国語', '英語', '理科', '社会'].map((subject) => (
                            <label key={subject} className="flex items-center">
                              <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary focus:ring-primary" />
                              <span className="text-sm">{subject}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* High School */}
                      <div>
                        <h4 className="font-medium mb-3">高校生</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            '数学I', '数学II', '数学III', '数学A', '数学B', '数学C',
                            '現代文', '古文', '漢文', '小論文',
                            '英語', 'English Communication', 'English Expression',
                            '物理', '化学', '生物', '地学',
                            '日本史', '世界史', '地理', '政治経済', '現代社会', '倫理'
                          ].map((subject) => (
                            <label key={subject} className="flex items-center">
                              <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary focus:ring-primary" />
                              <span className="text-sm">{subject}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Teaching Experience */}
                  <div>
                    <h3 className="text-xl font-semibold mb-6 pb-2 border-b">指導経験・実績</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">指導経験年数 *</label>
                        <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
                          <option value="">選択してください</option>
                          <option value="未経験">未経験</option>
                          <option value="1年未満">1年未満</option>
                          <option value="1-2年">1-2年</option>
                          <option value="3-5年">3-5年</option>
                          <option value="5年以上">5年以上</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">指導した生徒数</label>
                        <input 
                          type="number" 
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="10"
                          min="0"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">指導実績・得意分野</label>
                      <textarea 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={5}
                        placeholder="これまでの指導経験や実績について詳しく教えてください&#10;&#10;例：&#10;・○○大学合格実績5名&#10;・数学偏差値20アップ実績&#10;・中学受験指導経験豊富&#10;・不登校生徒のサポート経験あり"
                      ></textarea>
                    </div>
                  </div>

                  {/* Teaching Philosophy */}
                  <div>
                    <h3 className="text-xl font-semibold mb-6 pb-2 border-b">指導方針・自己PR</h3>
                    <div>
                      <label className="block text-sm font-medium mb-2">指導方針・自己PR *</label>
                      <textarea 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={6}
                        placeholder="あなたの指導方針や強み、生徒・保護者へのメッセージを教えてください&#10;&#10;例：&#10;・生徒一人一人のペースに合わせた丁寧な指導&#10;・苦手分野の根本的な理解を重視&#10;・勉強が楽しくなるような工夫&#10;・コミュニケーションを大切にしたサポート"
                        required
                      ></textarea>
                    </div>
                  </div>

                  {/* Schedule & Rate */}
                  <div>
                    <h3 className="text-xl font-semibold mb-6 pb-2 border-b">指導条件</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">希望時給 *</label>
                        <div className="flex items-center">
                          <input 
                            type="number" 
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="2500"
                            min="1000"
                            max="10000"
                            required
                          />
                          <span className="ml-2 text-gray-600">円/時</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          相場: 小学生 1,500-3,000円、中学生 2,000-3,500円、高校生 2,500-4,500円
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">指導可能回数</label>
                        <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                          <option value="">選択してください</option>
                          <option value="週1回">週1回</option>
                          <option value="週2回">週2回</option>
                          <option value="週3回以上">週3回以上</option>
                          <option value="月数回">月数回</option>
                          <option value="要相談">要相談</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">指導可能時間帯</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-2">平日</label>
                          <div className="space-y-2">
                            {[
                              '9:00-12:00', '12:00-15:00', '15:00-18:00',
                              '18:00-21:00', '21:00-24:00'
                            ].map((time) => (
                              <label key={time} className="flex items-center">
                                <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary focus:ring-primary" />
                                <span className="text-sm">{time}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm mb-2">土日祝</label>
                          <div className="space-y-2">
                            {[
                              '9:00-12:00', '12:00-15:00', '15:00-18:00',
                              '18:00-21:00', '21:00-24:00'
                            ].map((time) => (
                              <label key={time} className="flex items-center">
                                <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary focus:ring-primary" />
                                <span className="text-sm">{time}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transportation */}
                  <div>
                    <h3 className="text-xl font-semibold mb-6 pb-2 border-b">交通手段</h3>
                    <div className="space-y-3 mb-4">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary focus:ring-primary" />
                        <span>電車・バス</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary focus:ring-primary" />
                        <span>自転車</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary focus:ring-primary" />
                        <span>車</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary focus:ring-primary" />
                        <span>その他</span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">交通費について</label>
                      <textarea 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={2}
                        placeholder="交通費の希望や、移動可能範囲について教えてください"
                      ></textarea>
                    </div>
                  </div>

                  {/* Verification Documents */}
                  <div>
                    <h3 className="text-xl font-semibold mb-6 pb-2 border-b">本人確認書類</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">身分証明書 *</label>
                        <input 
                          type="file" 
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          accept="image/*,.pdf"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          運転免許証、学生証、保険証など（JPG, PNG, PDF形式）
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">学歴証明書（在学証明書・卒業証明書など）</label>
                        <input 
                          type="file" 
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          accept="image/*,.pdf"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          在学証明書、卒業証明書、成績証明書など（JPG, PNG, PDF形式）
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Agreement */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">利用規約への同意</h3>
                    <div className="space-y-3">
                      <label className="flex items-start">
                        <input 
                          type="checkbox" 
                          className="mr-3 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                          required
                        />
                        <span className="text-sm text-gray-700">
                          <strong>利用規約及びプライバシーポリシーに同意します *</strong><br />
                          登録後、運営による審査を行います。審査通過後にサービスをご利用いただけます。
                        </span>
                      </label>
                      <label className="flex items-start">
                        <input 
                          type="checkbox" 
                          className="mr-3 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                          required
                        />
                        <span className="text-sm text-gray-700">
                          <strong>提出書類の真正性を保証します *</strong><br />
                          虚偽の情報を提供した場合、登録を取り消すことがあります。
                        </span>
                      </label>
                      <label className="flex items-start">
                        <input 
                          type="checkbox" 
                          className="mr-3 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700">
                          <strong>メール・SMS配信に同意します</strong><br />
                          マッチング情報や重要なお知らせをお送りします。（任意）
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <Link 
                      href="/"
                      className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-md text-center hover:bg-gray-300 transition-colors"
                    >
                      戻る
                    </Link>
                    <button 
                      type="submit"
                      className="flex-1 bg-primary text-white py-3 px-6 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      登録申請を送信
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Registration Process */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">登録の流れ</h3>
                <ol className="space-y-3 text-sm">
                  <li className="flex">
                    <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                    <span>申請フォーム送信</span>
                  </li>
                  <li className="flex">
                    <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                    <span>書類審査（1-3営業日）</span>
                  </li>
                  <li className="flex">
                    <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                    <span>面談・確認（必要に応じて）</span>
                  </li>
                  <li className="flex">
                    <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">4</span>
                    <span>登録完了・活動開始</span>
                  </li>
                </ol>
              </div>

              {/* Benefits */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-900">登録のメリット</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• 質の高い生徒とのマッチング</li>
                  <li>• 安心の運営サポート</li>
                  <li>• 適正な料金設定</li>
                  <li>• 柔軟な働き方</li>
                  <li>• 教育経験の蓄積</li>
                </ul>
              </div>

              {/* Required Documents */}
              <div className="bg-yellow-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-yellow-900">必要書類</h3>
                <ul className="space-y-2 text-sm text-yellow-800">
                  <li>• 身分証明書（必須）</li>
                  <li>• 学歴証明書（推奨）</li>
                  <li>• 資格証明書（該当者）</li>
                </ul>
                <p className="text-xs text-yellow-700 mt-3">
                  ※書類は審査のみに使用し、適切に管理いたします
                </p>
              </div>

              {/* Contact */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">お困りの方へ</h3>
                <p className="text-sm text-gray-600 mb-3">
                  登録についてご不明な点がございましたら、お気軽にお問い合わせください。
                </p>
                <Link 
                  href="/contact"
                  className="text-primary hover:underline text-sm"
                >
                  お問い合わせはこちら
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}