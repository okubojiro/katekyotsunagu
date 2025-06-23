import Link from "next/link";
// Temporarily disable Clerk components
// import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

interface HeaderProps {
  variant?: "default" | "transparent";
  className?: string;
}

export function Header({ variant = "default", className }: HeaderProps) {
  const isTransparent = variant === "transparent";
  
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-200",
      isTransparent 
        ? "bg-white/80 backdrop-blur-md border-b border-gray-200/50" 
        : "bg-white border-b border-gray-200 shadow-sm",
      className
    )}>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="transition-transform hover:scale-105">
            <Logo />
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/teachers" className="text-gray-600 hover:text-primary font-medium transition-colors">
              家庭教師を探す
            </Link>
            <Link href="/students" className="text-gray-600 hover:text-primary font-medium transition-colors">
              生徒を探す
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-primary font-medium transition-colors">
              ダッシュボード
            </Link>
            <Link href="/admin" className="text-gray-600 hover:text-primary font-medium transition-colors">
              管理画面
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-primary font-medium transition-colors">
              料金について
            </Link>
            <Link href="/how-it-works" className="text-gray-600 hover:text-primary font-medium transition-colors">
              利用方法
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Temporarily show static buttons instead of Clerk components */}
            <Button variant="ghost" className="hidden sm:inline-flex" disabled>
              ログイン（準備中）
            </Button>
            <Button disabled className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80">
              無料で始める（準備中）
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}