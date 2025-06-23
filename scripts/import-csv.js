// ローカルCSVインポートスクリプト
const fs = require('fs')
const path = require('path')

function generateSlug(name, grade) {
  const clean = name.replace(/[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3400-\u4DBFa-zA-Z0-9]/g, '')
  const gradeClean = grade ? grade.replace(/[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '') : ''
  return `${gradeClean}-${clean}-${Date.now()}`.toLowerCase()
}

function importStudentsCSV(csvFilePath) {
  const csvContent = fs.readFileSync(csvFilePath, 'utf-8')
  const lines = csvContent.trim().split('\n')
  const dataLines = lines.slice(1) // ヘッダーをスキップ

  const newStudents = dataLines.map((line, index) => {
    const values = line.split(',').map(v => v.trim())
    const subjectsArray = values[2] ? values[2].split('・').map(s => s.trim()) : []
    
    return {
      id: (Date.now() + index).toString(),
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

  updateSampleDataFile('students', newStudents)
  console.log(`${newStudents.length}件の生徒データを更新しました`)
}

function importTeachersCSV(csvFilePath) {
  const csvContent = fs.readFileSync(csvFilePath, 'utf-8')
  const lines = csvContent.trim().split('\n')
  const dataLines = lines.slice(1)

  const newTeachers = dataLines.map((line, index) => {
    const values = line.split(',').map(v => v.trim())
    const subjectsArray = values[3] ? values[3].split('・').map(s => s.trim()) : []
    
    return {
      id: (Date.now() + index).toString(),
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

  updateSampleDataFile('teachers', newTeachers)
  console.log(`${newTeachers.length}件の教師データを更新しました`)
}

function updateSampleDataFile(type, newData) {
  const sampleDataPath = path.join(__dirname, '../src/lib/sample-data.ts')
  const currentContent = fs.readFileSync(sampleDataPath, 'utf-8')
  
  let updatedContent
  
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

  fs.writeFileSync(sampleDataPath, updatedContent, 'utf-8')
}

// 使用方法
const [,, type, csvPath] = process.argv

if (!type || !csvPath) {
  console.log('使用方法: node import-csv.js [students|teachers] [CSVファイルパス]')
  console.log('例: node import-csv.js students students.csv')
  process.exit(1)
}

if (type === 'students') {
  importStudentsCSV(csvPath)
} else if (type === 'teachers') {
  importTeachersCSV(csvPath)
} else {
  console.log('typeは "students" または "teachers" を指定してください')
}