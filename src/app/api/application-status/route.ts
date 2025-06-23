import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// 応募状況更新のバリデーション
const statusUpdateSchema = z.object({
  applicationId: z.string().min(1),
  status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED']),
  adminNotes: z.string().optional()
})

// 応募状況の更新（承認・拒否）
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    
    // バリデーション
    const validatedData = statusUpdateSchema.parse(body)
    
    // 応募が存在するかチェック
    const application = await prisma.teacherApplication.findUnique({
      where: { id: validatedData.applicationId },
      include: {
        student: {
          select: {
            displayName: true,
            contactInfo: true
          }
        },
        teacher: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })
    
    if (!application) {
      return NextResponse.json(
        { error: '指定された応募が見つかりません' },
        { status: 404 }
      )
    }
    
    // 応募状況を更新
    const updatedApplication = await prisma.teacherApplication.update({
      where: { id: validatedData.applicationId },
      data: {
        status: validatedData.status,
        updatedAt: new Date()
      }
    })
    
    // マッチング成立時の処理
    if (validatedData.status === 'ACCEPTED') {
      // 実際の実装では以下を行う：
      // 1. 生徒・保護者に教師の連絡先を通知
      // 2. 教師に生徒の連絡先を通知
      // 3. 他の応募を自動的に拒否
      // 4. 求人をクローズ
      // 5. マッチング手数料の請求処理
      
      // 同じ生徒への他の応募を拒否
      await prisma.teacherApplication.updateMany({
        where: {
          studentId: application.studentId,
          id: { not: validatedData.applicationId },
          status: 'PENDING'
        },
        data: {
          status: 'REJECTED'
        }
      })
      
      // 関連する求人をクローズ
      await prisma.jobPosting.updateMany({
        where: {
          studentId: application.studentId,
          status: 'ACTIVE'
        },
        data: {
          status: 'FILLED'
        }
      })
      
      console.log('Match established:', {
        applicationId: validatedData.applicationId,
        studentName: application.student.displayName,
        teacherName: application.teacher.name
      })
    }
    
    // 実際の実装では以下も行う：
    // 1. 応募者に結果通知メール
    // 2. 生徒・保護者に状況更新通知
    // 3. 管理ログの記録
    
    return NextResponse.json({
      success: true,
      application: updatedApplication,
      message: `応募を${validatedData.status === 'ACCEPTED' ? '承認' : '拒否'}しました。`
    })
    
  } catch (error) {
    console.error('Status update error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '入力データが正しくありません', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: '応募状況の更新中にエラーが発生しました' },
      { status: 500 }
    )
  }
}

// 応募状況の詳細取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const applicationId = searchParams.get('applicationId')
    const studentId = searchParams.get('studentId')
    
    if (applicationId) {
      // 個別の応募詳細
      const application = await prisma.teacherApplication.findUnique({
        where: { id: applicationId },
        include: {
          student: {
            select: {
              displayName: true,
              grade: true,
              subjects: true,
              budget: true,
              prefecture: true,
              city: true,
              nearestStation: true,
              description: true,
              contactInfo: true
            }
          },
          teacher: {
            select: {
              name: true,
              email: true,
              teacherProfile: {
                select: {
                  subjects: true,
                  hourlyRate: true,
                  experience: true,
                  description: true
                }
              }
            }
          },
          job: {
            select: {
              title: true,
              description: true,
              requirements: true
            }
          }
        }
      })
      
      if (!application) {
        return NextResponse.json(
          { error: '指定された応募が見つかりません' },
          { status: 404 }
        )
      }
      
      return NextResponse.json({ application })
    }
    
    if (studentId) {
      // 特定の生徒への応募一覧
      const applications = await prisma.teacherApplication.findMany({
        where: { studentId },
        include: {
          teacher: {
            select: {
              name: true,
              email: true,
              teacherProfile: {
                select: {
                  subjects: true,
                  hourlyRate: true,
                  experience: true
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      
      return NextResponse.json({ applications })
    }
    
    // 全応募の概要（管理者用）
    const applications = await prisma.teacherApplication.findMany({
      include: {
        student: {
          select: {
            displayName: true,
            grade: true,
            prefecture: true,
            city: true
          }
        },
        teacher: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50 // 最新50件
    })
    
    const statusCounts = await prisma.teacherApplication.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    })
    
    return NextResponse.json({
      applications,
      statusCounts: statusCounts.reduce((acc, item) => {
        acc[item.status] = item._count.status
        return acc
      }, {} as Record<string, number>)
    })
    
  } catch (error) {
    console.error('Error fetching application status:', error)
    return NextResponse.json(
      { error: '応募状況の取得中にエラーが発生しました' },
      { status: 500 }
    )
  }
}