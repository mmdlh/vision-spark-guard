import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

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
  { name: "朝阳", value: 320 },
  { name: "海淀", value: 280 },
  { name: "丰台", value: 245 },
  { name: "东城", value: 190 },
  { name: "西城", value: 175 },
  { name: "通州", value: 210 },
  { name: "大兴", value: 165 },
  { name: "昌平", value: 150 },
];

const chartStyle = { background: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 20%)", borderRadius: 8 };

const Analytics = () => (
  <div className="p-6 space-y-6 grid-bg min-h-[calc(100vh-4rem)]">
    <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-title text-xl">数据分析中心</motion.h2>

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

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Radar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="tech-card-accent">
        <h3 className="section-title text-base">系统能力评估</h3>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(220 20% 18%)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(200 10% 55%)", fontSize: 11 }} />
            <PolarRadiusAxis tick={false} axisLine={false} />
            <Radar name="能力" dataKey="A" stroke="hsl(260 80% 60%)" fill="hsl(260 80% 60%)" fillOpacity={0.2} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* District Bar Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="tech-card-success">
        <h3 className="section-title text-base">各区事故分布</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={districtData} layout="vertical">
            <XAxis type="number" tick={{ fill: "hsl(200 10% 45%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fill: "hsl(200 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
            <Tooltip contentStyle={chartStyle} />
            <Bar dataKey="value" fill="hsl(150 70% 45%)" radius={[0, 4, 4, 0]} opacity={0.8} name="事故数" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  </div>
);

export default Analytics;
