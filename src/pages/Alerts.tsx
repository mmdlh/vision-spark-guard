import { motion } from "framer-motion";
import { Bell, AlertTriangle, Shield, Siren, Radio, CheckCircle2, Clock, TrendingDown, Activity, Volume2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const alerts = [
  { id: 1, level: "紧急", title: "四惠桥西 — 重大交通事故", desc: "多车连环碰撞，已造成道路完全封闭，建议绕行。已启动一级应急响应。", time: "3分钟前", handled: false, icon: Siren },
  { id: 2, level: "高危", title: "机场高速 — 严重拥堵预警", desc: "拥堵指数达到9.2，预计持续至18:00。建议出行旅客提前安排。", time: "12分钟前", handled: false, icon: AlertTriangle },
  { id: 3, level: "中等", title: "望京地区 — 信号灯故障", desc: "望京南路3个路口信号灯系统异常，已派遣维修团队。临时交通管制已启动。", time: "28分钟前", handled: true, icon: Radio },
  { id: 4, level: "紧急", title: "西直门立交 — 危险品车辆泄漏", desc: "化工运输车辆发生轻微泄漏，已启动应急响应方案。周边500米已设警戒线。", time: "45分钟前", handled: false, icon: Shield },
  { id: 5, level: "低", title: "朝阳区 — 施工路段提醒", desc: "建国路东段进行道路维护，右侧车道封闭至明日6:00。", time: "1小时前", handled: true, icon: Bell },
  { id: 6, level: "中等", title: "海淀区 — 学校路段限速", desc: "中关村二小路段启动学校限速模式，限速30km/h。", time: "2小时前", handled: true, icon: Shield },
  { id: 7, level: "高危", title: "京藏高速 — 团雾预警", desc: "昌平至延庆段出现团雾，能见度不足100米，已启动雾区预警系统。", time: "2.5小时前", handled: false, icon: Volume2 },
  { id: 8, level: "低", title: "丰台区 — 临时交通管制", desc: "丰台体育场周边因大型活动实施临时交通管制，预计20:00解除。", time: "3小时前", handled: true, icon: Bell },
];

const levelStyle: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  "紧急": { bg: "hsl(0 75% 55% / 0.08)", border: "hsl(0 75% 55% / 0.3)", text: "hsl(0 75% 55%)", glow: "0 0 20px hsl(0 75% 55% / 0.15)" },
  "高危": { bg: "hsl(40 90% 55% / 0.08)", border: "hsl(40 90% 55% / 0.3)", text: "hsl(40 90% 55%)", glow: "0 0 20px hsl(40 90% 55% / 0.15)" },
  "中等": { bg: "hsl(185 100% 50% / 0.08)", border: "hsl(185 100% 50% / 0.3)", text: "hsl(185 100% 50%)", glow: "0 0 20px hsl(185 100% 50% / 0.15)" },
  "低": { bg: "hsl(150 70% 45% / 0.08)", border: "hsl(150 70% 45% / 0.3)", text: "hsl(150 70% 45%)", glow: "0 0 20px hsl(150 70% 45% / 0.15)" },
};

const hourlyAlerts = [
  { h: "06", count: 2 }, { h: "07", count: 5 }, { h: "08", count: 12 },
  { h: "09", count: 8 }, { h: "10", count: 6 }, { h: "11", count: 4 },
  { h: "12", count: 7 }, { h: "13", count: 9 }, { h: "14", count: 15 },
  { h: "15", count: 10 }, { h: "16", count: 8 }, { h: "17", count: 13 },
  { h: "18", count: 11 }, { h: "19", count: 6 }, { h: "20", count: 3 },
];

const weekTrend = [
  { name: "周一", total: 28, resolved: 25 }, { name: "周二", total: 35, resolved: 32 },
  { name: "周三", total: 22, resolved: 20 }, { name: "周四", total: 40, resolved: 35 },
  { name: "周五", total: 38, resolved: 33 }, { name: "周六", total: 18, resolved: 17 },
  { name: "周日", total: 12, resolved: 12 },
];

const chartStyle = { background: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 20%)", borderRadius: 8 };

