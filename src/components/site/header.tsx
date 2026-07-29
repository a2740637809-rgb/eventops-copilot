import Link from "next/link";
import { StatusPill } from "@/components/ui/status-pill";

export function Header() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/">
        <span className="wordmark__mark">EO</span>
        <span>
          EventOps
          <small>Copilot</small>
        </span>
      </Link>
      <nav aria-label="主导航">
        <Link href="/workspace">活动工作台</Link>
        <Link href="/evaluation">合成评测</Link>
        <Link href="/case-study">Case Study</Link>
      </nav>
      <StatusPill tone="synthetic">合成演示</StatusPill>
    </header>
  );
}
