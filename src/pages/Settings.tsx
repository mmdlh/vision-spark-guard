import { motion } from "framer-motion";
import { Settings as SettingsIcon, Users, Monitor, Database, Lock, Bell, Server, Wifi, HardDrive, Clock, Shield, Activity, CheckCircle2, XCircle } from "lucide-react";

const systemStatus = [
  { name: "主数据库", status: "运行中", uptime: "99.98%", icon: Database, color: "hsl(150 70% 45%)", cpu: "32%", mem: "48%" },
  { name: "视频服务", status: "运行中", uptime: "99.95%", icon: Monitor, color: "hsl(150 70% 45%)", cpu: "67%", mem: "72%" },
  { name: "预警引擎", status: "运行中", uptime: "99.99%", icon: Bell, color: "hsl(150 70% 45%)", cpu: "45%", mem: "38%" },
  { name: "AI分析节点", status: "负载较高", uptime: "98.50%", icon: Server, color: "hsl(40 90% 55%)", cpu: "89%", mem: "85%" },
  { name: "边缘计算", status: "运行中", uptime: "99.90%", icon: Wifi, color: "hsl(150 70% 45%)", cpu: "52%", mem: "61%" },
  { name: "安全网关", status: "运行中", uptime: "100%", icon: Lock, color: "hsl(185 100% 50%)", cpu: "18%", mem: "24%" },
  { name: "日志服务", status: "运行中", uptime: "99.97%", icon: HardDrive, color: "hsl(150 70% 45%)", cpu: "28%", mem: "55%" },
  { name: "消息队列", status: "维护中", uptime: "97.20%", icon: Activity, color: "hsl(0 75% 55%)", cpu: "-", mem: "-" },
];

const users = [
  { name: "管理员", role: "超级管理员", lastLogin: "2026-03-04 14:20", status: "在线", actions: 128 },
  { name: "张巡警", role: "执法人员", lastLogin: "2026-03-04 13:45", status: "在线", actions: 45 },
  { name: "李调度", role: "调度中心", lastLogin: "2026-03-04 12:30", status: "在线", actions: 89 },
  { name: "王分析", role: "数据分析师", lastLogin: "2026-03-03 18:20", status: "离线", actions: 34 },
  { name: "陈维护", role: "运维工程师", lastLogin: "2026-03-04 09:10", status: "在线", actions: 67 },
  { name: "赵审计", role: "安全审计", lastLogin: "2026-03-04 10:35", status: "在线", actions: 22 },
];

const recentLogs = [
  { time: "14:32:18", user: "管理员", action: "修改预警阈值配置", type: "config" },
  { time: "14:25:03", user: "张巡警", action: "导出今日事故报告", type: "export" },
  { time: "14:18:45", user: "李调度", action: "派遣出警单 #20260304-018", type: "dispatch" },
  { time: "14:10:12", user: "陈维护", action: "重启 AI分析节点 服务", type: "system" },
  { time: "13:55:30", user: "管理员", action: "新增用户 赵审计", type: "user" },
  { time: "13:42:08", user: "王分析", action: "生成月度分析报告", type: "export" },
  { time: "13:30:15", user: "陈维护", action: "更新摄像头固件 v2.4.1", type: "system" },
];

const logTypeColor: Record<string, string> = {
  config: "hsl(185 100% 50%)", export: "hsl(260 80% 60%)",
  dispatch: "hsl(40 90% 55%)", system: "hsl(0 75% 55%)", user: "hsl(150 70% 45%)",
};

