import { motion } from "framer-motion";
import { Camera, AlertCircle, Zap, Clock, TrendingUp, MapPin, Eye, Shield } from "lucide-react";
import MiniChart from "@/components/MiniChart";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const violationTypes = [
  { type: "超速行驶", count: 523, trend: "+8%", icon: Zap, color: "hsl(0 75% 55%)", variant: "tech-card-danger" },
  { type: "闯红灯", count: 312, trend: "+3%", icon: AlertCircle, color: "hsl(40 90% 55%)", variant: "tech-card-warning" },
  { type: "违规变道", count: 287, trend: "-5%", icon: TrendingUp, color: "hsl(185 100% 50%)", variant: "tech-card" },
  { type: "违规停车", count: 198, trend: "+12%", icon: Camera, color: "hsl(260 80% 60%)", variant: "tech-card-accent" },
  { type: "不系安全带", count: 156, trend: "-2%", icon: Shield, color: "hsl(150 70% 45%)", variant: "tech-card-success" },
  { type: "酒后驾驶", count: 42, trend: "-15%", icon: AlertCircle, color: "hsl(0 75% 55%)", variant: "tech-card-danger" },
];

const recentCaptures = [
  { plate: "京A·88921", type: "超速行驶", speed: "128km/h", limit: "80km/h", location: "三环主路", time: "14:32", fine: 200, points: 6 },
  { plate: "京B·33210", type: "违规变道", speed: "-", limit: "-", location: "长安街", time: "14:25", fine: 200, points: 3 },
  { plate: "京C·66745", type: "闯红灯", speed: "45km/h", limit: "-", location: "朝阳路口", time: "14:18", fine: 200, points: 6 },
  { plate: "京D·12098", type: "超速行驶", speed: "105km/h", limit: "60km/h", location: "西二旗桥", time: "14:10", fine: 200, points: 6 },
  { plate: "京E·55432", type: "违规停车", speed: "-", limit: "-", location: "中关村大街", time: "13:55", fine: 100, points: 0 },
  { plate: "京F·77881", type: "不系安全带", speed: "-", limit: "-", location: "东三环", time: "13:42", fine: 50, points: 2 },
  { plate: "京G·99012", type: "闯红灯", speed: "52km/h", limit: "-", location: "复兴门", time: "13:30", fine: 200, points: 6 },
];

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  name: `${i}时`,
  value: Math.floor(Math.random() * 80 + 20),
}));

const weekTrend = [
  { name: "周一", value: 245 }, { name: "周二", value: 312 }, { name: "周三", value: 289 },
  { name: "周四", value: 356 }, { name: "周五", value: 410 }, { name: "周六", value: 189 },
  { name: "周日", value: 152 },
];

const regionPie = [
  { name: "朝阳", value: 35, color: "hsl(185 100% 50%)" },
  { name: "海淀", value: 25, color: "hsl(260 80% 60%)" },
  { name: "丰台", value: 18, color: "hsl(40 90% 55%)" },
  { name: "东城", value: 12, color: "hsl(0 75% 55%)" },
  { name: "其他", value: 10, color: "hsl(150 70% 45%)" },
];

const chartStyle = { background: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 20%)", borderRadius: 8 };

const Violations = () => (
  <div className="p-6 space-y-6 grid-bg min-h-[calc(100vh-5rem)]">
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

    {/* Week trend + Region pie */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="tech-card lg:col-span-2">
        <h3 className="section-title">本周违章趋势</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={weekTrend}>
            <defs>
              <linearGradient id="vioGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(40 90% 55%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(40 90% 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tick={{ fill: "hsl(200 10% 40%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(200 10% 40%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={chartStyle} />
            <Area type="monotone" dataKey="value" stroke="hsl(40 90% 55%)" fill="url(#vioGrad)" strokeWidth={2} name="违章数" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="tech-card-accent">
        <h3 className="section-title">区域分布</h3>
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie data={regionPie} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value" stroke="none">
              {regionPie.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
            <Tooltip contentStyle={chartStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-2 mt-1">
          {regionPie.map((d) => (
            <span key={d.name} className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: d.color }} />{d.name}
            </span>
          ))}
        </div>
      </motion.div>
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
              <span className="text-xs text-muted-foreground">¥{c.fine}</span>
              <span className="text-xs" style={{ color: c.points > 0 ? "hsl(40 90% 55%)" : "hsl(150 70% 45%)" }}>{c.points}分</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{c.time}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{c.location}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>

    {/* Bottom summary */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="tech-card">
      <h3 className="section-title text-base">处罚统计概览</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "今日罚款总额", value: "¥36.8万", color: "hsl(0 75% 55%)" },
          { label: "今日扣分总计", value: "4,218分", color: "hsl(40 90% 55%)" },
          { label: "电子警察抓拍", value: "1,523次", color: "hsl(185 100% 50%)" },
          { label: "人工执法", value: "324次", color: "hsl(260 80% 60%)" },
        ].map((s) => (
          <div key={s.label} className="text-center p-3 rounded-lg" style={{ background: "hsl(220 25% 10%)" }}>
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p className="stat-number text-xl" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

export default Violations;
