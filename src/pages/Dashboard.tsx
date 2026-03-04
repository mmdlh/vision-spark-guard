import { motion } from "framer-motion";
import { Shield, AlertTriangle, Car, Eye, TrendingUp, Users, MapPin, Clock, Activity, Gauge, Radio, Cpu } from "lucide-react";
import StatCard from "@/components/StatCard";
import MiniChart from "@/components/MiniChart";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const trendData = [
  { name: "01", value: 42 }, { name: "02", value: 38 }, { name: "03", value: 55 },
  { name: "04", value: 47 }, { name: "05", value: 62 }, { name: "06", value: 51 },
  { name: "07", value: 44 }, { name: "08", value: 72 }, { name: "09", value: 65 },
  { name: "10", value: 58 }, { name: "11", value: 49 }, { name: "12", value: 53 },
];

const pieData = [
  { name: "追尾", value: 35, color: "hsl(185 100% 50%)" },
  { name: "侧碰", value: 25, color: "hsl(260 80% 60%)" },
  { name: "闯红灯", value: 20, color: "hsl(40 90% 55%)" },
  { name: "超速", value: 15, color: "hsl(0 75% 55%)" },
  { name: "其他", value: 5, color: "hsl(150 70% 45%)" },
];

const realtimeLogs = [
  { time: "14:32:18", type: "warning", text: "京A·88921 超速行驶 — 三环主路" },
  { time: "14:30:05", type: "danger", text: "二环辅路发生追尾事故 — 已派遣" },
  { time: "14:28:41", type: "info", text: "路口摄像头 #2847 在线恢复" },
  { time: "14:25:12", type: "warning", text: "京B·33210 违规变道 — 长安街" },
  { time: "14:22:30", type: "success", text: "朝阳区信号灯系统巡检完成" },
  { time: "14:19:55", type: "danger", text: "四惠桥西 严重拥堵预警" },
  { time: "14:17:03", type: "info", text: "海淀区新增监控点位 #3102 已上线" },
  { time: "14:14:22", type: "success", text: "西城区电子警察批量更新完成" },
];

const typeColor: Record<string, string> = {
  warning: "hsl(40 90% 55%)",
  danger: "hsl(0 75% 55%)",
  info: "hsl(185 100% 50%)",
  success: "hsl(150 70% 45%)",
};

const dotClass: Record<string, string> = {
  warning: "pulse-dot-warning",
  danger: "pulse-dot-danger",
  info: "pulse-dot",
  success: "pulse-dot-success",
};

const hourlyTraffic = [
  { h: "06", flow: 1200 }, { h: "07", flow: 3500 }, { h: "08", flow: 5800 },
  { h: "09", flow: 4200 }, { h: "10", flow: 3100 }, { h: "11", flow: 2800 },
  { h: "12", flow: 3400 }, { h: "13", flow: 3000 }, { h: "14", flow: 2900 },
  { h: "15", flow: 3200 }, { h: "16", flow: 3800 }, { h: "17", flow: 5200 },
  { h: "18", flow: 6100 }, { h: "19", flow: 4500 }, { h: "20", flow: 3000 },
  { h: "21", flow: 2200 }, { h: "22", flow: 1500 },
];

const radarData = [
  { subject: "监控覆盖", A: 92 },
  { subject: "响应速度", A: 85 },
  { subject: "事故预防", A: 78 },
  { subject: "违章检出", A: 90 },
  { subject: "设备可用", A: 96 },
  { subject: "数据质量", A: 88 },
];

