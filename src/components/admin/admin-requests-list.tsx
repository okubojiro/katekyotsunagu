"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Clock, User, MapPin, Star, Calendar, MessageCircle, CheckCircle, X, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

// Mock data for admin requests management
const mockAdminRequests = [
  {
    id: "REQ-001",
    parentName: "佐藤太郎",
    parentEmail: "sato.taro@example.com",
    studentName: "佐藤花子",
    studentGrade: "中学2年生",
    teacherId: "1",
    teacherName: "田中太郎",
    teacherEmail: "tanaka@example.com",
    teacherAvatar: null,
    teacherRating: 4.8,
    subjects: ["数学", "物理"],
    hourlyRate: 3000,
    status: "PENDING_ADMIN", // PENDING_ADMIN, APPROVED, REJECTED, PENDING_TEACHER, ACCEPTED, COMPLETED
    requestedAt: "2024-01-20T10:30:00",
    message: "中学2年生の数学と物理を指導していただきたいです。定期テスト対策をお願いします。平日の夕方から指導をお願いしたいです。",
    location: "東京都渋谷区",
    preferredSchedule: "平日 18:00-20:00",
    adminNotes: "",
  },
  {
    id: "REQ-002",
    parentName: "鈴木一郎",
    parentEmail: "suzuki.ichiro@example.com",
    studentName: "鈴木美奈",
    studentGrade: "高校1年生",
    teacherId: "2",
    teacherName: "佐藤花子",
    teacherEmail: "sato.hanako@example.com",
    teacherAvatar: null,
    teacherRating: 4.9,
    subjects: ["英語", "国語"],
    hourlyRate: 2500,
    status: "APPROVED",
    requestedAt: "2024-01-18T14:20:00",
    approvedAt: "2024-01-18T16:45:00",
    message: "高校１年生の英語指導をお願いします。大学受験を見据えた基礎固めを希望します。",
    location: "神奈川県横浜市",
    preferredSchedule: "土日 10:00-16:00",
    adminNotes: "教師の経歴と保護者の要望がマッチしているため承認。",
  },
  {
    id: "REQ-003",
    parentName: "高橋良一",
    parentEmail: "takahashi.ryoichi@example.com",
    studentName: "高橋健太",
    studentGrade: "中学3年生",
    teacherId: "3",
    teacherName: "山田次郎",
    teacherEmail: "yamada.jiro@example.com",
    teacherAvatar: null,
    teacherRating: 4.7,
    subjects: ["数学", "理科"],
    hourlyRate: 2800,
    status: "REJECTED",
    requestedAt: "2024-01-15T09:15:00",
    rejectedAt: "2024-01-16T11:30:00",
    message: "中学3年生の受験対策をお願いします。",
    location: "千葉県船橋市",
    preferredSchedule: "毎日 19:00-21:00",
    adminNotes: "教師のスケジュールと保護者の希望が合わないためお断り。",
  },
];

const getStatusInfo = (status: string) => {
  switch (status) {
    case "PENDING_ADMIN":
      return {
        label: "運営承認待ち",
        color: "bg-orange-100 text-orange-700 border-orange-200",
        icon: Clock,
        actionRequired: true,
      };
    case "APPROVED":
      return {
        label: "運営承認済み",
        color: "bg-blue-100 text-blue-700 border-blue-200",
        icon: CheckCircle,
        actionRequired: false,
      };
    case "PENDING_TEACHER":
      return {
        label: "教師回答待ち",
        color: "bg-yellow-100 text-yellow-700 border-yellow-200",
        icon: Clock,
        actionRequired: false,
      };
    case "ACCEPTED":
      return {
        label: "マッチング成立",
        color: "bg-green-100 text-green-700 border-green-200",
        icon: CheckCircle,
        actionRequired: false,
      };
    case "REJECTED":
      return {
        label: "お断り",
        color: "bg-red-100 text-red-700 border-red-200",
        icon: X,
        actionRequired: false,
      };
    default:
      return {
        label: "不明",
        color: "bg-gray-100 text-gray-700 border-gray-200",
        icon: Clock,
        actionRequired: false,
      };
  }
};

