import Link from 'next/link'
import { sampleTeachers } from '@/lib/sample-data'

// 静的ビルド用の関数
export async function generateStaticParams() {
  return sampleTeachers.map((teacher) => ({
    id: teacher.id,
  }))
}

function getTeacher(id: string) {
  return sampleTeachers.find(teacher => teacher.id === id)
}

export default function TeacherDetailPage({ params }: { params: { id: string } }) {
  const teacher = getTeacher(params.id)

  if (!teacher) {
    return (
      <div className="min-h-screen bg-gray-50">
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
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">教師が見つかりません</h1>
          <Link href="/teachers" className="text-primary hover:underline">
            教師一覧に戻る
          </Link>
        </div>
      </div>
    )
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Teacher Profile */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {teacher.name}
                  </h1>
                  <div className="flex gap-2 mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded">
                      {teacher.education}
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded">
                      {teacher.prefecture}{teacher.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">⭐</span>
                      <span className="font-bold">{teacher.rating}</span>
                      <span className="text-gray-600 ml-1">({teacher.totalReviews}件)</span>
                    </div>
                    <div className="text-gray-600">
                      指導歴 {teacher.experience}年
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">
                    時給 {teacher.hourlyRate.toLocaleString()}円
                  </p>
                </div>
              </div>

              {/* Subjects */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">指導科目</h3>
                <div className="flex flex-wrap gap-2">
                  {teacher.subjects.map((subject, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">自己紹介・指導方針</h3>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {teacher.bio}
                </p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">基本情報</h4>
                  <div className="space-y-2 text-sm">
                    <p>📍 {teacher.prefecture}{teacher.city}</p>
                    <p>🎓 {teacher.education}</p>
                    <p>⏰ {teacher.availability}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">指導実績</h4>
                  <div className="space-y-2 text-sm">
                    <p>指導経験: {teacher.experience}年</p>
                    <p>評価: ⭐ {teacher.rating} ({teacher.totalReviews}件)</p>
                    <p>時給: {teacher.hourlyRate.toLocaleString()}円</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Request Button */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">この先生に依頼する</h3>
              <Link 
                href={`/teachers/${teacher.id}/request`}
                className="block w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors mb-4 text-center"
              >
                指導依頼を送る
              </Link>
              <p className="text-sm text-gray-600">
                依頼後、運営が教師に確認いたします
              </p>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">基本情報</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">時給</span>
                  <span className="font-semibold">{teacher.hourlyRate.toLocaleString()}円</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">指導経験</span>
                  <span className="font-semibold">{teacher.experience}年</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">評価</span>
                  <span className="font-semibold">⭐ {teacher.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">レビュー数</span>
                  <span className="font-semibold">{teacher.totalReviews}件</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-900">依頼の流れ</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>1. 指導依頼を送信</li>
                <li>2. 運営が教師に確認</li>
                <li>3. 教師の承諾後、連絡先交換</li>
                <li>4. 詳細なスケジュール相談</li>
                <li>5. 指導開始</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}