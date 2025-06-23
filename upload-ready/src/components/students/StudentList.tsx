'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface Student {
  id: string
  slug: string
  displayName: string
  grade: string
  subjects: string
  budget: number | null
  prefecture: string
  city: string
  nearestStation: string | null
  description: string
  createdAt: string
}

interface StudentListProps {
  initialStudents: Student[]
}

export function StudentList({ initialStudents }: StudentListProps) {
  const searchParams = useSearchParams()
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(initialStudents)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const filterStudents = () => {
      setLoading(true)
      
      let filtered = [...initialStudents]
      
      // Search filter
      const search = searchParams.get('search')?.toLowerCase()
      if (search) {
        filtered = filtered.filter(student => 
          student.displayName.toLowerCase().includes(search) ||
          student.description.toLowerCase().includes(search)
        )
      }
      
      // Prefecture filter
      const prefecture = searchParams.get('prefecture')
      if (prefecture) {
        filtered = filtered.filter(student => student.prefecture === prefecture)
      }
      
      // Subject filter
      const subject = searchParams.get('subject')
      if (subject) {
        filtered = filtered.filter(student => {
          const subjects = JSON.parse(student.subjects || '[]')
          return subjects.includes(subject)
        })
      }
      
      // Grade filter
      const grade = searchParams.get('grade')
      if (grade) {
        filtered = filtered.filter(student => student.grade.includes(grade))
      }
      
      // Budget filter
      const budgetMin = parseInt(searchParams.get('budgetMin') || '0')
      const budgetMax = parseInt(searchParams.get('budgetMax') || '999999')
      
      if (budgetMin > 0 || budgetMax < 999999) {
        filtered = filtered.filter(student => {
          if (!student.budget) return false
          return student.budget >= budgetMin && student.budget <= budgetMax
        })
      }
      
      setFilteredStudents(filtered)
      setLoading(false)
    }

    // Debounce filtering
    const timeoutId = setTimeout(filterStudents, 300)
    return () => clearTimeout(timeoutId)
  }, [searchParams, initialStudents])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (filteredStudents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">条件に一致する生徒が見つかりませんでした。</p>
        <Link 
          href="/students"
          className="text-primary hover:underline"
        >
          すべての生徒を見る
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results count */}
      <div className="text-sm text-gray-600">
        {filteredStudents.length}件の生徒が見つかりました
      </div>

      {/* Student cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredStudents.map((student) => {
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
    </div>
  )
}