import Link from 'next/link'
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'

const prisma = new PrismaClient()

// 主要科目の一覧
const SUBJECTS = [
  '国語', '数学', '算数', '英語', '理科', '社会',
  '物理', '化学', '生物', '地学', '日本史', '世界史',
  '地理', '政治経済', '現代社会', '倫理', '数学I', '数学II',
  '数学III', '数学A', '数学B', '数学C', '古文', '漢文',
  '現代文', '小論文'
]

import { sampleStudents } from '@/lib/sample-data'

function getStudentsBySubject(subject: string, prefecture?: string) {
  return sampleStudents.filter(student => {
    if (!student.isActive) return false
    
    const subjects = JSON.parse(student.subjects || '[]')
    const hasSubject = subjects.includes(subject)
    
    if (prefecture) {
      return hasSubject && student.prefecture === prefecture
    }
    
    return hasSubject
  })
}

function getPrefecturesBySubject(subject: string) {
  const students = getStudentsBySubject(subject)
  const prefectures = [...new Set(students.map(s => s.prefecture))]
  return prefectures
}

interface Props {
  params: { subject: string }
  searchParams: { prefecture?: string }
}

export default function SubjectStudentsPage({ params }: { params: { subject: string } }) {
  const subject = decodeURIComponent(params.subject)
  // 静的ビルドのため、searchParamsは使用しない
  const prefecture = undefined
  
  // 有効な科目かチェック
  if (!SUBJECTS.includes(subject)) {
    notFound()
  }

  const students = getStudentsBySubject(subject, prefecture)
  const prefectures = getPrefecturesBySubject(subject)

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
            <span>科目別</span>
            <span>/</span>
            <span className="text-gray-900">{subject}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white py-8 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {prefecture ? `${prefecture}の` : ''}{subject}の指導を希望する生徒一覧
          </h1>
          <p className="text-gray-600">
            {prefecture ? `${prefecture}で` : ''}{subject}の家庭教師を募集している生徒さん一覧です（{students.length}件）
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Subject Filter */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">他の科目</h3>
              <div className="space-y-2">
                {SUBJECTS.filter(s => s !== subject).slice(0, 8).map((otherSubject) => (
                  <Link 
                    key={otherSubject}
                    href={`/students/subject/${encodeURIComponent(otherSubject)}`}
                    className="block text-gray-600 hover:text-primary text-sm"
                  >
                    {otherSubject}
                  </Link>
                ))}
                <Link 
                  href="/students"
                  className="block text-primary hover:underline text-sm mt-3"
                >
                  すべての科目を見る
                </Link>
              </div>
            </div>

            {/* Prefecture Filter */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">地域で絞り込み</h3>
              <div className="space-y-2">
                {prefectures.slice(0, 8).map((pref) => {
                  const prefectureCount = students.filter(s => s.prefecture === pref).length
                  return (
                    <Link 
                      key={pref}
                      href={`/students/subject/${encodeURIComponent(subject)}?prefecture=${encodeURIComponent(pref)}`}
                      className="block text-gray-600 hover:text-primary text-sm"
                    >
                      {pref} ({prefectureCount})
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Grade Filter */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">学年で絞り込み</h3>
              <div className="space-y-2">
                {['小学生', '中学生', '高校生'].map((grade) => {
                  const gradeCount = students.filter(s => s.grade.includes(grade.slice(0, 2))).length
                  return (
                    <div key={grade} className="text-gray-600 text-sm">
                      {grade} ({gradeCount})
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {students.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-600">現在、{subject}の指導を希望する生徒はいません。</p>
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
                              {student.prefecture}{student.city}
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
                          {subjects.map((studentSubject: string, index: number) => (
                            <span 
                              key={index} 
                              className={`px-2 py-1 rounded text-sm ${
                                studentSubject === subject 
                                  ? 'bg-primary text-white' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {studentSubject}
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
  return SUBJECTS.map((subject) => ({
    subject: encodeURIComponent(subject),
  }))
}