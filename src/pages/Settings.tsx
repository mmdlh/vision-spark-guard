import { motion } from "framer-motion";
import { Settings as SettingsIcon, Users, Monitor, Database, Lock, Bell, Server, Wifi } from "lucide-react";

const systemStatus = [
  { name: "主数据库", status: "运行中", uptime: "99.98%", icon: Database, color: "hsl(150 70% 45%)" },
  { name: "视频服务", status: "运行中", uptime: "99.95%", icon: Monitor, color: "hsl(150 70% 45%)" },
  { name: "预警引擎", status: "运行中", uptime: "99.99%", icon: Bell, color: "hsl(150 70% 45%)" },
  { name: "AI分析节点", status: "负载较高", uptime: "98.50%", icon: Server, color: "hsl(40 90% 55%)" },
  { name: "边缘计算", status: "运行中", uptime: "99.90%", icon: Wifi, color: "hsl(150 70% 45%)" },
  { name: "安全网关", status: "运行中", uptime: "100%", icon: Lock, color: "hsl(185 100% 50%)" },
];

const users = [
  { name: "管理员", role: "超级管理员", lastLogin: "2026-03-04 14:20", status: "在线" },
  { name: "张巡警", role: "执法人员", lastLogin: "2026-03-04 13:45", status: "在线" },
  { name: "李调度", role: "调度中心", lastLogin: "2026-03-04 12:30", status: "在线" },
  { name: "王分析", role: "数据分析师", lastLogin: "2026-03-03 18:20", status: "离线" },
  { name: "陈维护", role: "运维工程师", lastLogin: "2026-03-04 09:10", status: "在线" },
];

const Settings = () => (
  <div className="p-6 space-y-6 grid-bg min-h-[calc(100vh-4rem)]">
    <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-title text-xl flex items-center gap-2">
      <SettingsIcon className="w-5 h-5 text-primary" /> 系统管理
    </motion.h2>

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
              transition={{ delay: 0.2 + i * 0.06 }}
              className="flex items-center justify-between px-4 py-3 rounded-lg"
              style={{ background: "hsl(220 25% 10%)" }}
            >
              <div className="flex items-center gap-3">
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
                <span className="text-sm font-medium">{s.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">可用率 {s.uptime}</span>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: s.color }}>
                  <span className={s.status === "运行中" || s.status === "负载较高" ? (s.status === "运行中" ? "pulse-dot-success" : "pulse-dot-warning") : "pulse-dot-danger"} style={{ width: 6, height: 6 }} />
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
              transition={{ delay: 0.3 + i * 0.06 }}
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
              <div className="text-right">
                <span className={`text-xs ${u.status === "在线" ? "" : "text-muted-foreground"}`} style={u.status === "在线" ? { color: "hsl(150 70% 45%)" } : {}}>● {u.status}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{u.lastLogin}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>

    {/* System Config Cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "数据备份", value: "每日 03:00", variant: "tech-card-success" },
        { label: "系统版本", value: "v3.8.2", variant: "tech-card" },
        { label: "授权到期", value: "2027-12-31", variant: "tech-card-accent" },
        { label: "安全等级", value: "等保三级", variant: "tech-card-warning" },
      ].map((c, i) => (
        <motion.div key={c.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.08 }} className={c.variant}>
          <p className="text-xs text-muted-foreground mb-1">{c.label}</p>
          <p className="text-lg font-semibold">{c.value}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Settings;
