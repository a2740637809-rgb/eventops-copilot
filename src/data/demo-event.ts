import type { EventProject, SourceRef } from "@/domain/types";

const briefSource: SourceRef = {
  documentId: "doc-brief",
  documentName: "品牌夏夜发布会需求简报.pdf",
  locator: "第 2 页 / 活动概况",
  quote: "活动日期：2026年8月22日；场地：澄屿艺术中心·潮汐厅。",
};
const venueSource: SourceRef = {
  documentId: "doc-venue",
  documentName: "澄屿艺术中心场地须知.docx",
  locator: "第 3 页 / 音量与撤场",
  quote: "21:30 后禁止高音量扩声，所有搭建物须于 23:00 前撤离。",
};
const chatSource: SourceRef = {
  documentId: "doc-chat",
  documentName: "客户确认记录.txt",
  locator: "第 18–23 行",
  quote: "客户确认嘉宾约 180 人；主理人希望 18:40 到场后先走台。",
};

export const demoEvent: EventProject = {
  id: "chengyu-launch-001",
  name: "澄屿品牌夏夜发布会",
  eventType: "商业品牌活动",
  date: "2026-08-22",
  status: "review",
  documents: [
    { id: "doc-brief", name: briefSource.documentName, type: "PDF", pages: 8 },
    { id: "doc-venue", name: venueSource.documentName, type: "DOCX", pages: 4 },
    { id: "doc-chat", name: chatSource.documentName, type: "TXT" },
    { id: "doc-budget", name: "活动预算拆分.xlsx", type: "XLSX" },
  ],
  facts: [
    { id: "date", field: "date", label: "活动日期", value: "2026-08-22", status: "confirmed", required: true, source: briefSource },
    { id: "venue", field: "venue", label: "活动场地", value: "澄屿艺术中心·潮汐厅", status: "confirmed", required: true, source: briefSource },
    { id: "guestCount", field: "guestCount", label: "预计人数", value: "180 人", status: "confirmed", required: true, source: chatSource },
    { id: "noiseLimit", field: "noiseLimit", label: "扩声限制", value: "21:30 后禁止高音量", status: "confirmed", required: true, source: venueSource },
    { id: "budget", field: "budget", label: "预算上限", value: "¥128,000", status: "confirmed", required: true, source: { documentId: "doc-budget", documentName: "活动预算拆分.xlsx", locator: "总表!B18", quote: "预算总额（含税）：128,000 元" } },
    { id: "rehearsal", field: "rehearsal", label: "主理人走台", value: "18:40–19:00", status: "conflict", required: true, source: chatSource },
    { id: "emergencyContact", field: "emergencyContact", label: "场地方应急联系人", value: null, status: "missing", required: true },
    { id: "allergy", field: "allergy", label: "嘉宾饮食禁忌", value: null, status: "missing", required: true },
    { id: "rainPlan", field: "rainPlan", label: "户外雨备启动标准", value: null, status: "missing", required: true },
    { id: "dressCode", field: "dressCode", label: "工作人员着装", value: "全黑无标识", status: "pending", required: false, source: chatSource },
  ],
  schedule: [
    { id: "checkin", start: "18:30", end: "18:50", title: "VIP 嘉宾签到", owner: "场控", location: "一层入口", provenance: "source", sources: [briefSource] },
    { id: "rehearsal", start: "18:40", end: "19:00", title: "主理人开场走台", owner: "场控", location: "潮汐厅主舞台", provenance: "source", sources: [chatSource] },
    { id: "opening", start: "19:08", end: "19:15", title: "主持开场与品牌短片", owner: "主持人", provenance: "source", sources: [briefSource] },
    { id: "keynote", start: "19:15", end: "19:35", title: "主理人主题发布", owner: "主持人", provenance: "source", sources: [briefSource] },
    { id: "networking", start: "20:30", end: "21:20", title: "自由交流与产品体验", owner: "客户接待", provenance: "template", sources: [] },
  ],
  issues: [
    { id: "schedule-checkin-rehearsal", type: "conflict", severity: "blocking", title: "场控在 18:40 存在任务重叠", description: "VIP 签到尚未结束，主理人走台已经开始。建议增加副场控或将走台提前。", factIds: ["checkin", "rehearsal"], resolved: false },
    { id: "missing-contact", type: "missing", severity: "blocking", title: "缺少场地方应急联系人", description: "无法建立断电、消防或设备故障的升级路径。", factIds: ["emergencyContact"], resolved: false },
    { id: "missing-allergy", type: "missing", severity: "warning", title: "未确认嘉宾饮食禁忌", description: "请在餐饮最终下单前向客户确认。", factIds: ["allergy"], resolved: false },
    { id: "missing-rain", type: "missing", severity: "warning", title: "未定义雨备启动标准", description: "入口签到位于半户外区域，需要明确切换时间与负责人。", factIds: ["rainPlan"], resolved: false },
  ],
  roles: [
    { id: "role-control", title: "总场控", detail: "统筹时间轴、放行各环节并记录现场变更", owner: "林序", provenance: "human", sources: [] },
    { id: "role-host", title: "主持人", detail: "开场、发布串联与超时压缩", owner: "周言", provenance: "source", sources: [briefSource] },
    { id: "role-venue", title: "场地方接口", detail: "设备、消防、撤场协调；具体联系人待确认", provenance: "template", sources: [venueSource] },
  ],
  materials: [
    { id: "mat-cue", title: "主持手卡", detail: "2 套，含应急口播与超时删减标记", due: "T−1 天", provenance: "template", sources: [] },
    { id: "mat-pass", title: "VIC 胸卡", detail: "40 张，按嘉宾名单编码", due: "T−2 天", provenance: "source", sources: [briefSource] },
    { id: "mat-power", title: "移动电源与转接头", detail: "签到台备用 2 套", due: "T−1 天", provenance: "template", sources: [] },
  ],
  risks: [
    { id: "risk-noise", title: "活动超时触发扩声限制", detail: "21:20 主持人口播收束；21:30 切换环境音乐", owner: "主持人 / 音控", provenance: "source", sources: [venueSource] },
    { id: "risk-rain", title: "签到区突发降雨", detail: "雨备标准与切换负责人尚未确认，不生成具体阈值", owner: "待确认", provenance: "template", sources: [] },
  ],
  runSteps: [
    { id: "run-1", name: "解析 4 份资料", status: "succeeded", durationMs: 2130, inputTokens: 0, outputTokens: 0, estimatedCostCny: 0, timestamp: "2026-07-30T09:12:08+08:00" },
    { id: "run-2", name: "抽取活动事实", status: "succeeded", durationMs: 4860, inputTokens: 6840, outputTokens: 1720, estimatedCostCny: 0.18, timestamp: "2026-07-30T09:12:13+08:00" },
    { id: "run-3", name: "规则冲突检查", status: "succeeded", durationMs: 84, inputTokens: 0, outputTokens: 0, estimatedCostCny: 0, timestamp: "2026-07-30T09:12:14+08:00" },
    { id: "run-4", name: "生成执行包", status: "simulated", durationMs: 3910, inputTokens: 5120, outputTokens: 2210, estimatedCostCny: 0.16, timestamp: "2026-07-30T09:12:19+08:00" },
  ],
};
