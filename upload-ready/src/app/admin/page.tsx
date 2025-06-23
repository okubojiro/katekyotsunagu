import { Suspense } from "react";
// Temporarily disable Clerk auth
// import { auth } from '@clerk/nextjs';
// import { redirect } from 'next/navigation';
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminRequestsList } from "@/components/admin/admin-requests-list";
import { AdminStats } from "@/components/admin/admin-stats";
import { FileText, Users, MessageCircle, Shield } from "lucide-react";

export default function AdminPage() {
  // Temporarily disable auth check for localhost debugging
  // const { userId } = auth();
  // if (!userId) {
  //   redirect('/sign-in');
  // }
  // TODO: Add admin role check
  // if (!isAdmin) {
  //   redirect('/dashboard');
  // }
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">管理画面</h1>
            <Badge className="bg-red-100 text-red-700 border-red-200">
              ADMIN ONLY
            </Badge>
          </div>
          <p className="text-gray-600">家庭教師マッチングサービスの運営管理</p>
        </div>

        {/* Stats Cards */}
        <Suspense fallback={<div>Loading stats...</div>}>
          <AdminStats />
        </Suspense>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8 mt-8">
          {/* Main Dashboard */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="requests" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="requests" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  従来マッチング
                </TabsTrigger>
                <TabsTrigger value="applications" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  生徒応募管理
                </TabsTrigger>
                <TabsTrigger value="students" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  生徒・求人管理
                </TabsTrigger>
                <TabsTrigger value="teachers" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  教師管理
                </TabsTrigger>
                <TabsTrigger value="system" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  システム
                </TabsTrigger>
              </TabsList>

              <TabsContent value="requests">
                <Suspense fallback={<div>Loading requests...</div>}>
                  <AdminRequestsList />
                </Suspense>
              </TabsContent>

              <TabsContent value="applications">
                <Card>
                  <CardHeader>
                    <CardTitle>生徒応募管理</CardTitle>
                    <CardDescription>教師から生徒への応募状況を管理</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Badge className="bg-yellow-100 text-yellow-700">
                            審査待ち: 5件
                          </Badge>
                          <Badge className="bg-green-100 text-green-700">
                            承認済み: 12件
                          </Badge>
                          <Badge className="bg-red-100 text-red-700">
                            拒否: 3件
                          </Badge>
                        </div>
                        <Button size="sm">
                          一括処理
                        </Button>
                      </div>
                      
                      <div className="border rounded-lg">
                        <div className="grid grid-cols-6 gap-4 p-4 border-b bg-gray-50 font-medium text-sm">
                          <span>応募日</span>
                          <span>教師名</span>
                          <span>生徒名</span>
                          <span>科目</span>
                          <span>ステータス</span>
                          <span>アクション</span>
                        </div>
                        
                        {/* Sample Data */}
                        <div className="divide-y">
                          <div className="grid grid-cols-6 gap-4 p-4 text-sm">
                            <span className="text-gray-600">2024-01-15</span>
                            <span>田中先生</span>
                            <span>中学2年生のAさん</span>
                            <span>数学・英語</span>
                            <Badge className="bg-yellow-100 text-yellow-700 w-fit">審査待ち</Badge>
                            <div className="flex gap-1">
                              <Button size="sm" className="bg-green-600 text-white">承認</Button>
                              <Button size="sm" variant="outline">拒否</Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-6 gap-4 p-4 text-sm">
                            <span className="text-gray-600">2024-01-14</span>
                            <span>佐藤先生</span>
                            <span>高校1年生のBさん</span>
                            <span>物理・化学</span>
                            <Badge className="bg-green-100 text-green-700 w-fit">承認済み</Badge>
                            <span className="text-gray-500">マッチング成立</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="students">
                <Card>
                  <CardHeader>
                    <CardTitle>生徒・求人管理</CardTitle>
                    <CardDescription>生徒プロフィールと求人投稿の管理</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Badge className="bg-blue-100 text-blue-700">
                            アクティブ生徒: 15名
                          </Badge>
                          <Badge className="bg-purple-100 text-purple-700">
                            アクティブ求人: 8件
                          </Badge>
                          <Badge className="bg-gray-100 text-gray-700">
                            マッチング済み: 7件
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            CSVエクスポート
                          </Button>
                          <Button size="sm">
                            新規生徒追加
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg">
                        <div className="grid grid-cols-7 gap-4 p-4 border-b bg-gray-50 font-medium text-sm">
                          <span>登録日</span>
                          <span>生徒名</span>
                          <span>学年</span>
                          <span>地域</span>
                          <span>科目</span>
                          <span>応募数</span>
                          <span>アクション</span>
                        </div>
                        
                        <div className="divide-y">
                          <div className="grid grid-cols-7 gap-4 p-4 text-sm">
                            <span className="text-gray-600">2024-01-10</span>
                            <span>中学2年生のAさん</span>
                            <span>中学2年</span>
                            <span>東京都新宿区</span>
                            <span>数学・英語</span>
                            <Badge className="bg-blue-100 text-blue-700 w-fit">3件</Badge>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">詳細</Button>
                              <Button size="sm" variant="outline">編集</Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-7 gap-4 p-4 text-sm">
                            <span className="text-gray-600">2024-01-08</span>
                            <span>高校1年生のBさん</span>
                            <span>高校1年</span>
                            <span>神奈川県横浜市</span>
                            <span>物理・化学</span>
                            <Badge className="bg-green-100 text-green-700 w-fit">マッチング済み</Badge>
                            <Button size="sm" variant="outline">詳細</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="teachers">
                <Card>
                  <CardHeader>
                    <CardTitle>教師管理</CardTitle>
                    <CardDescription>教師アカウントの審査・管理</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>教師管理機能は準備中です</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="system">
                <Card>
                  <CardHeader>
                    <CardTitle>システム設定</CardTitle>
                    <CardDescription>サイト設定・セキュリティ・ログ管理</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>システム設定機能は準備中です</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">クイックアクション</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-primary to-green-600" disabled>
                  一括承認
                </Button>
                <Button variant="outline" className="w-full" disabled>
                  メール送信
                </Button>
                <Button variant="outline" className="w-full" disabled>
                  レポート出力
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">システム状況</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span>サーバー状態</span>
                    <Badge className="bg-green-100 text-green-700">正常</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>データベース</span>
                    <Badge className="bg-green-100 text-green-700">正常</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>メール送信</span>
                    <Badge className="bg-yellow-100 text-yellow-700">設定中</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>決済システム</span>
                    <Badge className="bg-yellow-100 text-yellow-700">設定中</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
