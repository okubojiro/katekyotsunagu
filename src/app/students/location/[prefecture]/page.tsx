import Link from 'next/link'
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'

const prisma = new PrismaClient()

// 都道府県の一覧
const PREFECTURES = [
  '東京都', '神奈川県', '埼玉県', '千葉県', '茨城県', '栃木県', '群馬県',
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
]

import { sampleStudents } from '@/lib/sample-data'

function getStudentsByPrefecture(prefecture: string) {
  return sampleStudents.filter(student => 
    student.prefecture === prefecture && student.isActive
  )
}

function getCitiesByPrefecture(prefecture: string) {
  const students = getStudentsByPrefecture(prefecture)
  const cities = [...new Set(students.map(s => s.city))]
  return cities
}

interface Props {
  params: { prefecture: string }
}

export default function PrefectureStudentsPage({ params }: Props) {
  const prefecture = decodeURIComponent(params.prefecture)
  
  // 有効な都道府県かチェック
  if (!PREFECTURES.includes(prefecture)) {
    notFound()
  }

  const students = getStudentsByPrefecture(prefecture)
  const cities = getCitiesByPrefecture(prefecture)

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
              <Link href="/students" className="text-primary font-medium">
                生徒を探す
              </Link>
              <Link href="/post-job" className="bg-primary text-white px-4 py-2 rounded-md">
                求人を投稿
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/students" className="hover:text-primary">生徒一覧</Link>
            <span>/</span>
            <span className="text-gray-900">{prefecture}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white py-8 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {prefecture}の生徒一覧
          </h1>
          <p className="text-gray-600">
            {prefecture}で家庭教師を募集している生徒さん一覧です（{students.length}件）
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - City Filter */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">市区町村で絞り込み</h3>
              <div className="space-y-2">
                <Link 
                  href={`/students/${encodeURIComponent(prefecture)}`}
                  className="block text-gray-600 hover:text-primary"
                >
                  すべて ({students.length})
                </Link>
                {cities.map((city) => {
                  const cityCount = students.filter(s => s.city === city).length
                  return (
                    <Link 
                      key={city}
                      href={`/students/${encodeURIComponent(prefecture)}/${encodeURIComponent(city)}`}
                      className="block text-gray-600 hover:text-primary"
                    >
                      {city} ({cityCount})
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Subject Filter */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">科目で絞り込み</h3>
              <div className="space-y-2">
                <Link 
                  href={`/students/subject/数学?prefecture=${encodeURIComponent(prefecture)}`}
                  className="block text-gray-600 hover:text-primary"
                >
                  数学
                </Link>
                <Link 
                  href={`/students/subject/英語?prefecture=${encodeURIComponent(prefecture)}`}
                  className="block text-gray-600 hover:text-primary"
                >
                  英語
                </Link>
                <Link 
                  href={`/students/subject/国語?prefecture=${encodeURIComponent(prefecture)}`}
                  className="block text-gray-600 hover:text-primary"
                >
                  国語
                </Link>
                <Link 
                  href={`/students/subject/理科?prefecture=${encodeURIComponent(prefecture)}`}
                  className="block text-gray-600 hover:text-primary"
                >
                  理科
                </Link>
                <Link 
                  href={`/students/subject/社会?prefecture=${encodeURIComponent(prefecture)}`}
                  className="block text-gray-600 hover:text-primary"
                >
                  社会
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {students.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-600">現在、{prefecture}で募集中の生徒はいません。</p>
                <Link 
                  href="/students"
                  className="text-primary hover:underline mt-4 inline-block"
                >
                  全ての生徒を見る
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {students.map((student) => {
                  const subjects = JSON.parse(student.subjects || '[]')
                  
                  return (
                    <div key={student.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {student.displayName}
                          </h3>
                          <div className="flex gap-2 mb-2">
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                              {student.grade}
                            </span>
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                              {student.city}
                            </span>
                          </div>
                        </div>
                        {student.budget && (
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary">
                              時給 {student.budget.toLocaleString()}円
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Subjects */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">希望科目</h4>
                        <div className="flex flex-wrap gap-2">
                          {subjects.map((subject: string, index: number) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-4">
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {student.description}
                        </p>
                      </div>

                      {/* Location & Station */}
                      <div className="mb-4 text-sm text-gray-600">
                        <p>📍 {student.prefecture}{student.city}</p>
                        {student.nearestStation && (
                          <p>🚉 最寄駅: {student.nearestStation}</p>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="text-sm text-gray-500">
                          投稿日: {new Date(student.createdAt).toLocaleDateString('ja-JP')}
                        </div>
                        <Link 
                          href={`/students/${student.slug}`}
                          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                        >
                          詳細を見る
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Generate static params for better SEO
export async function generateStaticParams() {
  return PREFECTURES.map((prefecture) => ({
    prefecture: encodeURIComponent(prefecture),
  }))
}