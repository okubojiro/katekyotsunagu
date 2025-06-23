// データベースを使わない場合の初期データ
// 本番では Prisma + PostgreSQL を使用

export interface Student {
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
  isActive: boolean
  preferredGender?: string
  viewCount?: number
}

export interface Teacher {
  id: string
  name: string
  bio: string
  hourlyRate: number
  subjects: string[]
  experience: number
  education: string
  prefecture: string
  city: string
  availability: string
  rating: number
  totalReviews: number
  profileImage?: string
}

export const sampleStudents: Student[] = [
  {
    id: "1",
    slug: "chugaku2-tokyo-math-english",
    displayName: "中学2年生のAさん",
    grade: "中学2年生",
    subjects: JSON.stringify(["数学", "英語"]),
    budget: 2500,
    prefecture: "東京都",
    city: "新宿区",
    nearestStation: "新宿駅",
    description: "数学と英語の成績向上を目指しています。定期テストの点数アップと受験対策をお願いします。優しく丁寧に教えてくださる先生を希望します。",
    createdAt: "2024-06-20T00:00:00.000Z",
    isActive: true
  },
  {
    id: "2", 
    slug: "kouko1-kanagawa-physics-chemistry",
    displayName: "高校1年生のBさん",
    grade: "高校1年生",
    subjects: JSON.stringify(["物理", "化学", "数学"]),
    budget: 3000,
    prefecture: "神奈川県",
    city: "横浜市",
    nearestStation: "横浜駅",
    description: "理系科目全般が苦手です。特に物理の基礎から教えてもらいたいです。将来は理系大学への進学を考えています。",
    createdAt: "2024-06-19T00:00:00.000Z",
    isActive: true
  },
  {
    id: "3",
    slug: "shogaku6-saitama-sansu-kokugo", 
    displayName: "小学6年生のCさん",
    grade: "小学6年生",
    subjects: JSON.stringify(["算数", "国語"]),
    budget: 2000,
    prefecture: "埼玉県",
    city: "さいたま市",
    nearestStation: "大宮駅",
    description: "中学受験に向けて基礎学力を向上させたいです。算数の応用問題と国語の読解力を重点的にお願いします。",
    createdAt: "2024-06-18T00:00:00.000Z", 
    isActive: true
  },
  {
    id: "4",
    slug: "chugaku3-chiba-english-social",
    displayName: "中学3年生のDさん",
    grade: "中学3年生", 
    subjects: JSON.stringify(["英語", "国語", "社会"]),
    budget: 2800,
    prefecture: "千葉県",
    city: "千葉市",
    nearestStation: "千葉駅",
    description: "高校受験対策をお願いします。特に英語の長文読解と社会の暗記方法を教えてもらいたいです。",
    createdAt: "2024-06-17T00:00:00.000Z",
    isActive: true
  },
  {
    id: "5",
    slug: "kouko2-tokyo-math3-physics",
    displayName: "高校2年生のEさん", 
    grade: "高校2年生",
    subjects: JSON.stringify(["数学III", "物理", "英語"]),
    budget: 3500,
    prefecture: "東京都",
    city: "渋谷区", 
    nearestStation: "渋谷駅",
    description: "大学受験に向けた高度な内容をお願いします。数学IIIと物理の難しい問題に対応できる先生を探しています。",
    createdAt: "2024-06-16T00:00:00.000Z",
    isActive: true
  }
]

export const sampleTeachers: Teacher[] = [
  {
    id: "1",
    name: "田中 太郎",
    bio: "東京大学工学部卒業。中学・高校数学、物理の指導に10年の経験があります。",
    hourlyRate: 3000,
    subjects: ["数学", "物理", "化学"],
    experience: 10,
    education: "東京大学工学部",
    prefecture: "東京都",
    city: "新宿区",
    availability: "平日夕方、土日",
    rating: 4.8,
    totalReviews: 45
  },
  {
    id: "2", 
    name: "佐藤 花子",
    bio: "早稲田大学文学部卒業。国語・英語を中心に、楽しく分かりやすい授業を心がけています。",
    hourlyRate: 2800,
    subjects: ["国語", "英語", "社会"],
    experience: 8,
    education: "早稲田大学文学部",
    prefecture: "東京都", 
    city: "世田谷区",
    availability: "平日夜、土日",
    rating: 4.9,
    totalReviews: 38
  },
  {
    id: "3",
    name: "鈴木 一郎", 
    bio: "慶應義塾大学理工学部卒業。理系科目全般の指導が可能です。受験対策に強みがあります。",
    hourlyRate: 3200,
    subjects: ["数学", "物理", "化学"],
    experience: 12,
    education: "慶應義塾大学理工学部",
    prefecture: "神奈川県",
    city: "横浜市",
    availability: "平日夕方、土日午前",
    rating: 4.7,
    totalReviews: 52
  }
]

// フィルタリング用のヘルパー関数
export function getStudentsByPrefecture(prefecture: string): Student[] {
  return sampleStudents.filter(student => student.prefecture === prefecture)
}

export function getStudentsBySubject(subject: string): Student[] {
  return sampleStudents.filter(student => {
    const subjects = JSON.parse(student.subjects || '[]')
    return subjects.includes(subject)
  })
}

export function getTeachersByPrefecture(prefecture: string): Teacher[] {
  return sampleTeachers.filter(teacher => teacher.prefecture === prefecture)
}

export function getTeachersBySubject(subject: string): Teacher[] {
  return sampleTeachers.filter(teacher => teacher.subjects.includes(subject))
}