const chartStyle = { background: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 20%)", borderRadius: 8 };

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 grid-bg min-h-[calc(100vh-5rem)]">
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={AlertTriangle} title="今日事故" value={23} change="较昨日 -12%" changeType="down" variant="danger" delay={0} />
        <StatCard icon={Eye} title="违章记录" value={1847} change="较昨日 +5%" changeType="up" variant="warning" delay={0.1} />
        <StatCard icon={Car} title="在线车辆" value="12.8万" change="实时监控中" variant="success" delay={0.2} />
        <StatCard icon={Shield} title="安全指数" value="92.4" change="较上周 +2.1" changeType="up" variant="default" delay={0.3} />
      </div>

      {/* Second Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Gauge} title="路网拥堵指数" value="4.6" change="轻度拥堵" variant="warning" delay={0.15} />
        <StatCard icon={Radio} title="在线设备" value="8,421" change="在线率 98.7%" changeType="up" variant="default" delay={0.2} />
        <StatCard icon={Cpu} title="AI识别量" value="52.3万" change="今日处理" variant="success" delay={0.25} />
        <StatCard icon={Users} title="执勤人员" value={342} change="当前在岗" variant="default" delay={0.3} />
      </div>

      {/* Middle Row: Trend + Pie + Realtime */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Trend Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="tech-card lg:col-span-2">
          <h3 className="section-title">月度事故趋势</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(185 100% 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(185 100% 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fill: "hsl(200 10% 40%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(200 10% 40%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={chartStyle} />
              <Area type="monotone" dataKey="value" stroke="hsl(185 100% 50%)" fill="url(#trendGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="tech-card-accent">
          <h3 className="section-title">事故类型分布</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" stroke="none">
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={chartStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2">
            {pieData.map((d) => (
              <span key={d.name} className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                {d.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Hourly traffic + Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="tech-card-warning lg:col-span-2">
          <h3 className="section-title">今日交通流量（小时分布）</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={hourlyTraffic}>
              <XAxis dataKey="h" tick={{ fill: "hsl(200 10% 40%)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(200 10% 40%)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={chartStyle} />
              <Bar dataKey="flow" fill="hsl(40 90% 55%)" radius={[3, 3, 0, 0]} opacity={0.8} name="车流量" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="tech-card-accent">
          <h3 className="section-title">系统能力雷达</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(220 20% 18%)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(200 10% 55%)", fontSize: 10 }} />
              <PolarRadiusAxis tick={false} axisLine={false} />
              <Radar dataKey="A" stroke="hsl(260 80% 60%)" fill="hsl(260 80% 60%)" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Realtime Log */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="tech-card scan-line lg:col-span-2">
          <h3 className="section-title">实时动态</h3>
          <div className="space-y-3">
            {realtimeLogs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                className="flex items-center gap-3 px-3 py-2 rounded-md"
                style={{ background: `${typeColor[log.type]}08` }}
              >
                <div className={dotClass[log.type]} />
                <span className="text-xs font-mono text-muted-foreground w-16 shrink-0">{log.time}</span>
                <span className="text-sm" style={{ color: typeColor[log.type] }}>{log.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="tech-card-success space-y-4">
          <h3 className="section-title">快捷统计</h3>
          {[
            { label: "设备在线率", value: 96, color: "cyan" },
            { label: "出警响应率", value: 89, color: "green" },
            { label: "路口覆盖率", value: 78, color: "orange" },
            { label: "今日处理率", value: 64, color: "red" },
            { label: "AI识别准确率", value: 94, color: "cyan" },
            { label: "数据同步率", value: 99, color: "green" },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="text-foreground font-medium">{item.value}%</span>
              </div>
              <div className="progress-bar">
                <div className={`progress-bar-fill ${item.color}`} style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Key road status strip */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="tech-card">
        <h3 className="section-title">重点路段实时状态</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { name: "长安街", status: "畅通", color: "hsl(150 70% 45%)" },
            { name: "二环路", status: "缓行", color: "hsl(40 90% 55%)" },
            { name: "三环路", status: "拥堵", color: "hsl(0 75% 55%)" },
            { name: "四环路", status: "缓行", color: "hsl(40 90% 55%)" },
            { name: "五环路", status: "畅通", color: "hsl(150 70% 45%)" },
            { name: "机场高速", status: "拥堵", color: "hsl(0 75% 55%)" },
          ].map((r, i) => (
            <motion.div key={r.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.85 + i * 0.05 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: `${r.color}10`, border: `1px solid ${r.color}25` }}>
              <MapPin className="w-3 h-3" style={{ color: r.color }} />
              <span className="text-xs font-medium">{r.name}</span>
              <span className="text-[10px] ml-auto px-1.5 py-0.5 rounded" style={{ background: `${r.color}20`, color: r.color }}>{r.status}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