const Alerts = () => (
  <div className="p-6 space-y-6 grid-bg min-h-[calc(100vh-5rem)]">
    <div className="flex items-center justify-between">
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-title text-xl">预警中心</motion.h2>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
        <span className="flex items-center gap-2 text-sm"><span className="pulse-dot-danger" /> 2 个紧急</span>
        <span className="flex items-center gap-2 text-sm"><span className="pulse-dot-warning" /> 2 个高危</span>
        <span className="flex items-center gap-2 text-sm"><span className="pulse-dot" /> 2 个中等</span>
        <span className="flex items-center gap-2 text-sm"><span className="pulse-dot-success" /> 2 个低级</span>
      </motion.div>
    </div>

    {/* Summary stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "今日总预警", value: 48, icon: Bell, color: "hsl(185 100% 50%)", variant: "tech-card" },
        { label: "未处理", value: 12, icon: AlertTriangle, color: "hsl(0 75% 55%)", variant: "tech-card-danger" },
        { label: "处理中", value: 8, icon: Activity, color: "hsl(40 90% 55%)", variant: "tech-card-warning" },
        { label: "已处理", value: 28, icon: CheckCircle2, color: "hsl(150 70% 45%)", variant: "tech-card-success" },
      ].map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className={s.variant}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="stat-number text-2xl mt-1" style={{ color: s.color }}>{s.value}</p>
            </div>
            <s.icon className="w-5 h-5" style={{ color: s.color }} />
          </div>
        </motion.div>
      ))}
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="tech-card">
        <h3 className="section-title text-base">今日预警时段分布</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={hourlyAlerts}>
            <XAxis dataKey="h" tick={{ fill: "hsl(200 10% 45%)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(200 10% 45%)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={chartStyle} />
            <Bar dataKey="count" fill="hsl(0 75% 55%)" radius={[3, 3, 0, 0]} opacity={0.8} name="预警数" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="tech-card-success">
        <h3 className="section-title text-base">本周预警处理趋势</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={weekTrend}>
            <defs>
              <linearGradient id="alertTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0 75% 55%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(0 75% 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tick={{ fill: "hsl(200 10% 40%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(200 10% 40%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={chartStyle} />
            <Area type="monotone" dataKey="total" stroke="hsl(0 75% 55%)" fill="url(#alertTotal)" strokeWidth={2} name="总预警" />
            <Area type="monotone" dataKey="resolved" stroke="hsl(150 70% 45%)" fill="hsl(150 70% 45% / 0.1)" strokeWidth={2} name="已处理" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>

    {/* Response metrics */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="tech-card">
      <h3 className="section-title text-base">响应效能指标</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "平均响应时间", value: "2.8分钟", color: "hsl(185 100% 50%)" },
          { label: "紧急处置率", value: "96.5%", color: "hsl(0 75% 55%)" },
          { label: "误报率", value: "3.2%", color: "hsl(150 70% 45%)" },
          { label: "联动出警", value: "18次", color: "hsl(40 90% 55%)" },
        ].map((m) => (
          <div key={m.label} className="text-center p-3 rounded-lg" style={{ background: "hsl(220 25% 10%)" }}>
            <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
            <p className="stat-number text-xl" style={{ color: m.color }}>{m.value}</p>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Alert cards */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {alerts.map((alert, i) => {
        const style = levelStyle[alert.level];
        return (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 + i * 0.08 }}
            className="relative rounded-lg p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{ background: style.bg, border: `1px solid ${style.border}`, boxShadow: style.glow }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${style.text}, transparent)` }} />
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg shrink-0" style={{ background: `${style.text}15` }}>
                <alert.icon className="w-6 h-6" style={{ color: style.text, filter: `drop-shadow(0 0 6px ${style.text})` }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${style.text}20`, color: style.text }}>{alert.level}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{alert.time}</span>
                  {alert.handled && (
                    <span className="flex items-center gap-1 text-xs" style={{ color: "hsl(150 70% 45%)" }}>
                      <CheckCircle2 className="w-3 h-3" /> 已处理
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-semibold mb-1">{alert.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{alert.desc}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

export default Alerts;
