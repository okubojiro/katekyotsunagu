import Link from 'next/link'
import { StudentFilters } from '@/components/students/StudentFilters'
import { StudentList } from '@/components/students/StudentList'
import { sampleStudents } from '@/lib/sample-data'

// 静的ビルド用の関数
function getStudents() {
  return sampleStudents.filter(student => student.isActive)
}

function getFilterOptions() {
  const students = getStudents()
  
  // 都道府県の重複を除去
  const prefectures = [...new Set(students.map(s => s.prefecture))]
  
  // 科目の重複を除去
  const allSubjects = new Set<string>()
  students.forEach(student => {
    try {
      const subjects = JSON.parse(student.subjects || '[]')
      subjects.forEach((subject: string) => allSubjects.add(subject))
    } catch (e) {
      // Skip invalid JSON
    }
  })

  return {
    prefectures,
    subjects: Array.from(allSubjects).sort()
  }
}

export default function StudentsPage() {
  const students = getStudents()
  const filterOptions = getFilterOptions()

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

      {/* Header */}
      <div className="bg-white py-8 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            生徒を探す
          </h1>
          <p className="text-gray-600">
            家庭教師を必要としている生徒さんを探して、直接応募することができます
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        {/* Filters */}
        <StudentFilters 
          prefectures={filterOptions.prefectures}
          subjects={filterOptions.subjects}
          totalCount={students.length}
        />

        {/* Students List */}
        <StudentList initialStudents={students} />
      </div>
    </div>
  )
}