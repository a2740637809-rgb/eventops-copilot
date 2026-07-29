import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { StatusPill } from "@/components/ui/status-pill";

export default function CaseStudyPage() {
  return (
    <main className="case-page">
      <header className="case-hero">
        <span className="rail-label">PORTFOLIO CASE / 2026</span>
        <StatusPill tone="synthetic">已实现 MVP · 待真实验证</StatusPill>
        <h1>EventOps Copilot</h1>
        <p>把 160+ 场活动执行经验，转化为一个证据优先、人工放行的 AI 产品闭环。</p>
        <Link className="button button--primary" href="/workspace">体验产品 <ArrowUpRight /></Link>
      </header>
      <section className="case-body">
        <article><span>01 / PROBLEM</span><h2>活动不是缺方案，而是缺一份可信的执行版本。</h2><p>需求散落在方案、聊天和场地规则里。普通生成式 AI 会快速产出漂亮文本，却可能把“没有写”误变成“默认如此”。</p></article>
        <article><span>02 / DECISION</span><h2>首要指标不是生成速度，是无依据事实率。</h2><p>产品先建立事实登记册，缺项和冲突阻塞审批；执行包中明确区分资料事实、人工确认和行业模板建议。</p></article>
        <article><span>03 / BUILD</span><h2>确定性规则负责判断，模型只负责它擅长的部分。</h2><p>纯函数处理准备度、时间冲突、审批门槛和评测。RAG 用于资料检索与引用；MVP 不使用多 Agent，避免增加成本和不可观测性。</p></article>
        <article><span>04 / EVIDENCE</span><h2>公开结果可复现，但不冒充真实业务效果。</h2><p>仓库提供单元测试、浏览器关键路径和 4 类合成评测。没有真实从业者测试，因此不声称节省时间或提升效率。</p></article>
      </section>
      <section className="case-close"><span>下一验证</span><strong>用合法脱敏的真实活动资料测试解析、引用和人工修改率。</strong></section>
    </main>
  );
}
