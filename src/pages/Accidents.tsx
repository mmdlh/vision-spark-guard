import { motion } from "framer-motion";
import { AlertTriangle, MapPin, Clock, User, ChevronRight, Filter, TrendingDown, Activity, FileText, Phone } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const accidents = [
  { id: "A-20260304-001", time: "14:30", location: "二环辅路 × 建国门", severity: "严重", status: "处理中", casualties: 2, vehicles: 3, type: "追尾", responder: "朝阳中队" },
  { id: "A-20260304-002", time: "13:15", location: "三环主路 × 国贸桥", severity: "一般", status: "已结案", casualties: 0, vehicles: 2, type: "刮擦", responder: "CBD中队" },
  { id: "A-20260304-003", time: "11:42", location: "长安街 × 王府井", severity: "重大", status: "处理中", casualties: 5, vehicles: 4, type: "连环碰撞", responder: "东城中队" },
  { id: "A-20260304-004", time: "10:08", location: "四惠桥东", severity: "轻微", status: "已结案", casualties: 0, vehicles: 2, type: "侧碰", responder: "朝阳中队" },
  { id: "A-20260304-005", time: "09:25", location: "西直门立交", severity: "一般", status: "调查中", casualties: 1, vehicles: 2, type: "追尾", responder: "西城中队" },
  { id: "A-20260304-006", time: "08:10", location: "望京 SOHO 路口", severity: "轻微", status: "已结案", casualties: 0, vehicles: 2, type: "刮擦", responder: "望京中队" },
  { id: "A-20260304-007", time: "07:45", location: "京藏高速昌平段", severity: "严重", status: "已结案", casualties: 3, vehicles: 5, type: "连环追尾", responder: "高速中队" },
  { id: "A-20260304-008", time: "06:30", location: "南三环方庄桥", severity: "一般", status: "已结案", casualties: 0, vehicles: 2, type: "侧碰", responder: "丰台中队" },
];

const severityStyle: Record<string, { dot: string; bg: string; text: string }> = {
  "重大": { dot: "pulse-dot-danger", bg: "hsl(0 75% 55% / 0.1)", text: "hsl(0 75% 55%)" },
  "严重": { dot: "pulse-dot-warning", bg: "hsl(40 90% 55% / 0.1)", text: "hsl(40 90% 55%)" },
  "一般": { dot: "pulse-dot", bg: "hsl(185 100% 50% / 0.1)", text: "hsl(185 100% 50%)" },
  "轻微": { dot: "pulse-dot-success", bg: "hsl(150 70% 45% / 0.1)", text: "hsl(150 70% 45%)" },
};

const weeklyData = [
  { name: "周一", count: 28 }, { name: "周二", count: 22 }, { name: "周三", count: 35 },
  { name: "周四", count: 18 }, { name: "周五", count: 42 }, { name: "周六", count: 15 },
  { name: "周日", count: 12 },
];

const typePieData = [
  { name: "追尾", value: 42, color: "hsl(185 100% 50%)" },
  { name: "侧碰", value: 28, color: "hsl(260 80% 60%)" },
  { name: "刮擦", value: 18, color: "hsl(40 90% 55%)" },
  { name: "连环碰撞", value: 8, color: "hsl(0 75% 55%)" },
  { name: "翻车", value: 4, color: "hsl(150 70% 45%)" },
];

const chartStyle = { background: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 20%)", borderRadius: 8 };

const Accidents = () => {
  return (
    <div className="p-6 space-y-6 grid-bg min-h-[calc(100vh-5rem)]">
      <div className="flex items-center justify-between">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-title text-xl">事故管理中心</motion.h2>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
          <button className="tech-card flex items-center gap-2 px-4 py-2 text-sm cursor-pointer">
            <Filter className="w-4 h-4 text-primary" /> 筛选条件
          </button>
          <button className="tech-card flex items-center gap-2 px-4 py-2 text-sm cursor-pointer">
            <FileText className="w-4 h-4 text-accent" /> 导出报告
          </button>
        </motion.div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "今日总事故", value: 23, variant: "tech-card", icon: AlertTriangle, color: "hsl(185 100% 50%)" },
          { label: "处理中", value: 8, variant: "tech-card-warning", icon: Activity, color: "hsl(40 90% 55%)" },
          { label: "调查中", value: 3, variant: "tech-card-accent", icon: FileText, color: "hsl(260 80% 60%)" },
          { label: "已结案", value: 12, variant: "tech-card-success", icon: TrendingDown, color: "hsl(150 70% 45%)" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={s.variant}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="stat-number text-2xl mt-1" style={{ color: s.color }}>{s.value}</p>
              </div>
              <div className="p-2 rounded-lg" style={{ background: `${s.color}15` }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="tech-card lg:col-span-2">
          <h3 className="section-title text-base">本周事故统计</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="name" tick={{ fill: "hsl(200 10% 45%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(200 10% 45%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={chartStyle} />
              <Bar dataKey="count" fill="hsl(185 100% 50%)" radius={[4, 4, 0, 0]} opacity={0.8} name="事故数" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="tech-card-accent">
          <h3 className="section-title text-base">事故类型占比</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={typePieData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value" stroke="none">
                {typePieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={chartStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-1">
            {typePieData.map((d) => (
              <span key={d.name} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: d.color }} />{d.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Response stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="tech-card">
        <h3 className="section-title text-base">应急响应指标</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "平均响应时间", value: "4.2分钟", color: "cyan" },
            { label: "平均处理时长", value: "38分钟", color: "green" },
            { label: "今日出警次数", value: "18次", color: "orange" },
            { label: "救援成功率", value: "98.5%", color: "cyan" },
          ].map((m) => (
            <div key={m.label} className="text-center p-3 rounded-lg" style={{ background: "hsl(220 25% 10%)" }}>
              <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
              <p className="stat-number text-xl">{m.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Accident List */}
      <div className="space-y-3">
        <h3 className="section-title text-base">事故记录列表</h3>
        {accidents.map((acc, i) => {
          const sev = severityStyle[acc.severity];
          return (
            <motion.div
              key={acc.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.06 }}
              className="tech-card flex items-center gap-6 cursor-pointer group"
            >
              <div className="flex items-center gap-3 w-44 shrink-0">
                <div className={sev.dot} />
                <div>
                  <p className="text-sm font-mono text-foreground">{acc.id}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{acc.time}</p>
                </div>
              </div>
              <div className="flex-1 flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>{acc.location}</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: sev.bg, color: sev.text }}>{acc.severity}</span>
              <span className="text-xs px-3 py-1 rounded-full" style={{ background: "hsl(220 25% 14%)" }}>{acc.type}</span>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><User className="w-3 h-3" />{acc.casualties}人</span>
                <span>{acc.vehicles}车</span>
              </div>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" />{acc.responder}</span>
              <span className="text-xs px-2 py-1 rounded" style={{
                background: acc.status === "已结案" ? "hsl(150 70% 45% / 0.15)" : acc.status === "调查中" ? "hsl(260 80% 60% / 0.15)" : "hsl(40 90% 55% / 0.15)",
                color: acc.status === "已结案" ? "hsl(150 70% 45%)" : acc.status === "调查中" ? "hsl(260 80% 60%)" : "hsl(40 90% 55%)",
              }}>{acc.status}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Accidents;
