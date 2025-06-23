import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// 応募データのバリデーション
const applicationSchema = z.object({
  studentSlug: z.string().min(1),
  teacherName: z.string().min(1),
  teacherEmail: z.string().email(),
  teacherPhone: z.string().optional(),
  experience: z.string().optional(),
  subjects: z.array(z.string()),
  proposedRate: z.number().min(1000).max(10000).optional(),
  message: z.string().min(10),
  schedule: z.object({
    weekdays: z.string().optional(),
    weekends: z.string().optional()
  }).optional(),
  transportation: z.array(z.string()).optional(),
  transportationNotes: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // バリデーション
    const validatedData = applicationSchema.parse(body)
    
    // 生徒が存在するかチェック
    const student = await prisma.studentProfile.findUnique({
      where: { slug: validatedData.studentSlug, isActive: true }
    })
    
    if (!student) {
      return NextResponse.json(
        { error: '指定された生徒が見つかりません' },
        { status: 404 }
      )
    }
    
    // 応募データを保存
    const application = await prisma.teacherApplication.create({
      data: {
        studentId: student.id,
        teacherId: 'temp-teacher-id', // 実際の実装では認証されたユーザーIDを使用
        jobId: 'temp-job-id', // 関連する求人があれば
        message: validatedData.message,
        proposedRate: validatedData.proposedRate,
        status: 'PENDING'
      }
    })
    
    // 実際の実装では以下も行う：
    // 1. 生徒・保護者にメール通知
    // 2. 管理者に通知
    // 3. 応募者に確認メール送信
    
    // TODO: メール通知の実装
    console.log('New application submitted:', {
      applicationId: application.id,
      studentName: student.displayName,
      teacherEmail: validatedData.teacherEmail
    })
    
    return NextResponse.json({
      success: true,
      applicationId: application.id,
      message: '応募を受け付けました。審査結果をお待ちください。'
    })
    
  } catch (error) {
    console.error('Application submission error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '入力データが正しくありません', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: '応募の処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')
    const teacherId = searchParams.get('teacherId')
    const status = searchParams.get('status')
    
    let where: any = {}
    
    if (studentId) {
      where.studentId = studentId
    }
    
    if (teacherId) {
      where.teacherId = teacherId
    }
    
    if (status) {
      where.status = status
    }
    
    const applications = await prisma.teacherApplication.findMany({
      where,
      include: {
        student: {
          select: {
            displayName: true,
            grade: true,
            prefecture: true,
            city: true,
            subjects: true,
            budget: true
          }
        },
        teacher: {
          select: {
            name: true,
            email: true
          }
        },
        job: {
          select: {
            title: true,
            hourlyRate: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json({ applications })
    
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: '応募情報の取得中にエラーが発生しました' },
      { status: 500 }
    )
  }
}