import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle,
  FileText,
  ShieldWarning,
} from "@phosphor-icons/react/dist/ssr";

const stations = [
  { time: "T−21d", title: "资料入场", detail: "Word / PDF / 表格 / 文本" },
  { time: "T−14d", title: "事实核对", detail: "来源、缺项与冲突" },
  { time: "T−07d", title: "执行包", detail: "时间轴、岗位、物料、风险" },
  { time: "T−01d", title: "人工放行", detail: "审批后才执行外部操作" },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero__eyebrow">
          <span>AI 活动运营 Agent</span>
          <span>Portfolio build / 2026</span>
        </div>
        <div className="hero__grid">
          <div className="hero__copy">
            <p className="kicker">先核对，后生成</p>
            <h1>
              把散落的活动资料，
              <em>变成能上现场的执行包。</em>
            </h1>
            <p className="hero__lead">
              EventOps Copilot 从方案、场地规则和聊天记录中提取事实，
              主动暴露缺项与冲突；每个关键结论都能回到原始依据。
            </p>
            <div className="hero__actions">
              <Link className="button button--primary" href="/workspace">
                进入合成 Demo <ArrowUpRight weight="bold" />
              </Link>
              <Link className="button button--quiet" href="/case-study">
                查看产品决策
              </Link>
            </div>
          </div>
          <aside className="dispatch-card" aria-label="今日执行状态">
            <div className="dispatch-card__top">
              <span>RUN OF SHOW</span>
              <strong>CHENGYU / 001</strong>
            </div>
            <div className="dispatch-card__status">
              <span className="signal" />
              <div>
                <small>当前状态</small>
                <strong>等待 4 项关键信息确认</strong>
              </div>
            </div>
            <dl>
              <div>
                <dt>资料事实</dt>
                <dd>12</dd>
              </div>
              <div>
                <dt>冲突</dt>
                <dd className="text-warning">01</dd>
              </div>
              <div>
                <dt>无依据生成</dt>
                <dd>00</dd>
              </div>
            </dl>
            <p>
              <ShieldWarning size={18} weight="fill" />
              未解决阻塞项前，执行包不可放行。
            </p>
          </aside>
        </div>
        <div className="runline" aria-label="活动准备流程">
          {stations.map((station, index) => (
            <div className="runline__station" key={station.time}>
              <span className="runline__index">{index + 1}</span>
              <time>{station.time}</time>
              <strong>{station.title}</strong>
              <small>{station.detail}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="truth-section">
        <div>
          <p className="kicker">产品不是写作助手</p>
          <h2>现场真正怕的，不是文案不够漂亮。</h2>
        </div>
        <div className="truth-grid">
          <article>
            <FileText size={25} />
            <h3>事实有出处</h3>
            <p>关键时间、地点和禁忌都保留文件、位置与原文片段。</p>
          </article>
          <article>
            <ShieldWarning size={25} />
            <h3>不确定就提问</h3>
            <p>资料没有说明的字段保持空白，不用模型常识偷偷补齐。</p>
          </article>
          <article>
            <CheckCircle size={25} />
            <h3>操作先审批</h3>
            <p>日历与任务写入前展示完整变更，得到人工确认才执行。</p>
          </article>
        </div>
      </section>

      <section className="boundary-strip">
        <strong>真实性边界</strong>
        <p>
          当前版本使用明确标注的合成案例与合成评测；尚未进行真实从业者测试，
          不展示虚构反馈或效率提升。
        </p>
        <Link href="/evaluation">查看评测口径 →</Link>
      </section>
    </main>
  );
}
