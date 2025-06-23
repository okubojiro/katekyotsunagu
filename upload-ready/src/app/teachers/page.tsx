import Link from 'next/link'
import { sampleTeachers } from '@/lib/sample-data'

export default function TeachersPage() {
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
              <Link href="/teachers" className="text-primary font-medium">
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

      {/* Header */}
      <div className="bg-white py-8 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            家庭教師を探す
          </h1>
          <p className="text-gray-600">
            条件に合った経験豊富な家庭教師を見つけて、指導依頼を送信しましょう
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 gap-6">
          {sampleTeachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {teacher.name}
                  </h3>
                  <div className="flex gap-2 mb-2">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                      {teacher.education}
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                      {teacher.prefecture}{teacher.city}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">
                    時給 {teacher.hourlyRate.toLocaleString()}円
                  </p>
                  <div className="text-sm text-gray-600">
                    ⭐ {teacher.rating} ({teacher.totalReviews}件)
                  </div>
                </div>
              </div>

              {/* Subjects */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">指導科目</h4>
                <div className="flex flex-wrap gap-2">
                  {teacher.subjects.map((subject, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div className="mb-4">
                <p className="text-gray-600 text-sm">
                  {teacher.bio}
                </p>
              </div>

              {/* Details */}
              <div className="mb-4 text-sm text-gray-600">
                <p>📍 {teacher.prefecture}{teacher.city}</p>
                <p>🕒 {teacher.availability}</p>
                <p>👨‍🏫 指導歴 {teacher.experience}年</p>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-500">
                  経験年数: {teacher.experience}年
                </div>
                <Link 
                  href={`/teachers/${teacher.id}`}
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  詳細を見る
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}