import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, User, MapPin, Star, Calendar, MessageCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

// Mock data for demonstration
const mockRequests = [
  {
    id: "1",
    teacherId: "1",
    teacherName: "田中太郎",
    teacherAvatar: null,
    teacherRating: 4.8,
    subjects: ["数学", "物理"],
    hourlyRate: 3000,
    status: "PENDING",
    requestedAt: "2024-01-20",
    message: "中学2年生の数学と物理を指導していただきたいです。定期テスト対策をお願いします。",
    location: "東京都渋谷区",
  },
  {
    id: "2", 
    teacherId: "2",
    teacherName: "佐藤花子",
    teacherAvatar: null,
    teacherRating: 4.9,
    subjects: ["英語", "国語"],
    hourlyRate: 2500,
    status: "ACCEPTED",
    requestedAt: "2024-01-18",
    acceptedAt: "2024-01-19",
    message: "高校1年生の英語指導をお願いします。大学受験を見据えた基礎固めを希望します。",
    location: "神奈川県横浜市",
  },
  {
    id: "3",
    teacherId: "3", 
    teacherName: "山田次郎",
    teacherAvatar: null,
    teacherRating: 4.7,
    subjects: ["数学", "理科"],
    hourlyRate: 2800,
    status: "REJECTED",
    requestedAt: "2024-01-15",
    rejectedAt: "2024-01-16",
    message: "中学3年生の受験対策をお願いします。",
    location: "千葉県船橋市",
  },
];

const getStatusInfo = (status: string) => {
  switch (status) {
    case "PENDING":
      return {
        label: "承認待ち",
        color: "bg-yellow-100 text-yellow-700 border-yellow-200",
        icon: Clock,
      };
    case "ACCEPTED":
      return {
        label: "マッチング成立",
        color: "bg-green-100 text-green-700 border-green-200",
        icon: User,
      };
    case "REJECTED":
      return {
        label: "お断り",
        color: "bg-red-100 text-red-700 border-red-200",
        icon: MessageCircle,
      };
    default:
      return {
        label: "不明",
        color: "bg-gray-100 text-gray-700 border-gray-200",
        icon: Clock,
      };
  }
};

export function RequestsList() {
  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            指導依頼一覧
          </CardTitle>
          <CardDescription>
            送信した依頼の状況を確認できます
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockRequests.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">まだ依頼がありません</h3>
              <p className="text-gray-600 mb-6">教師を探して指導依頼を送信してみましょう</p>
              <Link href="/teachers">
                <Button className="bg-gradient-to-r from-primary to-green-600">
                  教師を探す
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {mockRequests.map((request) => {
                const statusInfo = getStatusInfo(request.status);
                const StatusIcon = statusInfo.icon;
                
                return (
                  <Card key={request.id} className="border border-gray-200">
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
                                <h3 className="font-semibold text-lg">{request.teacherName}</h3>
                                <Badge className={statusInfo.color}>
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {statusInfo.label}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span>{request.teacherRating}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{request.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>依頼日: {request.requestedAt}</span>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mb-3">
                                {request.subjects.map((subject) => (
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
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {request.message}
                            </p>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex gap-3">
                            <Link href={`/teachers/${request.teacherId}`}>
                              <Button variant="outline" size="sm">
                                教師詳細
                              </Button>
                            </Link>
                            
                            {request.status === "PENDING" && (
                              <>
                                <Button variant="outline" size="sm" disabled>
                                  依頼をキャンセル
                                </Button>
                                <Button variant="outline" size="sm" disabled>
                                  メッセージ送信
                                </Button>
                              </>
                            )}
                            
                            {request.status === "ACCEPTED" && (
                              <>
                                <Button size="sm" className="bg-gradient-to-r from-primary to-green-600">
                                  決済手続きへ
                                </Button>
                                <Button variant="outline" size="sm" disabled>
                                  メッセージ
                                </Button>
                              </>
                            )}
                            
                            {request.status === "REJECTED" && (
                              <Button size="sm" className="bg-gradient-to-r from-primary to-green-600">
                                他の教師を探す
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}