const Settings = () => (
  <div className="p-6 space-y-6 grid-bg min-h-[calc(100vh-5rem)]">
    <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-title text-xl flex items-center gap-2">
      <SettingsIcon className="w-5 h-5 text-primary" /> 系统管理
    </motion.h2>

    {/* System Config Cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "系统版本", value: "v3.8.2", desc: "最新版本", variant: "tech-card", icon: Shield, color: "hsl(185 100% 50%)" },
        { label: "数据备份", value: "每日 03:00", desc: "上次：今日 03:01", variant: "tech-card-success", icon: Database, color: "hsl(150 70% 45%)" },
        { label: "授权到期", value: "2027-12-31", desc: "剩余 668 天", variant: "tech-card-accent", icon: Lock, color: "hsl(260 80% 60%)" },
        { label: "安全等级", value: "等保三级", desc: "合规认证", variant: "tech-card-warning", icon: Shield, color: "hsl(40 90% 55%)" },
      ].map((c, i) => (
        <motion.div key={c.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className={c.variant}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{c.label}</p>
              <p className="text-lg font-semibold mt-0.5">{c.value}</p>
              <p className="text-[10px] text-muted-foreground">{c.desc}</p>
            </div>
            <c.icon className="w-5 h-5" style={{ color: c.color }} />
          </div>
        </motion.div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* System Status */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="tech-card">
        <h3 className="section-title text-base">系统服务状态</h3>
        <div className="space-y-3 mt-4">
          {systemStatus.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="flex items-center justify-between px-4 py-3 rounded-lg"
              style={{ background: "hsl(220 25% 10%)" }}
            >
              <div className="flex items-center gap-3">
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
                <span className="text-sm font-medium">{s.name}</span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                {s.cpu !== "-" && (
                  <span className="text-muted-foreground">CPU {s.cpu} · RAM {s.mem}</span>
                )}
                <span className="text-muted-foreground">可用率 {s.uptime}</span>
                <span className="flex items-center gap-1.5" style={{ color: s.color }}>
                  {s.status === "维护中" ? <XCircle className="w-3 h-3" /> :
                    <span className={s.status === "运行中" ? "pulse-dot-success" : "pulse-dot-warning"} style={{ width: 6, height: 6 }} />}
                  {s.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* User Management */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="tech-card-accent">
        <h3 className="section-title text-base flex items-center gap-2"><Users className="w-4 h-4 text-accent" /> 用户管理</h3>
        <div className="space-y-3 mt-4">
          {users.map((u, i) => (
            <motion.div
              key={u.name}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="flex items-center justify-between px-4 py-3 rounded-lg"
              style={{ background: "hsl(220 25% 10%)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "hsl(260 80% 60% / 0.2)", color: "hsl(260 80% 60%)" }}>
                  {u.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-muted-foreground">今日操作 {u.actions}次</span>
                <div className="text-right">
                  <span className={`text-xs ${u.status === "在线" ? "" : "text-muted-foreground"}`} style={u.status === "在线" ? { color: "hsl(150 70% 45%)" } : {}}>● {u.status}</span>
                  <p className="text-[10px] text-muted-foreground">{u.lastLogin}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>

    {/* Operation Logs */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="tech-card scan-line">
      <h3 className="section-title text-base flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> 操作日志</h3>
      <div className="space-y-2 mt-4">
        {recentLogs.map((log, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.05 }}
            className="flex items-center gap-4 px-4 py-2.5 rounded-md" style={{ background: "hsl(220 25% 10%)" }}>
            <span className="text-xs font-mono text-muted-foreground w-16 shrink-0">{log.time}</span>
            <span className="text-xs px-2 py-0.5 rounded" style={{ background: `${logTypeColor[log.type]}15`, color: logTypeColor[log.type] }}>{log.user}</span>
            <span className="text-sm flex-1">{log.action}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>

    {/* Resource usage summary */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="tech-card">
      <h3 className="section-title text-base">资源使用概览</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "存储空间", value: 72, total: "2TB / 2.8TB", color: "orange" },
          { label: "数据库容量", value: 45, total: "180GB / 400GB", color: "cyan" },
          { label: "带宽使用", value: 58, total: "580Mbps / 1Gbps", color: "green" },
          { label: "API调用量", value: 83, total: "83万 / 100万/日", color: "red" },
        ].map((r) => (
          <div key={r.label} className="p-3 rounded-lg" style={{ background: "hsl(220 25% 10%)" }}>
            <p className="text-xs text-muted-foreground mb-2">{r.label}</p>
            <div className="progress-bar mb-1">
              <div className={`progress-bar-fill ${r.color}`} style={{ width: `${r.value}%` }} />
            </div>
            <p className="text-[10px] text-muted-foreground">{r.total}</p>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

export default Settings;
