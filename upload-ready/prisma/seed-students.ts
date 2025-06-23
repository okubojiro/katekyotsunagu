import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Creating sample students...')

  const students = await prisma.studentProfile.createMany({
    data: [
      {
        slug: 'chugaku2-tokyo-a',
        displayName: '中学2年生のAさん',
        grade: '中学2年生',
        subjects: JSON.stringify(['数学', '英語']),
        budget: 2500,
        prefecture: '東京都',
        city: '新宿区',
        nearestStation: 'JR新宿駅',
        description: '数学と英語の成績向上を目指しています。特に数学の関数分野が苦手で、基礎から丁寧に教えてくださる先生を探しています。週2回程度、平日の夕方にお願いしたいです。',
        preferredGender: '女性',
        preferredSchedule: JSON.stringify({
          '月曜日': ['17:00-19:00'],
          '水曜日': ['17:00-19:00'],
          '土曜日': ['10:00-12:00', '14:00-16:00']
        })
      },
      {
        slug: 'kouko1-kanagawa-b',
        displayName: '高校1年生のBさん',
        grade: '高校1年生',
        subjects: JSON.stringify(['物理', '化学', '数学']),
        budget: 3000,
        prefecture: '神奈川県',
        city: '横浜市',
        nearestStation: 'JR横浜駅',
        description: '理系科目全般のサポートをお願いしたいです。特に物理の力学分野と化学の無機化学が難しく感じています。大学受験に向けて基礎固めをしたいと考えています。',
        preferredSchedule: JSON.stringify({
          '火曜日': ['19:00-21:00'],
          '木曜日': ['19:00-21:00'],
          '日曜日': ['13:00-15:00']
        })
      },
      {
        slug: 'shogaku6-saitama-c',
        displayName: '小学6年生のCさん',
        grade: '小学6年生',
        subjects: JSON.stringify(['算数', '国語']),
        budget: 2000,
        prefecture: '埼玉県',
        city: 'さいたま市',
        nearestStation: '大宮駅',
        description: '中学受験に向けて算数と国語の指導をお願いします。特に算数の文章題と図形問題が苦手です。優しく丁寧に教えてくださる先生を希望しています。',
        preferredGender: '女性',
        preferredSchedule: JSON.stringify({
          '月曜日': ['16:00-18:00'],
          '金曜日': ['16:00-18:00'],
          '土曜日': ['10:00-12:00']
        })
      },
      {
        slug: 'chugaku3-chiba-d',
        displayName: '中学3年生のDさん',
        grade: '中学3年生',
        subjects: JSON.stringify(['英語', '国語', '社会']),
        budget: 2800,
        prefecture: '千葉県',
        city: '千葉市',
        nearestStation: 'JR千葉駅',
        description: '高校受験に向けて文系科目の底上げを図りたいです。特に英語の長文読解と国語の古文が苦手分野です。週2-3回の指導をお願いしたいと思っています。',
        preferredSchedule: JSON.stringify({
          '月曜日': ['19:00-21:00'],
          '水曜日': ['19:00-21:00'],
          '土曜日': ['14:00-16:00']
        })
      },
      {
        slug: 'kouko2-tokyo-e',
        displayName: '高校2年生のEさん',
        grade: '高校2年生',
        subjects: JSON.stringify(['数学III', '物理', '英語']),
        budget: 3500,
        prefecture: '東京都',
        city: '渋谷区',
        description: '難関大学の理系学部を目指しています。数学IIIの積分・微分と物理の電磁気学分野の理解を深めたいです。英語は長文読解力の向上が目標です。',
        nearestStation: 'JR渋谷駅',
        preferredSchedule: JSON.stringify({
          '火曜日': ['20:00-22:00'],
          '金曜日': ['20:00-22:00'],
          '日曜日': ['15:00-17:00']
        })
      }
    ]
  })

  console.log(`Created ${students.count} students`)

  // Create some job postings
  console.log('Creating sample job postings...')

  const studentProfiles = await prisma.studentProfile.findMany()
  
  for (const student of studentProfiles.slice(0, 3)) {
    await prisma.jobPosting.create({
      data: {
        studentId: student.id,
        title: `${student.grade}への${JSON.parse(student.subjects)[0]}指導`,
        subjects: student.subjects,
        hourlyRate: student.budget,
        prefecture: student.prefecture,
        city: student.city,
        nearestStation: student.nearestStation,
        description: `${student.description}\n\n【指導条件】\n・週2回程度\n・1回2時間\n・丁寧で分かりやすい指導\n・生徒のペースに合わせた指導`,
        requirements: '大学生または社会人、指導経験者優遇',
        schedule: student.preferredSchedule,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      }
    })
  }

  console.log('Sample data creation completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })