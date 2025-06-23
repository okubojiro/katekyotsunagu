import Link from 'next/link'

export default function PostJobPage() {
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
              <Link href="/post-job" className="text-primary font-medium">
                求人を投稿
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
              家庭教師の求人を投稿
            </h1>
            <p className="text-gray-600">
              条件に合う家庭教師から応募を受けることができます
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <form className="space-y-6">
                  {/* Student Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">生徒情報</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">学年 *</label>
                        <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" required>
                          <option value="">選択してください</option>
                          <option value="小学1年生">小学1年生</option>
                          <option value="小学2年生">小学2年生</option>
                          <option value="小学3年生">小学3年生</option>
                          <option value="小学4年生">小学4年生</option>
                          <option value="小学5年生">小学5年生</option>
                          <option value="小学6年生">小学6年生</option>
                          <option value="中学1年生">中学1年生</option>
                          <option value="中学2年生">中学2年生</option>
                          <option value="中学3年生">中学3年生</option>
                          <option value="高校1年生">高校1年生</option>
                          <option value="高校2年生">高校2年生</option>
                          <option value="高校3年生">高校3年生</option>
                          <option value="浪人生">浪人生</option>
                          <option value="大学生">大学生</option>
                          <option value="社会人">社会人</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">表示名 *</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="例：中学2年生のAさん"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Job Title */}
                  <div>
                    <label className="block text-sm font-medium mb-2">求人タイトル *</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="例：中学2年生への数学・英語指導"
                      required
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">指導場所</h3>
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
                  </div>

                  {/* Subjects */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">指導希望科目 *</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        '国語', '数学', '算数', '英語', '理科', '社会',
                        '物理', '化学', '生物', '地学', '日本史', '世界史',
                        '地理', '政治経済', '現代社会', '倫理', '数学I', '数学II',
                        '数学III', '数学A', '数学B', '数学C', '古文', '漢文',
                        '現代文', '小論文'
                      ].map((subject) => (
                        <label key={subject} className="flex items-center">
                          <input 
                            type="checkbox" 
                            className="mr-2 rounded border-gray-300 text-primary focus:ring-primary"
                            value={subject}
                          />
                          <span className="text-sm">{subject}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Hourly Rate */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">時給設定</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-2">希望時給</label>
                        <div className="flex items-center">
                          <input 
                            type="number" 
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="2500"
                            min="1000"
                            max="10000"
                          />
                          <span className="ml-2 text-gray-600">円/時</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      相場: 小学生 1,500-3,000円、中学生 2,000-3,500円、高校生 2,500-4,500円
                    </p>
                  </div>

                  {/* Schedule */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">希望スケジュール</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">指導頻度</label>
                        <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                          <option value="">選択してください</option>
                          <option value="週1回">週1回</option>
                          <option value="週2回">週2回</option>
                          <option value="週3回">週3回</option>
                          <option value="週4回以上">週4回以上</option>
                          <option value="隔週">隔週</option>
                          <option value="月1-2回">月1-2回</option>
                          <option value="不定期">不定期</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">1回の指導時間</label>
                        <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                          <option value="">選択してください</option>
                          <option value="60分">60分</option>
                          <option value="90分">90分</option>
                          <option value="120分">120分</option>
                          <option value="150分">150分</option>
                          <option value="180分">180分</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">希望曜日・時間帯</label>
                      <textarea 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={3}
                        placeholder="例：月曜日 17:00-19:00、水曜日 17:00-19:00、土曜日 10:00-12:00 または 14:00-16:00"
                      ></textarea>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">詳細説明・学習目標 *</h3>
                    <textarea 
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={6}
                      placeholder="例：&#10;数学と英語の成績向上を目指しています。特に数学の関数分野が苦手で、基礎から丁寧に教えてくださる先生を探しています。&#10;&#10;現在の状況：&#10;・数学：定期テスト平均60点&#10;・英語：定期テスト平均55点&#10;&#10;目標：&#10;・数学・英語ともに80点以上&#10;・高校受験に向けた基礎固め"
                      required
                    ></textarea>
                  </div>

                  {/* Teacher Requirements */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">応募要件・希望条件</h3>
                    <div className="space-y-3 mb-4">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary focus:ring-primary" />
                        <span>大学生OK</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary focus:ring-primary" />
                        <span>指導経験必須</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary focus:ring-primary" />
                        <span>女性教師希望</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary focus:ring-primary" />
                        <span>男性教師希望</span>
                      </label>
                    </div>
                    <textarea 
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                      placeholder="その他の要件や希望条件があれば記入してください&#10;例：優しく丁寧な指導、生徒のペースに合わせた指導、コミュニケーション重視など"
                    ></textarea>
                  </div>

                  {/* Application Deadline */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">応募締切</h3>
                    <div className="flex items-center gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">締切日</label>
                        <input 
                          type="date" 
                          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-6">
                        設定しない場合は自動的に30日後に設定されます
                      </p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">連絡先情報</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">保護者名 *</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="田中花子"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">メールアドレス *</label>
                        <input 
                          type="email" 
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="parent@example.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">電話番号</label>
                        <input 
                          type="tel" 
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="090-1234-5678"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Agreement */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="flex items-start">
                      <input 
                        type="checkbox" 
                        className="mr-3 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                        required
                      />
                      <span className="text-sm text-gray-700">
                        <strong>利用規約及びプライバシーポリシーに同意します</strong><br />
                        投稿後、条件に合う家庭教師から応募が届きます。
                        マッチング成立時に手数料が発生いたします。
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <Link 
                      href="/students"
                      className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-md text-center hover:bg-gray-300 transition-colors"
                    >
                      戻る
                    </Link>
                    <button 
                      type="submit"
                      className="flex-1 bg-primary text-white py-3 px-6 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      求人を投稿する
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Pricing Info */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">料金について</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">求人投稿</span>
                    <span className="font-semibold text-green-600">無料</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">応募受付</span>
                    <span className="font-semibold text-green-600">無料</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">マッチング成立時</span>
                      <span className="font-semibold text-primary">手数料発生</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  詳しい料金体系は<Link href="/pricing" className="text-primary hover:underline">こちら</Link>
                </p>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-900">投稿のコツ</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• 現在の学習状況を具体的に</li>
                  <li>• 目標を明確に設定する</li>
                  <li>• 指導に求めることを詳しく</li>
                  <li>• スケジュールは余裕をもって</li>
                  <li>• 適正な時給設定を心がける</li>
                </ul>
              </div>

              {/* Process */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">マッチングの流れ</h3>
                <ol className="space-y-3 text-sm">
                  <li className="flex">
                    <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                    <span>求人を投稿</span>
                  </li>
                  <li className="flex">
                    <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                    <span>教師から応募が届く</span>
                  </li>
                  <li className="flex">
                    <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                    <span>教師を選んで面談</span>
                  </li>
                  <li className="flex">
                    <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">4</span>
                    <span>指導開始</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}