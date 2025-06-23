"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const subjects = [
  "数学", "英語", "国語", "理科", "社会",
  "物理", "化学", "生物", "日本史", "世界史",
  "地理", "政治経済", "現代文", "古文", "漢文"
];

const locations = [
  "東京都", "神奈川県", "千葉県", "埼玉県", "大阪府",
  "愛知県", "福岡県", "北海道", "宮城県", "広島県"
];

export function TeacherSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState({
    subjects: searchParams.get("subjects")?.split(",") || [],
    location: searchParams.get("location") || "",
    minRate: searchParams.get("minRate") || "",
    maxRate: searchParams.get("maxRate") || "",
    experience: searchParams.get("experience") || "",
    isVerified: searchParams.get("isVerified") === "true",
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (filters.subjects.length > 0) {
      params.set("subjects", filters.subjects.join(","));
    }
    if (filters.location) {
      params.set("location", filters.location);
    }
    if (filters.minRate) {
      params.set("minRate", filters.minRate);
    }
    if (filters.maxRate) {
      params.set("maxRate", filters.maxRate);
    }
    if (filters.experience) {
      params.set("experience", filters.experience);
    }
    if (filters.isVerified) {
      params.set("isVerified", "true");
    }

    router.push(`/teachers?${params.toString()}`);
  };

  const handleSubjectChange = (subject: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      subjects: checked 
        ? [...prev.subjects, subject]
        : prev.subjects.filter(s => s !== subject)
    }));
  };

  const clearFilters = () => {
    setFilters({
      subjects: [],
      location: "",
      minRate: "",
      maxRate: "",
      experience: "",
      isVerified: false,
    });
    router.push("/teachers");
  };

  return (
    <div className="space-y-6">
      {/* Subjects */}
      <div>
        <Label className="text-sm font-medium mb-3 block">指導科目</Label>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {subjects.map((subject) => (
            <div key={subject} className="flex items-center space-x-2">
              <Checkbox
                id={subject}
                checked={filters.subjects.includes(subject)}
                onCheckedChange={(checked) => 
                  handleSubjectChange(subject, checked as boolean)
                }
              />
              <Label htmlFor={subject} className="text-sm">
                {subject}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <Label className="text-sm font-medium mb-3 block">対応地域</Label>
        <Select value={filters.location} onValueChange={(value) => 
          setFilters(prev => ({ ...prev, location: value }))
        }>
          <SelectTrigger>
            <SelectValue placeholder="地域を選択" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium mb-3 block">時給（円/時間）</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Input
              type="number"
              placeholder="最低"
              value={filters.minRate}
              onChange={(e) => 
                setFilters(prev => ({ ...prev, minRate: e.target.value }))
              }
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="最高"
              value={filters.maxRate}
              onChange={(e) => 
                setFilters(prev => ({ ...prev, maxRate: e.target.value }))
              }
            />
          </div>
        </div>
      </div>

      {/* Experience */}
      <div>
        <Label className="text-sm font-medium mb-3 block">指導経験</Label>
        <Select value={filters.experience} onValueChange={(value) => 
          setFilters(prev => ({ ...prev, experience: value }))
        }>
          <SelectTrigger>
            <SelectValue placeholder="経験年数" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1年以上</SelectItem>
            <SelectItem value="3">3年以上</SelectItem>
            <SelectItem value="5">5年以上</SelectItem>
            <SelectItem value="10">10年以上</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Verified */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="verified"
          checked={filters.isVerified}
          onCheckedChange={(checked) => 
            setFilters(prev => ({ ...prev, isVerified: checked as boolean }))
          }
        />
        <Label htmlFor="verified" className="text-sm">
          本人確認済みのみ
        </Label>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button onClick={handleSearch} className="w-full">
          検索
        </Button>
        <Button onClick={clearFilters} variant="outline" className="w-full">
          条件クリア
        </Button>
      </div>
    </div>
  );
}