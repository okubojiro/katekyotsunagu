import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync, readFileSync } from 'fs'
import { join } from 'path'

function generateSlug(name: string, grade?: string): string {
  const clean = name.replace(/[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3400-\u4DBFa-zA-Z0-9]/g, '')
  const gradeClean = grade ? grade.replace(/[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '') : ''
  return `${gradeClean}-${clean}-${Date.now()}`.toLowerCase()
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string

    if (!file || !type) {
      return NextResponse.json({ error: 'ファイルまたはタイプが指定されていません' }, { status: 400 })
    }

    const csvText = await file.text()
    const lines = csvText.trim().split('\n')
    const headers = lines[0].split(',').map(h => h.trim())
    const dataLines = lines.slice(1)

    let newData: any[] = []

    if (type === 'students') {
      newData = dataLines.map((line, index) => {
        const values = line.split(',').map(v => v.trim())
        const subjectsArray = values[2] ? values[2].split('・').map(s => s.trim()) : []
        
        return {
          id: (index + 100).toString(),
          slug: generateSlug(values[0], values[1]),
          displayName: values[0] || '',
          grade: values[1] || '',
          subjects: JSON.stringify(subjectsArray),
          budget: values[3] ? parseInt(values[3]) : null,
          prefecture: values[4] || '',
          city: values[5] || '',
          nearestStation: values[6] || null,
          description: values[7] || '',
          createdAt: new Date().toISOString(),
          isActive: true
        }
      })
    } else if (type === 'teachers') {
      newData = dataLines.map((line, index) => {
        const values = line.split(',').map(v => v.trim())
        const subjectsArray = values[3] ? values[3].split('・').map(s => s.trim()) : []
        
        return {
          id: (index + 100).toString(),
          name: values[0] || '',
          bio: values[1] || '',
          hourlyRate: values[2] ? parseInt(values[2]) : 0,
          subjects: subjectsArray,
          experience: values[4] ? parseInt(values[4]) : 0,
          education: values[5] || '',
          prefecture: values[6] || '',
          city: values[7] || '',
          availability: values[8] || '',
          rating: 4.5,
          totalReviews: Math.floor(Math.random() * 50) + 10
        }
      })
    }

    // sample-data.tsファイルを更新
    const sampleDataPath = join(process.cwd(), 'src/lib/sample-data.ts')
    const currentContent = readFileSync(sampleDataPath, 'utf-8')
    
    let updatedContent: string
    
    if (type === 'students') {
      const newStudentsCode = `export const sampleStudents: Student[] = ${JSON.stringify(newData, null, 2)}`
      updatedContent = currentContent.replace(
        /export const sampleStudents: Student\[\] = \[[\s\S]*?\]/,
        newStudentsCode
      )
    } else {
      const newTeachersCode = `export const sampleTeachers: Teacher[] = ${JSON.stringify(newData, null, 2)}`
      updatedContent = currentContent.replace(
        /export const sampleTeachers: Teacher\[\] = \[[\s\S]*?\]/,
        newTeachersCode
      )
    }

    writeFileSync(sampleDataPath, updatedContent, 'utf-8')

    return NextResponse.json({ 
      success: true, 
      count: newData.length,
      message: `${newData.length}件の${type === 'students' ? '生徒' : '教師'}データを更新しました`
    })

  } catch (error) {
    console.error('CSV import error:', error)
    return NextResponse.json({ error: 'インポート処理中にエラーが発生しました' }, { status: 500 })
  }
}