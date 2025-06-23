import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react";

// Mock data for demonstration
const statsData = {
  totalRequests: 3,
  pending: 1,
  accepted: 1,
  rejected: 1,
  completed: 0,
};

export function DashboardStats() {
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
          <div className="text-2xl font-bold text-blue-900">{statsData.totalRequests}</div>
          <p className="text-xs text-blue-600">
            これまでに送信した依頼
          </p>
        </CardContent>
      </Card>

      {/* Pending Requests */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-yellow-700">
            承認待ち
          </CardTitle>
          <Clock className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-900">{statsData.pending}</div>
          <p className="text-xs text-yellow-600">
            教師の回答を待っています
          </p>
        </CardContent>
      </Card>

      {/* Accepted Requests */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">
            マッチング成立
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">{statsData.accepted}</div>
          <p className="text-xs text-green-600">
            指導が開始できます
          </p>
        </CardContent>
      </Card>

      {/* Rejected Requests */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-red-700">
            お断り
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-900">{statsData.rejected}</div>
          <p className="text-xs text-red-600">
            他の教師を探しましょう
          </p>
        </CardContent>
      </Card>
    </div>
  );
}