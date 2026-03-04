import { motion } from "framer-motion";
import { AlertTriangle, MapPin, Clock, User, ChevronRight, Filter } from "lucide-react";

const accidents = [
  { id: "A-20260304-001", time: "14:30", location: "二环辅路 × 建国门", severity: "严重", status: "处理中", casualties: 2, vehicles: 3, type: "追尾" },
  { id: "A-20260304-002", time: "13:15", location: "三环主路 × 国贸桥", severity: "一般", status: "已结案", casualties: 0, vehicles: 2, type: "刮擦" },
  { id: "A-20260304-003", time: "11:42", location: "长安街 × 王府井", severity: "重大", status: "处理中", casualties: 5, vehicles: 4, type: "连环碰撞" },
  { id: "A-20260304-004", time: "10:08", location: "四惠桥东", severity: "轻微", status: "已结案", casualties: 0, vehicles: 2, type: "侧碰" },
  { id: "A-20260304-005", time: "09:25", location: "西直门立交", severity: "一般", status: "调查中", casualties: 1, vehicles: 2, type: "追尾" },
  { id: "A-20260304-006", time: "08:10", location: "望京 SOHO 路口", severity: "轻微", status: "已结案", casualties: 0, vehicles: 2, type: "刮擦" },
];

const severityStyle: Record<string, { dot: string; bg: string; text: string }> = {
  "重大": { dot: "pulse-dot-danger", bg: "hsl(0 75% 55% / 0.1)", text: "hsl(0 75% 55%)" },
  "严重": { dot: "pulse-dot-warning", bg: "hsl(40 90% 55% / 0.1)", text: "hsl(40 90% 55%)" },
  "一般": { dot: "pulse-dot", bg: "hsl(185 100% 50% / 0.1)", text: "hsl(185 100% 50%)" },
  "轻微": { dot: "pulse-dot-success", bg: "hsl(150 70% 45% / 0.1)", text: "hsl(150 70% 45%)" },
};

const Accidents = () => {
  return (
    <div className="p-6 space-y-6 grid-bg min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-title text-xl">事故管理中心</motion.h2>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tech-card flex items-center gap-2 px-4 py-2 text-sm cursor-pointer">
          <Filter className="w-4 h-4 text-primary" /> 筛选条件
        </motion.button>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "今日总事故", value: 23, variant: "tech-card" },
          { label: "处理中", value: 8, variant: "tech-card-warning" },
          { label: "调查中", value: 3, variant: "tech-card-accent" },
          { label: "已结案", value: 12, variant: "tech-card-success" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={s.variant}>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="stat-number text-2xl mt-1" style={{ color: i === 0 ? "hsl(185 100% 50%)" : undefined }}>{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Accident List */}
      <div className="space-y-3">
        {accidents.map((acc, i) => {
          const sev = severityStyle[acc.severity];
          return (
            <motion.div
              key={acc.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
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
              <span className="text-xs px-2 py-1 rounded" style={{ background: acc.status === "已结案" ? "hsl(150 70% 45% / 0.15)" : "hsl(40 90% 55% / 0.15)", color: acc.status === "已结案" ? "hsl(150 70% 45%)" : "hsl(40 90% 55%)" }}>{acc.status}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Accidents;
