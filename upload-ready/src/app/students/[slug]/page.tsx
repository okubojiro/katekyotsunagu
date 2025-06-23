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

export default function StudentDetailPage({ params }: Props) {
  const student = getStudent(params.slug)

  if (!student) {
    notFound()
  }

  const subjects = JSON.parse(student.subjects || '[]')
  // 静的データなので、サンプルスケジュール
  const schedule = {
    "平日": ["16:00-18:00", "19:00-21:00"],
    "土曜": ["10:00-12:00", "14:00-16:00"],
    "日曜": ["相談可能"]
  }

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
              <Link href="/post-job" className="bg-primary text-white px-4 py-2 rounded-md">
                求人を投稿
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Student Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {student.displayName}
                  </h1>
                  <div className="flex gap-2 mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded">
                      {student.grade}
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded">
                      {student.prefecture}{student.city}
                    </span>
                  </div>
                </div>
                {student.budget && (
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      時給 {student.budget.toLocaleString()}円
                    </p>
                  </div>
                )}
              </div>

              {/* Location Info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">所在地</h3>
                <div className="space-y-2">
                  <p>📍 {student.prefecture}{student.city}</p>
                  {student.nearestStation && (
                    <p>🚉 最寄駅: {student.nearestStation}</p>
                  )}
                </div>
              </div>

              {/* Subjects */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">希望科目</h3>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject: string, index: number) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">詳細・学習目標</h3>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {student.description}
                </p>
              </div>

              {/* Preferred Schedule */}
              {Object.keys(schedule).length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">希望スケジュール</h3>
                  <div className="bg-gray-50 p-4 rounded">
                    {Object.entries(schedule).map(([day, times]: [string, any]) => (
                      <div key={day} className="mb-2">
                        <span className="font-medium">{day}: </span>
                        <span>{Array.isArray(times) ? times.join(', ') : times}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Teacher Preferences */}
              {student.preferredGender && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">希望条件</h3>
                  <p>希望教師性別: {student.preferredGender}</p>
                </div>
              )}
            </div>

            {/* Job Postings - サンプル */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">募集中の求人</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">{subjects.join('・')}の指導募集</h4>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {subjects.map((subject: string, index: number) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                  {student.budget && (
                    <p className="text-primary font-semibold mb-2">
                      時給: {student.budget.toLocaleString()}円
                    </p>
                  )}
                  <p className="text-gray-600 text-sm mb-2">{student.description}</p>
                  <p className="text-sm text-red-600">
                    応募締切: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('ja-JP')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Apply Button */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">この生徒に応募する</h3>
              <Link 
                href={`/students/${student.slug}/apply`}
                className="block w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors mb-4 text-center"
              >
                応募する
              </Link>
              <p className="text-sm text-gray-600">
                応募後、運営が生徒・保護者に確認いたします
              </p>
            </div>

            {/* Student Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">統計情報</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">閲覧数</span>
                  <span className="font-semibold">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">応募数</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">投稿日</span>
                  <span className="font-semibold">
                    {new Date(student.createdAt).toLocaleDateString('ja-JP')}
                  </span>
                </div>
              </div>
            </div>

            {/* Similar Students */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">類似の生徒</h3>
              <div className="space-y-3">
                <div className="border-b pb-3">
                  <Link href="#" className="text-primary hover:underline">
                    中学3年生のBさん
                  </Link>
                  <p className="text-sm text-gray-600">数学・英語 | 東京都新宿区</p>
                </div>
                <div className="border-b pb-3">
                  <Link href="#" className="text-primary hover:underline">
                    高校1年生のCさん
                  </Link>
                  <p className="text-sm text-gray-600">物理・化学 | 東京都渋谷区</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}