"use client";

import { useMemo, useState } from "react";
import {
  ArrowSquareOut,
  CaretDown,
  ClockCounterClockwise,
  FileText,
  Package,
  ShieldWarning,
  UsersThree,
} from "@phosphor-icons/react";
import type { EventProject } from "@/domain/types";
import { calculateReadiness } from "@/domain/readiness";
import { canApprove } from "@/domain/approval";
import { StatusPill } from "@/components/ui/status-pill";

const tabs = ["事实核对", "问题中心", "执行包", "审批与工具", "运行轨迹"] as const;
type Tab = (typeof tabs)[number];

export function WorkspaceShell({ initialProject }: { initialProject: EventProject }) {
  const [project, setProject] = useState(initialProject);
  const [tab, setTab] = useState<Tab>("事实核对");
  const [openSource, setOpenSource] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const readiness = useMemo(() => calculateReadiness(project), [project]);
  const gate = useMemo(() => canApprove(project), [project]);

  function resolveIssue(id: string) {
    setProject((current) => ({
      ...current,
      issues: current.issues.map((issue) =>
        issue.id === id ? { ...issue, resolved: true } : issue,
      ),
    }));
  }

  function applyDemoConfirmations() {
    setProject((current) => ({
      ...current,
      issues: current.issues.map((issue) => ({ ...issue, resolved: true })),
      facts: current.facts.map((fact) =>
        fact.status === "missing" || fact.status === "conflict"
          ? { ...fact, value: fact.value ?? "合成确认值", status: "confirmed" as const }
          : fact,
      ),
    }));
  }

  function approve() {
    if (!gate.allowed) {
      setMessage(gate.reasons.join("；"));
      return;
    }
    setProject((current) => ({ ...current, status: "approved" }));
    setMessage("执行包已审批，可以继续模拟日历操作。");
  }

  return (
    <main className="workspace">
      <aside className="workspace__rail">
        <div>
          <span className="rail-label">ACTIVE EVENT</span>
          <h2>{project.name}</h2>
          <p>{project.eventType} · {project.date}</p>
        </div>
        <nav aria-label="工作台视图">
          {tabs.map((item, index) => (
            <button className={tab === item ? "is-active" : ""} key={item} onClick={() => setTab(item)}>
              <span>0{index + 1}</span>{item}
            </button>
          ))}
        </nav>
        <div className="rail-boundary">
          <StatusPill tone="synthetic">合成演示数据</StatusPill>
          <p>所有资料、运行记录与指标均为合成案例，不代表真实客户项目。</p>
        </div>
      </aside>

      <section className="workspace__main">
        <header className="workspace__top">
          <div>
            <span className="rail-label">EVENT READINESS</span>
            <strong>{readiness.score}%</strong>
          </div>
          <div className="readiness-bar"><span style={{ width: `${readiness.score}%` }} /></div>
          <p>{readiness.confirmedRequired}/{readiness.totalRequired} 项必填事实已确认 · {readiness.blockingCount} 项阻塞</p>
        </header>

        {tab === "事实核对" && (
          <div className="workspace-view">
            <ViewHeading eyebrow="SOURCE REGISTER" title="先确认事实，再放行方案。" detail="每项事实都区分来源、状态和置信边界；没有资料依据的内容保持空白。" />
            <div className="fact-grid">
              {project.facts.map((fact) => (
                <article className={`fact-card fact-card--${fact.status}`} key={fact.id}>
                  <div className="fact-card__head">
                    <span>{fact.label}</span>
                    <StatusPill tone={fact.status === "confirmed" ? "success" : fact.status === "conflict" ? "warning" : "neutral"}>
                      {{ confirmed: "已确认", pending: "待确认", conflict: "有冲突", missing: "缺失" }[fact.status]}
                    </StatusPill>
                  </div>
                  <strong>{fact.value ?? "等待补充"}</strong>
                  {fact.source ? (
                    <>
                      <button aria-label={`查看来源：${fact.label}`} className="source-toggle" onClick={() => setOpenSource(openSource === fact.id ? null : fact.id)}>
                        <FileText size={15} /> {fact.source.documentName}<CaretDown size={13} />
                      </button>
                      {openSource === fact.id && <blockquote><small>{fact.source.locator}</small>{fact.source.quote}</blockquote>}
                    </>
                  ) : <p className="no-source">未发现资料依据，系统不会补写</p>}
                </article>
              ))}
            </div>
          </div>
        )}

        {tab === "问题中心" && (
          <div className="workspace-view">
            <ViewHeading eyebrow="ISSUE DESK" title="把不确定性放到台面上。" detail="阻塞问题必须解决；警告项可带风险审批，但不会被模型自动补齐。" />
            <div className="issue-stack">
              {project.issues.map((issue) => (
                <article className={issue.resolved ? "issue is-resolved" : "issue"} key={issue.id}>
                  <ShieldWarning size={24} weight={issue.severity === "blocking" ? "fill" : "regular"} />
                  <div><span>{issue.severity === "blocking" ? "BLOCKER" : "WARNING"}</span><h3>{issue.title}</h3><p>{issue.description}</p></div>
                  <button disabled={issue.resolved} onClick={() => resolveIssue(issue.id)}>{issue.resolved ? "已处理" : "标记已处理"}</button>
                </article>
              ))}
            </div>
            <button className="demo-resolve" onClick={applyDemoConfirmations}>应用合成确认，解除全部阻塞</button>
          </div>
        )}

        {tab === "执行包" && (
          <div className="workspace-view">
            <ViewHeading eyebrow="EXECUTION PACK" title="一份真正能交给现场的版本。" detail="资料事实与行业模板建议分开标识；模板建议没有伪造引用。" />
            <div className="pack-section"><h3><ClockCounterClockwise /> 时间轴</h3>{project.schedule.map((item) => <div className="timeline-row" key={item.id}><time>{item.start}<small>{item.end}</small></time><div><strong>{item.title}</strong><span>{item.owner} · {item.location ?? "场内"}</span></div><Provenance value={item.provenance ?? "source"} /></div>)}</div>
            <div className="pack-columns">
              <PackList icon={<UsersThree />} title="岗位分工" items={project.roles} />
              <PackList icon={<Package />} title="物料清单" items={project.materials} />
              <PackList icon={<ShieldWarning />} title="风险预案" items={project.risks} />
            </div>
          </div>
        )}

        {tab === "审批与工具" && (
          <div className="workspace-view">
            <ViewHeading eyebrow="HUMAN GATE" title="AI 可以建议，放行必须由人。" detail="此公开版本仅模拟日历写入，不会访问或修改你的真实日历。" />
            <div className="approval-grid">
              <article className="approval-card">
                <span className="rail-label">01 / EXECUTION PACK</span>
                <h3>执行包审批</h3><p>{gate.allowed ? "所有阻塞项已解决，可以审批。" : gate.reasons.join("；")}</p>
                <button className="action-button" onClick={approve}>审批执行包</button>
              </article>
              <article className="approval-card">
                <span className="rail-label">02 / CALENDAR</span>
                <h3>创建 T−1 天总检查</h3><p>模式：模拟调用 · 不写入外部服务</p>
                <button className="action-button action-button--quiet" disabled={project.status !== "approved"} onClick={() => setMessage("模拟成功：已生成幂等键 evt_chengyu_t-1；未写入真实日历。")}>模拟日历操作 <ArrowSquareOut /></button>
              </article>
            </div>
            {message && <div className="gate-message" role="status">{message}</div>}
          </div>
        )}

        {tab === "运行轨迹" && (
          <div className="workspace-view">
            <ViewHeading eyebrow="RUN TRACE" title="知道每一步发生了什么。" detail="耗时、Token 与成本为合成演示记录，用于展示可观测性结构。" />
            <div className="trace-table">
              <div className="trace-row trace-head"><span>步骤</span><span>状态</span><span>耗时</span><span>Token</span><span>估算成本</span></div>
              {project.runSteps.map((step) => <div className="trace-row" key={step.id}><strong>{step.name}</strong><StatusPill tone={step.status === "succeeded" ? "success" : step.status === "simulated" ? "synthetic" : "warning"}>{step.status === "simulated" ? "模拟" : "成功"}</StatusPill><span>{step.durationMs} ms</span><span>{step.inputTokens + step.outputTokens}</span><span>¥{step.estimatedCostCny.toFixed(2)}</span></div>)}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function ViewHeading({ eyebrow, title, detail }: { eyebrow: string; title: string; detail: string }) {
  return <header className="view-heading"><span>{eyebrow}</span><h1>{title}</h1><p>{detail}</p></header>;
}
function Provenance({ value }: { value: "source" | "template" | "human" }) {
  return <span className={`provenance provenance--${value}`}>{{ source: "资料事实", template: "模板建议", human: "人工确认" }[value]}</span>;
}
function PackList({ icon, title, items }: { icon: React.ReactNode; title: string; items: EventProject["roles"] }) {
  return <section className="pack-list"><h3>{icon}{title}</h3>{items.map((item) => <article key={item.id}><div><strong>{item.title}</strong><p>{item.detail}</p></div><Provenance value={item.provenance} /></article>)}</section>;
}
