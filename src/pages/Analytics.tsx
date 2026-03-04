import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, Target, Award } from "lucide-react";

const monthlyData = [
  { name: "1月", accidents: 120, violations: 2300, resolved: 110 },
  { name: "2月", accidents: 98, violations: 1900, resolved: 95 },
  { name: "3月", accidents: 135, violations: 2500, resolved: 125 },
  { name: "4月", accidents: 110, violations: 2100, resolved: 108 },
  { name: "5月", accidents: 88, violations: 1800, resolved: 85 },
  { name: "6月", accidents: 142, violations: 2700, resolved: 130 },
  { name: "7月", accidents: 155, violations: 2900, resolved: 140 },
  { name: "8月", accidents: 128, violations: 2400, resolved: 122 },
  { name: "9月", accidents: 95, violations: 2000, resolved: 90 },
  { name: "10月", accidents: 105, violations: 2200, resolved: 100 },
  { name: "11月", accidents: 115, violations: 2150, resolved: 112 },
  { name: "12月", accidents: 102, violations: 1950, resolved: 98 },
];

const radarData = [
  { subject: "事故预防", A: 88 },
  { subject: "违章处理", A: 75 },
  { subject: "设备维护", A: 92 },
  { subject: "应急响应", A: 85 },
  { subject: "数据采集", A: 95 },
  { subject: "公众服务", A: 70 },
];

const districtData = [
  { name: "朝阳", value: 320 }, { name: "海淀", value: 280 },
  { name: "丰台", value: 245 }, { name: "东城", value: 190 },
  { name: "西城", value: 175 }, { name: "通州", value: 210 },
  { name: "大兴", value: 165 }, { name: "昌平", value: 150 },
];

const timePie = [
  { name: "早高峰 7-9", value: 32, color: "hsl(0 75% 55%)" },
  { name: "上午 9-12", value: 18, color: "hsl(40 90% 55%)" },
  { name: "午间 12-14", value: 12, color: "hsl(185 100% 50%)" },
  { name: "下午 14-17", value: 15, color: "hsl(260 80% 60%)" },
  { name: "晚高峰 17-20", value: 28, color: "hsl(0 75% 65%)" },
  { name: "夜间 20-7", value: 5, color: "hsl(150 70% 45%)" },
];

const yearlyComparison = [
  { month: "1月", thisYear: 120, lastYear: 145 }, { month: "2月", thisYear: 98, lastYear: 132 },
  { month: "3月", thisYear: 135, lastYear: 155 }, { month: "4月", thisYear: 110, lastYear: 128 },
  { month: "5月", thisYear: 88, lastYear: 115 }, { month: "6月", thisYear: 142, lastYear: 160 },
  { month: "7月", thisYear: 155, lastYear: 178 }, { month: "8月", thisYear: 128, lastYear: 150 },
  { month: "9月", thisYear: 95, lastYear: 120 }, { month: "10月", thisYear: 105, lastYear: 135 },
  { month: "11月", thisYear: 115, lastYear: 140 }, { month: "12月", thisYear: 102, lastYear: 125 },
];

const chartStyle = { background: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 20%)", borderRadius: 8 };

