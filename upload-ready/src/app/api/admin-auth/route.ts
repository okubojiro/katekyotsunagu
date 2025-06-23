import { NextRequest, NextResponse } from 'next/server'

// 管理者パスワード（実際の運用では環境変数に設定）
const ADMIN_PASSWORD = 'katekyou2024'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (password === ADMIN_PASSWORD) {
      // 簡易トークン生成（実際はJWTなどを使用）
      const token = Buffer.from(`admin_${Date.now()}`).toString('base64')
      
      return NextResponse.json({ 
        success: true, 
        token,
        message: 'ログイン成功' 
      })
    } else {
      return NextResponse.json({ 
        error: 'パスワードが間違っています' 
      }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ 
      error: '認証エラーが発生しました' 
    }, { status: 500 })
  }
}