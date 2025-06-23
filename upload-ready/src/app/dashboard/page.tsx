import { Suspense } from "react";
// Temporarily disable Clerk auth
// import { auth } from '@clerk/nextjs';
// import { redirect } from 'next/navigation';
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestsList } from "@/components/dashboard/requests-list";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { Clock, MessageCircle, User, FileText } from "lucide-react";

export default function DashboardPage() {
  // Temporarily disable auth check for localhost debugging
  // const { userId } = auth();
  // if (!userId) {
  //   redirect('/sign-in');
  // }
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ダッシュボード</h1>
          <p className="text-gray-600">指導依頼の管理とマッチング状況を確認できます</p>
        </div>

        {/* Stats Cards */}
        <Suspense fallback={<div>Loading stats...</div>}>
          <DashboardStats />
        </Suspense>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8 mt-8">
          {/* Main Dashboard */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="requests" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="requests" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  依頼管理
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  メッセージ
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  プロフィール
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  履歴
                </TabsTrigger>
              </TabsList>

              <TabsContent value="requests">
                <Suspense fallback={<div>Loading requests...</div>}>
                  <RequestsList />
                </Suspense>
              </TabsContent>

              <TabsContent value="messages">
                <Card>
                  <CardHeader>
                    <CardTitle>メッセージ</CardTitle>
                    <CardDescription>教師とのメッセージのやり取り</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>メッセージ機能は準備中です</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>プロフィール設定</CardTitle>
                    <CardDescription>お子様の情報や学習目標を管理</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>プロフィール編集機能は準備中です</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>過去の依頼履歴</CardTitle>
                    <CardDescription>これまでの指導依頼と結果</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>履歴機能は準備中です</p>
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
                <Button className="w-full bg-gradient-to-r from-primary to-green-600">
                  新しい教師を探す
                </Button>
                <Button variant="outline" className="w-full" disabled>
                  プロフィール編集
                </Button>
                <Button variant="outline" className="w-full" disabled>
                  設定
                </Button>
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">サポート</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">よくある質問</h4>
                    <p className="text-gray-600">マッチングの流れや料金について</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">お問い合わせ</h4>
                    <p className="text-gray-600">困ったことがあればお気軽に</p>
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