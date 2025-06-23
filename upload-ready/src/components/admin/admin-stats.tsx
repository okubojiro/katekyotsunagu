import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, CheckCircle, AlertTriangle, Users, Star } from "lucide-react";

// Mock data for demonstration
const adminStatsData = {
  totalRequests: 25,
  pendingRequests: 8,
  approvedRequests: 12,
  rejectedRequests: 5,
  totalUsers: 150,
  totalTeachers: 45,
  averageRating: 4.7,
  monthlyRevenue: 450000,
};

export function AdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Requests */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">
            総依頼数
          </CardTitle>
          <FileText className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">{adminStatsData.totalRequests}</div>
          <p className="text-xs text-blue-600">
            今月の総依頼数
          </p>
        </CardContent>
      </Card>

      {/* Pending Requests (Admin Action Required) */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-orange-700">
            承認待ち
          </CardTitle>
          <Clock className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-900">{adminStatsData.pendingRequests}</div>
          <p className="text-xs text-orange-600">
            運営の対応が必要です
          </p>
        </CardContent>
      </Card>

      {/* Approved Requests */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">
            承認済み
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">{adminStatsData.approvedRequests}</div>
          <p className="text-xs text-green-600">
            教師への通知完了
          </p>
        </CardContent>
      </Card>

      {/* Total Users */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-700">
            総ユーザー数
          </CardTitle>
          <Users className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-900">{adminStatsData.totalUsers}</div>
          <p className="text-xs text-purple-600">
            保護者 + 教師
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
