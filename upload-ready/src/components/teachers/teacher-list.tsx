import { Suspense } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Clock, CheckCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

// Mock data for development
const mockTeachers = [
  {
    id: "1",
    name: "田中太郎",
    avatar: null,
    subjects: ["数学", "物理", "化学"],
    hourlyRate: 3000,
    experience: 5,
    location: "東京都",
    description: "東京大学理学部卒業。大手塾で5年間指導経験があります。特に数学と物理の指導が得意で、難関校受験対策も可能です。",
    rating: 4.8,
    reviewCount: 24,
    isVerified: true,
    education: ["東京大学 理学部"],
    availability: "平日夜間・土日"
  },
  {
    id: "2",
    name: "佐藤花子",
    avatar: null,
    subjects: ["英語", "国語"],
    hourlyRate: 2500,
    experience: 3,
    location: "神奈川県",
    description: "早稲田大学文学部卒業。TOEIC満点取得。英語の4技能をバランスよく指導し、楽しく学習できる方法を提案します。",
    rating: 4.9,
    reviewCount: 18,
    isVerified: true,
    education: ["早稲田大学 文学部"],
    availability: "平日午後・土日"
  },
  {
    id: "3",
    name: "山田次郎",
    avatar: null,
    subjects: ["数学", "英語", "理科"],
    hourlyRate: 2800,
    experience: 7,
    location: "千葉県",
    description: "医学部受験指導専門。多数の生徒を医学部合格に導いた実績があります。基礎から応用まで丁寧に指導します。",
    rating: 4.7,
    reviewCount: 31,
    isVerified: false,
    education: ["慶應義塾大学 医学部"],
    availability: "土日中心"
  }
];

export function TeacherList() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {mockTeachers.length}件の教師が見つかりました
        </p>
        <select className="text-sm border rounded px-3 py-1">
          <option>おすすめ順</option>
          <option>料金が安い順</option>
          <option>料金が高い順</option>
          <option>評価が高い順</option>
          <option>経験が豊富順</option>
        </select>
      </div>

      <div className="grid gap-6">
        {mockTeachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-8">
        <Button variant="outline" size="sm" disabled>
          前へ
        </Button>
        <Button variant="outline" size="sm" className="bg-primary text-white">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          次へ
        </Button>
      </div>
    </div>
  );
}

function TeacherCard({ teacher }: { teacher: any }) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white group relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
      
      <CardContent className="p-6 relative">
        <div className="flex gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0 relative">
            <Avatar className="w-24 h-24 ring-4 ring-white shadow-lg group-hover:scale-105 transition-transform duration-300">
              <AvatarImage src={teacher.avatar} alt={teacher.name} />
              <AvatarFallback className="text-xl bg-gradient-to-br from-primary to-green-600 text-white font-bold">
                {teacher.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            {teacher.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {teacher.name}
                  </h3>
                  {teacher.isVerified && (
                    <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                      本人確認済み
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-5 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1.5 bg-yellow-50 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-yellow-700">{teacher.rating}</span>
                    <span className="text-yellow-600">({teacher.reviewCount}件)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{teacher.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{teacher.experience}年経験</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right ml-4">
                <div className="bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
                  <div className="text-2xl font-bold">
                    {formatCurrency(teacher.hourlyRate)}
                  </div>
                </div>
                <div className="text-sm text-gray-500 font-medium">/ 時間</div>
              </div>
            </div>

            {/* Subjects */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {teacher.subjects.map((subject: string, index: number) => (
                  <Badge 
                    key={subject} 
                    variant="secondary" 
                    className={`
                      ${index === 0 ? 'bg-primary/10 text-primary border-primary/20' : ''}
                      hover:bg-primary/20 transition-colors
                    `}
                  >
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
              {teacher.description}
            </p>

            {/* Education & Availability */}
            <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="font-medium text-gray-700 block mb-1">学歴</span>
                <span className="text-gray-600">{teacher.education[0]}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="font-medium text-gray-700 block mb-1">対応時間</span>
                <span className="text-gray-600">{teacher.availability}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Link href={`/teachers/${teacher.id}`} className="flex-1">
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-gray-200 hover:border-primary hover:text-primary transition-all duration-200"
                >
                  詳細を見る
                </Button>
              </Link>
              <Link href={`/teachers/${teacher.id}/request`} className="flex-1">
                <Button className="w-full bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 shadow-lg hover:shadow-xl transition-all duration-200">
                  指導依頼
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}