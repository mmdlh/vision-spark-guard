import { motion } from "framer-motion";
import { Camera, AlertCircle, Zap, Clock, TrendingUp } from "lucide-react";
import MiniChart from "@/components/MiniChart";

const violationTypes = [
  { type: "超速行驶", count: 523, trend: "+8%", icon: Zap, color: "hsl(0 75% 55%)", variant: "tech-card-danger" },
  { type: "闯红灯", count: 312, trend: "+3%", icon: AlertCircle, color: "hsl(40 90% 55%)", variant: "tech-card-warning" },
  { type: "违规变道", count: 287, trend: "-5%", icon: TrendingUp, color: "hsl(185 100% 50%)", variant: "tech-card" },
  { type: "违规停车", count: 198, trend: "+12%", icon: Camera, color: "hsl(260 80% 60%)", variant: "tech-card-accent" },
  { type: "不系安全带", count: 156, trend: "-2%", icon: AlertCircle, color: "hsl(150 70% 45%)", variant: "tech-card-success" },
  { type: "酒后驾驶", count: 42, trend: "-15%", icon: Zap, color: "hsl(0 75% 55%)", variant: "tech-card-danger" },
];

const recentCaptures = [
  { plate: "京A·88921", type: "超速行驶", speed: "128km/h", limit: "80km/h", location: "三环主路", time: "14:32" },
  { plate: "京B·33210", type: "违规变道", speed: "-", limit: "-", location: "长安街", time: "14:25" },
  { plate: "京C·66745", type: "闯红灯", speed: "45km/h", limit: "-", location: "朝阳路口", time: "14:18" },
  { plate: "京D·12098", type: "超速行驶", speed: "105km/h", limit: "60km/h", location: "西二旗桥", time: "14:10" },
  { plate: "京E·55432", type: "违规停车", speed: "-", limit: "-", location: "中关村大街", time: "13:55" },
];

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  name: `${i}时`,
  value: Math.floor(Math.random() * 80 + 20),
}));

const Violations = () => (
  <div className="p-6 space-y-6 grid-bg min-h-[calc(100vh-4rem)]">
    <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-title text-xl">违章监控中心</motion.h2>

    {/* Violation Type Cards */}
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {violationTypes.map((v, i) => (
        <motion.div key={v.type} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }} className={v.variant}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground">{v.type}</p>
              <p className="stat-number text-2xl mt-1" style={{ color: v.color }}>{v.count}</p>
            </div>
            <div className="p-2 rounded-lg" style={{ background: `${v.color}15` }}>
              <v.icon className="w-5 h-5" style={{ color: v.color }} />
            </div>
          </div>
          <span className="text-xs" style={{ color: v.trend.startsWith("+") ? "hsl(0 75% 55%)" : "hsl(150 70% 45%)" }}>{v.trend} 较昨日</span>
        </motion.div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      {/* Hourly Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="tech-card lg:col-span-2">
        <h3 className="section-title">24小时违章分布</h3>
        <MiniChart data={hourlyData} type="bar" color="hsl(260 80% 60%)" height={200} />
      </motion.div>

      {/* Recent Captures */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="tech-card-accent lg:col-span-3 scan-line">
        <h3 className="section-title">最近抓拍记录</h3>
        <div className="space-y-2">
          {recentCaptures.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.06 }}
              className="flex items-center gap-4 px-3 py-2 rounded-md"
              style={{ background: "hsl(220 25% 10%)" }}
            >
              <span className="font-mono text-sm text-primary font-medium w-24">{c.plate}</span>
              <span className="text-sm flex-1">{c.type}</span>
              {c.speed !== "-" && (
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: "hsl(0 75% 55% / 0.15)", color: "hsl(0 75% 55%)" }}>{c.speed}</span>
              )}
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{c.time}</span>
              <span className="text-xs text-muted-foreground">{c.location}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

export default Violations;
