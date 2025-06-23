import Link from 'next/link'
import { notFound } from 'next/navigation'
import { sampleStudents } from '@/lib/sample-data'

// 静的ビルド用の関数
export async function generateStaticParams() {
  return sampleStudents.map((student) => ({
    slug: student.slug,
  }))
}

function getStudent(slug: string) {
  return sampleStudents.find(student => student.slug === slug)
}

interface Props {
  params: { slug: string }
}

export default function StudentApplicationPage({ params }: Props) {
  const student = getStudent(params.slug)

  if (!student) {
    notFound()
  }

  const subjects = JSON.parse(student.subjects || '[]')

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
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/students" className="hover:text-primary">生徒一覧</Link>
            <span>/</span>
            <Link href={`/students/${student.slug}`} className="hover:text-primary">
              {student.displayName}
            </Link>
            <span>/</span>
            <span>応募</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-6">
                {student.displayName}への指導応募
              </h1>

              <form className="space-y-6">
                {/* Teacher Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">教師情報</h3>
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
                      <label className="block text-sm font-medium mb-2">メールアドレス *</label>
                      <input 
                        type="email" 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="teacher@example.com"
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
                    <div>
                      <label className="block text-sm font-medium mb-2">指導経験年数</label>
                      <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>未選択</option>
                        <option>1年未満</option>
                        <option>1-2年</option>
                        <option>3-5年</option>
                        <option>5年以上</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Teaching Subjects */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">指導可能科目</h3>
                  <div className="space-y-2">
                    {subjects.map((subject: string, index: number) => (
                      <label key={index} className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="mr-2 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked
                        />
                        <span>{subject}</span>
                        <span className="ml-2 text-sm text-gray-500">(生徒希望科目)</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">その他指導可能科目</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="例：国語、理科、社会"
                    />
                  </div>
                </div>

                {/* Proposed Rate */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">提案時給</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2">
                        希望時給 {student.budget && `(生徒希望: ${student.budget.toLocaleString()}円)`}
                      </label>
                      <div className="flex items-center">
                        <input 
                          type="number" 
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder={student.budget?.toString() || "2500"}
                          min="1000"
                          max="10000"
                        />
                        <span className="ml-2 text-gray-600">円/時</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Teaching Experience */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">指導経験・実績</h3>
                  <textarea 
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                    placeholder="これまでの指導経験や実績について詳しく教えてください&#10;例：大学受験指導3年、中学生指導10名以上、数学偏差値20アップ実績など"
                  ></textarea>
                </div>

                {/* Application Message */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">応募メッセージ *</h3>
                  <textarea 
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={6}
                    placeholder="この生徒への指導に対する意気込みや、どのように指導していきたいかを具体的に書いてください。&#10;&#10;例：&#10;・なぜこの生徒を指導したいと思ったか&#10;・どのような指導方針で進めるか&#10;・生徒の目標達成にどう貢献できるか"
                    required
                  ></textarea>
                </div>

                {/* Schedule */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">指導可能スケジュール</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">平日の指導可能時間</label>
                      <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>選択してください</option>
                        <option>16:00-18:00</option>
                        <option>17:00-19:00</option>
                        <option>18:00-20:00</option>
                        <option>19:00-21:00</option>
                        <option>20:00-22:00</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">土日の指導可能時間</label>
                      <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>選択してください</option>
                        <option>9:00-11:00</option>
                        <option>10:00-12:00</option>
                        <option>13:00-15:00</option>
                        <option>14:00-16:00</option>
                        <option>15:00-17:00</option>
                        <option>19:00-21:00</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Transportation */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">交通手段・移動について</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary focus:ring-primary" />
                      <span>電車・バスでの移動が可能</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary focus:ring-primary" />
                      <span>自転車での移動が可能</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary focus:ring-primary" />
                      <span>車での移動が可能</span>
                    </label>
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-medium mb-2">交通費について</label>
                    <textarea 
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={2}
                      placeholder="交通費の希望や、移動時間についてご記入ください"
                    ></textarea>
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
                      応募後、運営が生徒・保護者に確認を取り、承諾されましたら連絡先を交換いたします。
                      マッチング成立時に手数料が発生いたします。
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Link 
                    href={`/students/${student.slug}`}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-md text-center hover:bg-gray-300 transition-colors"
                  >
                    戻る
                  </Link>
                  <button 
                    type="submit"
                    className="flex-1 bg-primary text-white py-3 px-6 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    応募する
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Student Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">応募先の生徒</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">{student.displayName}</h4>
                  <p className="text-sm text-gray-600">{student.grade}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">所在地</p>
                  <p className="font-medium">{student.prefecture}{student.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">希望科目</p>
                  <div className="flex flex-wrap gap-1">
                    {subjects.map((subject: string, index: number) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                {student.budget && (
                  <div>
                    <p className="text-sm text-gray-600">希望時給</p>
                    <p className="font-medium text-primary">{student.budget.toLocaleString()}円/時</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-900">応募のコツ</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• 具体的な指導方針を書く</li>
                <li>• 過去の指導実績を含める</li>
                <li>• 生徒の目標達成への意欲を示す</li>
                <li>• スケジュールの柔軟性をアピール</li>
                <li>• 丁寧で親しみやすい文章を心がける</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}