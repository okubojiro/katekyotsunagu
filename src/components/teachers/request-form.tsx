"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RequestFormProps {
  teacherId: string;
}

export function RequestForm({ teacherId }: RequestFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    grade: "",
    subjects: [] as string[],
    learningGoals: "",
    preferredSchedule: "",
    frequency: "",
    budget: "",
    location: "",
    message: "",
    contactMethod: "email",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    agreeToTerms: false,
  });

  const subjects = [
    "数学", "英語", "国語", "理科", "社会",
    "物理", "化学", "生物", "日本史", "世界史",
    "地理", "政治経済", "現代文", "古文", "漢文"
  ];

  const grades = [
    "小学1年生", "小学2年生", "小学3年生", "小学4年生", "小学5年生", "小学6年生",
    "中学1年生", "中学2年生", "中学3年生",
    "高校1年生", "高校2年生", "高校3年生",
    "浪人生", "その他"
  ];

  const handleSubjectChange = (subject: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      subjects: checked 
        ? [...prev.subjects, subject]
        : prev.subjects.filter(s => s !== subject)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      alert("利用規約に同意してください。");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Here would be the API call to submit the request
      // For now, we'll simulate the request
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to success page or dashboard
      router.push(`/dashboard/requests?success=true`);
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("送信中にエラーが発生しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>指導依頼情報</CardTitle>
        <CardDescription>
          すべての項目をご記入ください。運営が確認後、教師にお伝えします。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">生徒情報</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentName">生徒のお名前 *</Label>
                <Input
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
                  placeholder="山田太郎"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="grade">学年 *</Label>
                <Select value={formData.grade} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, grade: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="学年を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">希望指導科目 *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {subjects.map((subject) => (
                  <div key={subject} className="flex items-center space-x-2">
                    <Checkbox
                      id={`subject-${subject}`}
                      checked={formData.subjects.includes(subject)}
                      onCheckedChange={(checked) => 
                        handleSubjectChange(subject, checked as boolean)
                      }
                    />
                    <Label htmlFor={`subject-${subject}`} className="text-sm">
                      {subject}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Learning Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">指導内容</h3>
            
            <div>
              <Label htmlFor="learningGoals">学習目標・指導方針 *</Label>
              <Textarea
                id="learningGoals"
                value={formData.learningGoals}
                onChange={(e) => setFormData(prev => ({ ...prev, learningGoals: e.target.value }))}
                placeholder="定期テストの成績向上、受験対策、苦手分野の克服など"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="frequency">指導頻度 *</Label>
                <Select value={formData.frequency} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, frequency: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="指導頻度を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly-1">週1回</SelectItem>
                    <SelectItem value="weekly-2">週2回</SelectItem>
                    <SelectItem value="weekly-3">週3回</SelectItem>
                    <SelectItem value="bi-weekly">隔週</SelectItem>
                    <SelectItem value="monthly">月1回</SelectItem>
                    <SelectItem value="irregular">不定期</SelectItem>
                    <SelectItem value="other">その他</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="budget">予算（時給）</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  placeholder="3000"
                />
                <p className="text-xs text-gray-500 mt-1">円/時間（参考価格: ¥3,000）</p>
              </div>
            </div>

            <div>
              <Label htmlFor="preferredSchedule">希望スケジュール *</Label>
              <Textarea
                id="preferredSchedule"
                value={formData.preferredSchedule}
                onChange={(e) => setFormData(prev => ({ ...prev, preferredSchedule: e.target.value }))}
                placeholder="平日の夕方、土日の午前中など、希望する時間帯をお書きください"
                required
              />
            </div>

            <div>
              <Label htmlFor="location">指導場所 *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="東京都渋谷区（最寄り駅: 渋谷駅）"
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">保護者連絡先</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parentName">保護者のお名前 *</Label>
                <Input
                  id="parentName"
                  value={formData.parentName}
                  onChange={(e) => setFormData(prev => ({ ...prev, parentName: e.target.value }))}
                  placeholder="山田花子"
                  required
                />
              </div>

              <div>
                <Label htmlFor="parentEmail">メールアドレス *</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, parentEmail: e.target.value }))}
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="parentPhone">電話番号</Label>
              <Input
                id="parentPhone"
                value={formData.parentPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, parentPhone: e.target.value }))}
                placeholder="090-1234-5678"
              />
            </div>

            <div>
              <Label>希望連絡方法 *</Label>
              <RadioGroup 
                value={formData.contactMethod} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, contactMethod: value }))}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email">メール</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="phone" />
                  <Label htmlFor="phone">電話</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both">メール・電話両方</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Additional Message */}
          <div>
            <Label htmlFor="message">追加メッセージ</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="教師への質問や特別な要望があればお書きください"
            />
          </div>

          {/* Terms Agreement */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
              }
            />
            <Label htmlFor="terms" className="text-sm">
              <span>利用規約</span>に同意します *
            </Label>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "送信中..." : "指導依頼を送信"}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            送信後、運営が内容を確認し教師にお伝えします。通常1-2営業日以内にご連絡いたします。
          </p>
        </form>
      </CardContent>
    </Card>
  );
}