'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface StudentFiltersProps {
  prefectures: string[]
  subjects: string[]
  totalCount: number
}

export function StudentFilters({ prefectures, subjects, totalCount }: StudentFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState({
    prefecture: searchParams.get('prefecture') || '',
    subject: searchParams.get('subject') || '',
    grade: searchParams.get('grade') || '',
    budgetMin: searchParams.get('budgetMin') || '',
    budgetMax: searchParams.get('budgetMax') || '',
    search: searchParams.get('search') || ''
  })

  const updateURL = (newFilters: typeof filters) => {
    const params = new URLSearchParams()
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      }
    })
    
    const newURL = params.toString() ? `/students?${params.toString()}` : '/students'
    router.push(newURL)
  }

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    updateURL(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      prefecture: '',
      subject: '',
      grade: '',
      budgetMin: '',
      budgetMax: '',
      search: ''
    }
    setFilters(clearedFilters)
    router.push('/students')
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== '')

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">絞り込み検索</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-primary"
          >
            すべてクリア
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* Search */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">キーワード検索</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="生徒名、説明文で検索"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Prefecture */}
        <div>
          <label className="block text-sm font-medium mb-2">都道府県</label>
          <select
            value={filters.prefecture}
            onChange={(e) => handleFilterChange('prefecture', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">すべて</option>
            {prefectures.map((prefecture) => (
              <option key={prefecture} value={prefecture}>
                {prefecture}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium mb-2">科目</label>
          <select
            value={filters.subject}
            onChange={(e) => handleFilterChange('subject', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">すべて</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* Grade */}
        <div>
          <label className="block text-sm font-medium mb-2">学年</label>
          <select
            value={filters.grade}
            onChange={(e) => handleFilterChange('grade', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">すべて</option>
            <option value="小学">小学生</option>
            <option value="中学">中学生</option>
            <option value="高校">高校生</option>
            <option value="浪人">浪人生</option>
            <option value="大学">大学生</option>
            <option value="社会人">社会人</option>
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium mb-2">時給 (円)</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={filters.budgetMin}
              onChange={(e) => handleFilterChange('budgetMin', e.target.value)}
              placeholder="最低"
              min="0"
              className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
            <span className="text-gray-500 self-center">〜</span>
            <input
              type="number"
              value={filters.budgetMax}
              onChange={(e) => handleFilterChange('budgetMax', e.target.value)}
              placeholder="最高"
              min="0"
              className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">適用中の条件:</span>
            {filters.search && (
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                「{filters.search}」で検索
              </span>
            )}
            {filters.prefecture && (
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                {filters.prefecture}
              </span>
            )}
            {filters.subject && (
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                {filters.subject}
              </span>
            )}
            {filters.grade && (
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                {filters.grade}生
              </span>
            )}
            {(filters.budgetMin || filters.budgetMax) && (
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                時給 {filters.budgetMin || '0'}円〜{filters.budgetMax || '∞'}円
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}