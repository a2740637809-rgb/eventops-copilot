import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "EventOps Copilot｜有依据的活动执行工作台",
  description:
    "从分散资料中核对事实、发现冲突，并生成可审批的活动执行包。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
