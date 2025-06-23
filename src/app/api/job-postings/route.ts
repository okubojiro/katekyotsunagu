import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// 求人投稿データのバリデーション
const jobPostingSchema = z.object({
  // 生徒情報
  grade: z.string().min(1),
  displayName: z.string().min(1),
  
  // 求人基本情報
  title: z.string().min(1),
  subjects: z.array(z.string()).min(1),
  hourlyRate: z.number().min(1000).max(10000).optional(),
  
  // 場所
  prefecture: z.string().min(1),
  city: z.string().min(1),
  nearestStation: z.string().optional(),
  
  // 詳細
  description: z.string().min(10),
  requirements: z.string().optional(),
  schedule: z.object({
    frequency: z.string().optional(),
    duration: z.string().optional(),
    timeSlots: z.string().optional()
  }).optional(),
  deadline: z.string().optional(),
  
  // 連絡先
  parentName: z.string().min(1),
  parentEmail: z.string().email(),
  parentPhone: z.string().optional(),
  
  // その他条件
  preferredGender: z.string().optional(),
  experienceRequired: z.boolean().optional(),
  universityStudentOk: z.boolean().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // バリデーション
    const validatedData = jobPostingSchema.parse(body)
    
    // SlugとDisplayNameを生成
    const slug = `${validatedData.grade.replace(/[年生]/g, '')}-${validatedData.city}-${Date.now()}`
    
    // 生徒プロフィールを作成
    const studentProfile = await prisma.studentProfile.create({
      data: {
        slug: slug,
        displayName: validatedData.displayName,
        grade: validatedData.grade,
        subjects: JSON.stringify(validatedData.subjects),
        budget: validatedData.hourlyRate,
        prefecture: validatedData.prefecture,
        city: validatedData.city,
        nearestStation: validatedData.nearestStation,
        description: validatedData.description,
        preferredGender: validatedData.preferredGender,
        preferredSchedule: JSON.stringify(validatedData.schedule || {}),
        contactInfo: JSON.stringify({
          parentName: validatedData.parentName,
          parentEmail: validatedData.parentEmail,
          parentPhone: validatedData.parentPhone
        }),
        isActive: true
      }
    })
    
    // 求人投稿を作成
    const jobPosting = await prisma.jobPosting.create({
      data: {
        studentId: studentProfile.id,
        title: validatedData.title,
        subjects: JSON.stringify(validatedData.subjects),
        hourlyRate: validatedData.hourlyRate,
        prefecture: validatedData.prefecture,
        city: validatedData.city,
        nearestStation: validatedData.nearestStation,
        description: validatedData.description,
        requirements: validatedData.requirements,
        schedule: JSON.stringify(validatedData.schedule || {}),
        deadline: validatedData.deadline ? new Date(validatedData.deadline) : null,
        status: 'ACTIVE'
      }
    })
    
    // 実際の実装では以下も行う：
    // 1. 管理者に新規投稿通知
    // 2. 投稿者に確認メール
    // 3. 条件に合う教師にマッチング通知
    
    console.log('New job posting created:', {
      studentId: studentProfile.id,
      jobId: jobPosting.id,
      title: validatedData.title
    })
    
    return NextResponse.json({
      success: true,
      studentSlug: studentProfile.slug,
      jobId: jobPosting.id,
      message: '求人を投稿しました。条件に合う教師からの応募をお待ちください。'
    })
    
  } catch (error) {
    console.error('Job posting creation error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '入力データが正しくありません', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: '求人投稿の処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'ACTIVE'
    const prefecture = searchParams.get('prefecture')
    const subject = searchParams.get('subject')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    let where: any = { status }
    
    if (prefecture) {
      where.prefecture = prefecture
    }
    
    if (subject) {
      where.subjects = {
        contains: subject
      }
    }
    
    const [jobPostings, total] = await Promise.all([
      prisma.jobPosting.findMany({
        where,
        include: {
          student: {
            select: {
              displayName: true,
              grade: true,
              subjects: true,
              budget: true,
              nearestStation: true
            }
          },
          applications: {
            select: {
              id: true,
              status: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.jobPosting.count({ where })
    ])
    
    return NextResponse.json({
      jobPostings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
    
  } catch (error) {
    console.error('Error fetching job postings:', error)
    return NextResponse.json(
      { error: '求人情報の取得中にエラーが発生しました' },
      { status: 500 }
    )
  }
}