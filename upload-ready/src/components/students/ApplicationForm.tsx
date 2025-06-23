'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ApplicationFormProps {
  studentSlug: string
  studentName: string
  subjects: string[]
  budget?: number
}

export function ApplicationForm({ studentSlug, studentName, subjects, budget }: ApplicationFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    teacherName: '',
    teacherEmail: '',
    teacherPhone: '',
    experience: '',
    subjects: subjects,
    proposedRate: budget || 2500,
    message: '',
    schedule: {
      weekdays: '',
      weekends: ''
    },
    transportation: [] as string[],
    transportationNotes: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/student-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentSlug,
          ...formData
        }),
      })

      const result = await response.json()

      if (response.ok) {
        alert(result.message)
        router.push(`/students/${studentSlug}`)
      } else {
        alert(result.error || '応募の送信に失敗しました')
      }
    } catch (error) {
      console.error('Application submission error:', error)
      alert('応募の送信中にエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleScheduleChange = (type: 'weekdays' | 'weekends', value: string) => {
    setFormData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [type]: value
      }
    }))
  }

  const handleTransportationChange = (method: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      transportation: checked 
        ? [...prev.transportation, method]
        : prev.transportation.filter(t => t !== method)
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
              value={formData.teacherName}
              onChange={(e) => handleInputChange('teacherName', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">メールアドレス *</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="teacher@example.com"
              value={formData.teacherEmail}
              onChange={(e) => handleInputChange('teacherEmail', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">電話番号</label>
            <input 
              type="tel" 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="090-1234-5678"
              value={formData.teacherPhone}
              onChange={(e) => handleInputChange('teacherPhone', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">指導経験年数</label>
            <select 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
            >
              <option value="">未選択</option>
              <option value="未経験">未経験</option>
              <option value="1年未満">1年未満</option>
              <option value="1-2年">1-2年</option>
              <option value="3-5年">3-5年</option>
              <option value="5年以上">5年以上</option>
            </select>
          </div>
        </div>
      </div>

      {/* Teaching Subjects */}
      <div>
        <h3 className="text-lg font-semibold mb-4">指導可能科目</h3>
        <div className="space-y-2">
          {subjects.map((subject, index) => (
            <label key={index} className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2 rounded border-gray-300 text-primary focus:ring-primary"
                checked={formData.subjects.includes(subject)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleInputChange('subjects', [...formData.subjects, subject])
                  } else {
                    handleInputChange('subjects', formData.subjects.filter(s => s !== subject))
                  }
                }}
              />
              <span>{subject}</span>
              <span className="ml-2 text-sm text-gray-500">(生徒希望科目)</span>
            </label>
          ))}
        </div>
      </div>

      {/* Proposed Rate */}
      <div>
        <h3 className="text-lg font-semibold mb-4">提案時給</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">
              希望時給 {budget && `(生徒希望: ${budget.toLocaleString()}円)`}
            </label>
            <div className="flex items-center">
              <input 
                type="number" 
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.proposedRate}
                onChange={(e) => handleInputChange('proposedRate', parseInt(e.target.value))}
                min="1000"
                max="10000"
              />
              <span className="ml-2 text-gray-600">円/時</span>
            </div>
          </div>
        </div>
      </div>

      {/* Application Message */}
      <div>
        <h3 className="text-lg font-semibold mb-4">応募メッセージ *</h3>
        <textarea 
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          rows={6}
          placeholder="この生徒への指導に対する意気込みや、どのように指導していきたいかを具体的に書いてください。"
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          required
        ></textarea>
      </div>

      {/* Schedule */}
      <div>
        <h3 className="text-lg font-semibold mb-4">指導可能スケジュール</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">平日の指導可能時間</label>
            <select 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.schedule.weekdays}
              onChange={(e) => handleScheduleChange('weekdays', e.target.value)}
            >
              <option value="">選択してください</option>
              <option value="16:00-18:00">16:00-18:00</option>
              <option value="17:00-19:00">17:00-19:00</option>
              <option value="18:00-20:00">18:00-20:00</option>
              <option value="19:00-21:00">19:00-21:00</option>
              <option value="20:00-22:00">20:00-22:00</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">土日の指導可能時間</label>
            <select 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.schedule.weekends}
              onChange={(e) => handleScheduleChange('weekends', e.target.value)}
            >
              <option value="">選択してください</option>
              <option value="9:00-11:00">9:00-11:00</option>
              <option value="10:00-12:00">10:00-12:00</option>
              <option value="13:00-15:00">13:00-15:00</option>
              <option value="14:00-16:00">14:00-16:00</option>
              <option value="15:00-17:00">15:00-17:00</option>
              <option value="19:00-21:00">19:00-21:00</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transportation */}
      <div>
        <h3 className="text-lg font-semibold mb-4">交通手段・移動について</h3>
        <div className="space-y-3">
          {['電車・バス', '自転車', '車'].map((method) => (
            <label key={method} className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2 rounded border-gray-300 text-primary focus:ring-primary"
                checked={formData.transportation.includes(method)}
                onChange={(e) => handleTransportationChange(method, e.target.checked)}
              />
              <span>{method}での移動が可能</span>
            </label>
          ))}
        </div>
        <div className="mt-3">
          <label className="block text-sm font-medium mb-2">交通費について</label>
          <textarea 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows={2}
            placeholder="交通費の希望や、移動時間についてご記入ください"
            value={formData.transportationNotes}
            onChange={(e) => handleInputChange('transportationNotes', e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button 
          type="button"
          onClick={() => router.back()}
          className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-300 transition-colors"
          disabled={loading}
        >
          戻る
        </button>
        <button 
          type="submit"
          className="flex-1 bg-primary text-white py-3 px-6 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? '送信中...' : '応募する'}
        </button>
      </div>
    </form>
  )
}