const Analytics = () => (
  <div className="p-6 space-y-6 grid-bg min-h-[calc(100vh-5rem)]">
    <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-title text-xl">数据分析中心</motion.h2>

    {/* KPI Summary */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "年度事故总量", value: "1,393", change: "↓ 12.5%", icon: TrendingDown, color: "hsl(150 70% 45%)", variant: "tech-card-success" },
        { label: "年度违章总量", value: "26.9万", change: "↑ 3.2%", icon: TrendingUp, color: "hsl(40 90% 55%)", variant: "tech-card-warning" },
        { label: "处理完结率", value: "93.8%", change: "↑ 2.1%", icon: Target, color: "hsl(185 100% 50%)", variant: "tech-card" },
        { label: "安全评分", value: "A+", change: "优秀", icon: Award, color: "hsl(260 80% 60%)", variant: "tech-card-accent" },
      ].map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className={s.variant}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="stat-number text-2xl mt-1" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] mt-0.5" style={{ color: s.color }}>{s.change}</p>
            </div>
            <s.icon className="w-5 h-5" style={{ color: s.color }} />
          </div>
        </motion.div>
      ))}
    </div>

    {/* Top Row: Monthly Trend */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="tech-card">
      <h3 className="section-title text-base">年度事故 & 违章趋势</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={monthlyData}>
          <XAxis dataKey="name" tick={{ fill: "hsl(200 10% 45%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="left" tick={{ fill: "hsl(200 10% 45%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="right" orientation="right" tick={{ fill: "hsl(200 10% 45%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={chartStyle} />
          <Line yAxisId="left" type="monotone" dataKey="accidents" stroke="hsl(0 75% 55%)" strokeWidth={2} dot={{ r: 3 }} name="事故数" />
          <Line yAxisId="left" type="monotone" dataKey="resolved" stroke="hsl(150 70% 45%)" strokeWidth={2} dot={{ r: 3 }} name="已处理" strokeDasharray="5 5" />
          <Line yAxisId="right" type="monotone" dataKey="violations" stroke="hsl(185 100% 50%)" strokeWidth={2} dot={{ r: 3 }} name="违章数" />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>

    {/* Year comparison */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="tech-card-warning">
      <h3 className="section-title text-base">同比分析（事故数）</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={yearlyComparison}>
          <defs>
            <linearGradient id="thisYG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(185 100% 50%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(185 100% 50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" tick={{ fill: "hsl(200 10% 40%)", fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "hsl(200 10% 40%)", fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={chartStyle} />
          <Area type="monotone" dataKey="lastYear" stroke="hsl(200 10% 40%)" fill="hsl(200 10% 20% / 0.3)" strokeWidth={1.5} strokeDasharray="5 5" name="去年" />
          <Area type="monotone" dataKey="thisYear" stroke="hsl(185 100% 50%)" fill="url(#thisYG)" strokeWidth={2} name="今年" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Radar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="tech-card-accent">
        <h3 className="section-title text-base">系统能力评估</h3>
        <ResponsiveContainer width="100%" height={250}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(220 20% 18%)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(200 10% 55%)", fontSize: 11 }} />
            <PolarRadiusAxis tick={false} axisLine={false} />
            <Radar name="能力" dataKey="A" stroke="hsl(260 80% 60%)" fill="hsl(260 80% 60%)" fillOpacity={0.2} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Time Distribution Pie */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="tech-card">
        <h3 className="section-title text-base">事故时段分布</h3>
        <ResponsiveContainer width="100%" height={190}>
          <PieChart>
            <Pie data={timePie} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" stroke="none">
              {timePie.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
            <Tooltip contentStyle={chartStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-2 mt-1">
          {timePie.map((d) => (
            <span key={d.name} className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: d.color }} />{d.name}
            </span>
          ))}
        </div>
      </motion.div>

      {/* District Bar Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="tech-card-success">
        <h3 className="section-title text-base">各区事故分布</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={districtData} layout="vertical">
            <XAxis type="number" tick={{ fill: "hsl(200 10% 45%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fill: "hsl(200 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
            <Tooltip contentStyle={chartStyle} />
            <Bar dataKey="value" fill="hsl(150 70% 45%)" radius={[0, 4, 4, 0]} opacity={0.8} name="事故数" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>

    {/* Bottom insights */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="tech-card">
      <h3 className="section-title text-base">数据洞察摘要</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "高发时段", desc: "早高峰（7:00-9:00）和晚高峰（17:00-20:00）为事故高发期，占全天60%以上", color: "hsl(0 75% 55%)" },
          { title: "改善趋势", desc: "与去年同期相比，事故总量下降12.5%，安全管理措施初见成效", color: "hsl(150 70% 45%)" },
          { title: "重点区域", desc: "朝阳区和海淀区事故数量位居前列，建议增加巡逻力量和监控设备", color: "hsl(40 90% 55%)" },
        ].map((insight) => (
          <div key={insight.title} className="p-4 rounded-lg" style={{ background: "hsl(220 25% 10%)", borderLeft: `3px solid ${insight.color}` }}>
            <p className="text-sm font-semibold mb-1" style={{ color: insight.color }}>{insight.title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{insight.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

export default Analytics;