export function AdminRequestsList() {
  const [requests, setRequests] = useState(mockAdminRequests);

  const handleApprove = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: "APPROVED", approvedAt: new Date().toISOString() } as any
          : req
      )
    );
  };

  const handleReject = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: "REJECTED", rejectedAt: new Date().toISOString() } as any
          : req
      )
    );
  };

  const pendingRequests = requests.filter(req => req.status === "PENDING_ADMIN");
  const otherRequests = requests.filter(req => req.status !== "PENDING_ADMIN");

  return (
    <div className="space-y-6">
      {/* Pending Requests - Requires Admin Action */}
      {pendingRequests.length > 0 && (
        <Card className="border-2 border-orange-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Clock className="w-5 h-5" />
              運営承認待ちの依頼 ({pendingRequests.length}件)
            </CardTitle>
            <CardDescription>
              以下の依頼に対して運営の対応が必要です
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <RequestCard 
                  key={request.id} 
                  request={request} 
                  onApprove={handleApprove} 
                  onReject={handleReject} 
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Requests */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            全依頼一覧
          </CardTitle>
          <CardDescription>
            過去の依頼を含む全てのマッチング依頼
          </CardDescription>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">まだ依頼がありません</h3>
              <p className="text-gray-600">依頼が届いたらこちらに表示されます</p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <RequestCard 
                  key={request.id} 
                  request={request} 
                  onApprove={handleApprove} 
                  onReject={handleReject} 
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function RequestCard({ 
  request, 
  onApprove, 
  onReject 
}: { 
  request: any; 
  onApprove: (id: string) => void; 
  onReject: (id: string) => void; 
}) {
  const statusInfo = getStatusInfo(request.status);
  const StatusIcon = statusInfo.icon;
  
  return (
    <Card className={`border ${statusInfo.actionRequired ? 'border-orange-200 bg-orange-50/50' : 'border-gray-200'}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Teacher Avatar */}
          <Avatar className="w-12 h-12">
            <AvatarImage src={request.teacherAvatar || undefined} alt={request.teacherName} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-green-600 text-white font-bold">
              {request.teacherName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{request.id}</h3>
                  <Badge className={statusInfo.color}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {statusInfo.label}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                  <div>
                    <div className="font-medium text-gray-900">保護者情報</div>
                    <div>{request.parentName}</div>
                    <div className="text-xs">{request.parentEmail}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">生徒情報</div>
                    <div>{request.studentName} ({request.studentGrade})</div>
                    <div className="text-xs">{request.location}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">教師情報</div>
                    <div>{request.teacherName}</div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{request.teacherRating}</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">希望日時</div>
                    <div>{request.preferredSchedule}</div>
                    <div className="text-xs">依頼日: {new Date(request.requestedAt).toLocaleDateString()}</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {request.subjects.map((subject: string) => (
                    <Badge key={subject} variant="secondary">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-primary">
                  {formatCurrency(request.hourlyRate)}
                </div>
                <div className="text-sm text-gray-500">/ 時間</div>
              </div>
            </div>
            
            {/* Message */}
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <div className="text-sm font-medium text-gray-700 mb-1">依頼内容</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {request.message}
              </p>
            </div>
            
            {/* Admin Notes */}
            {request.adminNotes && (
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <div className="text-sm font-medium text-blue-700 mb-1">運営メモ</div>
                <p className="text-sm text-blue-600">
                  {request.adminNotes}
                </p>
              </div>
            )}
            
            {/* Actions */}
            <div className="flex gap-3">
              <Link href={`/teachers/${request.teacherId}`}>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  教師詳細
                </Button>
              </Link>
              
              {request.status === "PENDING_ADMIN" && (
                <>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                        承認する
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>依頼を承認しますか？</AlertDialogTitle>
                        <AlertDialogDescription>
                          この依頼を承認すると、教師に通知メールが送信されます。
                          教師が受諾した場合、マッチングが成立します。
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>キャンセル</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onApprove(request.id)}>
                          承認する
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                        お断り
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>依頼をお断りしますか？</AlertDialogTitle>
                        <AlertDialogDescription>
                          この依頼をお断りすると、保護者にお断りの通知メールが送信されます。
                          この操作は元に戻せません。
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>キャンセル</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => onReject(request.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          お断りする
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}
              
              {request.status === "APPROVED" && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  教師に通知済み
                </Badge>
              )}
              
              {request.status === "REJECTED" && (
                <Badge variant="outline" className="bg-red-50 text-red-700">
                  お断り済み
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
