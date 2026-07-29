import { evaluationCases } from "@/data/evaluation-cases";
import { evaluateCases } from "@/domain/evaluation";
import { StatusPill } from "@/components/ui/status-pill";

function percent(value: number | null) {
  return value === null ? "—" : `${(value * 100).toFixed(1)}%`;
}

export default function EvaluationPage() {
  const summary = evaluateCases(evaluationCases);
  const metrics = [
    ["信息遗漏率", percent(summary.informationOmissionRate.value), `${summary.informationOmissionRate.numerator}/${summary.informationOmissionRate.denominator}`, "标准关键事实中未被抽出的比例"],
    ["字段准确率", percent(summary.fieldAccuracy.value), `${summary.fieldAccuracy.numerator}/${summary.fieldAccuracy.denominator}`, "抽取字段中与标准答案一致的比例"],
    ["无依据事实率", percent(summary.unsupportedFactRate.value), `${summary.unsupportedFactRate.numerator}/${summary.unsupportedFactRate.denominator}`, "无来源且未标记为建议的事实比例"],
    ["冲突召回率", percent(summary.conflictRecall.value), `${summary.conflictRecall.numerator}/${summary.conflictRecall.denominator}`, "预置冲突中被规则发现的比例"],
    ["工具调用成功率", percent(summary.toolSuccessRate.value), `${summary.toolSuccessRate.numerator}/${summary.toolSuccessRate.denominator}`, "已批准模拟调用中完成的比例"],
  ];
  return (
    <main className="report-page">
      <header className="report-hero">
        <StatusPill tone="synthetic">仅合成评测 · N={summary.sampleSize}</StatusPill>
        <h1>先证明系统不乱说，<em>再讨论它有多聪明。</em></h1>
        <p>以下结果来自 4 个版本化合成案例，只验证产品机制和评测管线，不代表真实从业者使用效果。</p>
      </header>
      <section className="metric-grid">
        {metrics.map(([name, value, fraction, note]) => <article key={name}><span>{name}</span><strong>{value}</strong><code>{fraction}</code><p>{note}</p></article>)}
      </section>
      <section className="evaluation-table">
        <header><h2>测试用例明细</h2><p>每个案例都保留标准答案与分母，模型或规则修改后可重复运行。</p></header>
        <div className="evaluation-row evaluation-row--head"><span>案例</span><span>事实</span><span>正确</span><span>冲突</span><span>耗时</span><span>估算成本</span></div>
        {evaluationCases.map((item) => <div className="evaluation-row" key={item.id}><strong>{item.id}</strong><span>{item.extractedFacts}/{item.expectedFacts}</span><span>{item.correctFacts}</span><span>{item.detectedConflicts}/{item.expectedConflicts}</span><span>{(item.durationMs / 1000).toFixed(1)}s</span><span>¥{item.estimatedCostCny.toFixed(2)}</span></div>)}
      </section>
      <aside className="method-note"><strong>尚未验证</strong><p>真实资料解析质量、真实用户人工修改率、端到端任务完成率和实际 API 成本。获得合法脱敏资料后才能补充这些结论。</p></aside>
    </main>
  );
}
