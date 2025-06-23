'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null)
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      setIsAuthenticated(true)
    } else {
      router.push('/admin/login')
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">認証確認中...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleImport = async (type: 'students' | 'teachers') => {
    if (!file) return

    setImporting(true)
    setResult(null)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)

    try {
      const response = await fetch('/api/import-csv', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      
      if (response.ok) {
        setResult(`成功: ${data.count}件のデータを更新しました`)
      } else {
        setResult(`エラー: ${data.error}`)
      }
    } catch (error) {
      setResult(`エラー: ${error}`)
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">データインポート</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">CSVファイルアップロード</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            CSVファイルを選択
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {file && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-4">
              選択ファイル: {file.name}
            </p>
            
            <div className="flex gap-4">
              <button
                onClick={() => handleImport('students')}
                disabled={importing}
                className="btn btn-primary"
              >
                {importing ? '処理中...' : '生徒データとして取込'}
              </button>
              
              <button
                onClick={() => handleImport('teachers')}
                disabled={importing}
                className="btn btn-primary"
              >
                {importing ? '処理中...' : '教師データとして取込'}
              </button>
            </div>
          </div>
        )}

        {result && (
          <div className={`p-4 rounded-md ${result.includes('成功') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {result}
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-3">CSVフォーマット</h3>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-700">生徒データ</h4>
            <code className="text-xs bg-gray-100 p-2 rounded block mt-2">
              displayName,grade,subjects,budget,prefecture,city,nearestStation,description
            </code>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700">教師データ</h4>
            <code className="text-xs bg-gray-100 p-2 rounded block mt-2">
              name,bio,hourlyRate,subjects,experience,education,prefecture,city,availability
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}