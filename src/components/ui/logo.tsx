import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        {/* ロゴアイコン */}
        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-sm md:text-base">つ</span>
        </div>
        {/* 小さな装飾 */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
      </div>
      <div className="flex flex-col">
        <span className={cn("font-bold text-gray-900 leading-tight", sizeClasses[size])}>
          家庭教師つなぐ
        </span>
        <span className="text-xs text-gray-500 -mt-1">安心の個人契約</span>
      </div>
    </div>
  );
}