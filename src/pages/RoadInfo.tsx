import { motion } from "framer-motion";
import { Navigation, Thermometer, Cloud, Wind, Eye, AlertTriangle, TrendingUp, Clock, MapPin, Gauge } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const roads = [
  { name: "长安街", status: "畅通", speed: "52km/h", density: 32, color: "hsl(150 70% 45%)", length: "13.4km" },
  { name: "二环路", status: "缓行", speed: "28km/h", density: 65, color: "hsl(40 90% 55%)", length: "32.7km" },
  { name: "三环路", status: "拥堵", speed: "15km/h", density: 88, color: "hsl(0 75% 55%)", length: "48.3km" },
  { name: "四环路", status: "缓行", speed: "35km/h", density: 55, color: "hsl(40 90% 55%)", length: "65.3km" },
  { name: "五环路", status: "畅通", speed: "68km/h", density: 20, color: "hsl(150 70% 45%)", length: "98.6km" },
  { name: "京藏高速", status: "畅通", speed: "95km/h", density: 15, color: "hsl(150 70% 45%)", length: "112km" },
  { name: "京港澳高速", status: "缓行", speed: "42km/h", density: 50, color: "hsl(40 90% 55%)", length: "98km" },
  { name: "机场高速", status: "拥堵", speed: "12km/h", density: 92, color: "hsl(0 75% 55%)", length: "18.7km" },
];

const weather = { temp: "8°C", condition: "多云", wind: "北风3级", visibility: "12km", humidity: "45%", aqi: 68, aqiLevel: "良" };

const congestionTrend = [
  { time: "06:00", index: 2.1 }, { time: "07:00", index: 4.5 }, { time: "08:00", index: 7.8 },
  { time: "09:00", index: 6.2 }, { time: "10:00", index: 4.8 }, { time: "11:00", index: 4.1 },
  { time: "12:00", index: 5.2 }, { time: "13:00", index: 4.5 }, { time: "14:00", index: 4.6 },
  { time: "15:00", index: 5.0 }, { time: "16:00", index: 5.8 }, { time: "17:00", index: 7.5 },
  { time: "18:00", index: 8.2 }, { time: "19:00", index: 6.0 }, { time: "20:00", index: 3.8 },
];

const flowByRoad = [
  { name: "长安街", flow: 4200 }, { name: "二环", flow: 5800 },
  { name: "三环", flow: 7200 }, { name: "四环", flow: 6100 },
  { name: "五环", flow: 3500 }, { name: "京藏", flow: 2800 },
];

const incidents = [
  { location: "三环主路 × 国贸桥", type: "事故拥堵", time: "14:25", est: "~30分钟" },
  { location: "机场高速 T3出口", type: "车流量大", time: "13:50", est: "~45分钟" },
  { location: "西直门立交", type: "施工占道", time: "08:00", est: "至22:00" },
  { location: "南三环方庄桥", type: "事故处理", time: "14:10", est: "~15分钟" },
];

const chartStyle = { background: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 20%)", borderRadius: 8 };

const RoadInfo = () => (
  <div className="p-6 space-y-6 grid-bg min-h-[calc(100vh-5rem)]">
    <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-title text-xl">路况信息中心</motion.h2>

    {/* Top summary */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "路网拥堵指数", value: "4.6", desc: "轻度拥堵", color: "hsl(40 90% 55%)", icon: Gauge },
        { label: "平均车速", value: "38km/h", desc: "较昨日 -5%", color: "hsl(185 100% 50%)", icon: TrendingUp },
        { label: "拥堵路段", value: "12", desc: "条路段", color: "hsl(0 75% 55%)", icon: AlertTriangle },
        { label: "畅通率", value: "68%", desc: "较昨日 +3%", color: "hsl(150 70% 45%)", icon: Navigation },
      ].map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="tech-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="stat-number text-2xl mt-1" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{s.desc}</p>
            </div>
            <div className="p-2 rounded-lg" style={{ background: `${s.color}12` }}>
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Weather + Map */}
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="tech-card-accent">
        <h3 className="section-title text-base">天气状况</h3>
        <div className="space-y-4 mt-4">
          <div className="flex items-center gap-3">
            <Thermometer className="w-8 h-8" style={{ color: "hsl(40 90% 55%)" }} />
            <span className="stat-number text-3xl" style={{ color: "hsl(40 90% 55%)" }}>{weather.temp}</span>
          </div>
          {[
            { icon: Cloud, label: "天气", value: weather.condition },
            { icon: Wind, label: "风力", value: weather.wind },
            { icon: Eye, label: "能见度", value: weather.visibility },
          ].map((w) => (
            <div key={w.label} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground"><w.icon className="w-4 h-4" />{w.label}</span>
              <span>{w.value}</span>
            </div>
          ))}
          <div className="pt-3 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">湿度</span><span>{weather.humidity}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">空气质量</span>
              <span className="px-2 py-0.5 rounded text-xs" style={{ background: "hsl(150 70% 45% / 0.15)", color: "hsl(150 70% 45%)" }}>AQI {weather.aqi} {weather.aqiLevel}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="tech-card lg:col-span-3 relative overflow-hidden" style={{ minHeight: 300 }}>
        <h3 className="section-title text-base">实时路况热力图</h3>
        <div className="absolute inset-0 mt-12 flex items-center justify-center">
          <div className="relative w-full h-full">
            {[1, 2, 3, 4, 5].map((ring) => (
              <div key={ring} className="absolute rounded-full border"
                style={{
                  width: `${ring * 18}%`, height: `${ring * 28}%`,
                  top: `${50 - ring * 14}%`, left: `${50 - ring * 9}%`,
                  borderColor: ring <= 2 ? "hsl(150 70% 45% / 0.3)" : ring <= 4 ? "hsl(40 90% 55% / 0.3)" : "hsl(0 75% 55% / 0.2)",
                  boxShadow: `0 0 ${ring * 4}px ${ring <= 2 ? "hsl(150 70% 45% / 0.1)" : "hsl(40 90% 55% / 0.1)"}`,
                }}
              />
            ))}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px]" style={{ background: "hsl(185 100% 50% / 0.15)" }} />
            <div className="absolute left-0 right-0 top-1/2 h-[1px]" style={{ background: "hsl(185 100% 50% / 0.15)" }} />
            {[
              { top: "30%", left: "55%", color: "hsl(0 75% 55%)", label: "三环拥堵" },
              { top: "65%", left: "40%", color: "hsl(40 90% 55%)", label: "二环缓行" },
              { top: "20%", left: "70%", color: "hsl(0 75% 55%)", label: "机场高速" },
              { top: "45%", left: "30%", color: "hsl(150 70% 45%)", label: "长安街畅通" },
              { top: "75%", left: "60%", color: "hsl(40 90% 55%)", label: "四环缓行" },
            ].map((spot, i) => (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.15 }}
                className="absolute flex flex-col items-center" style={{ top: spot.top, left: spot.left }}>
                <div className="w-3 h-3 rounded-full" style={{ background: spot.color, boxShadow: `0 0 12px ${spot.color}` }} />
                <span className="text-[10px] mt-1 whitespace-nowrap" style={{ color: spot.color }}>{spot.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>

    {/* Congestion trend + Flow bar */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="tech-card-warning">
        <h3 className="section-title text-base">今日拥堵指数趋势</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={congestionTrend}>
            <defs>
              <linearGradient id="congGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(40 90% 55%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(40 90% 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tick={{ fill: "hsl(200 10% 40%)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(200 10% 40%)", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 10]} />
            <Tooltip contentStyle={chartStyle} />
            <Area type="monotone" dataKey="index" stroke="hsl(40 90% 55%)" fill="url(#congGrad)" strokeWidth={2} name="拥堵指数" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="tech-card">
        <h3 className="section-title text-base">主要道路车流量</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={flowByRoad}>
            <XAxis dataKey="name" tick={{ fill: "hsl(200 10% 45%)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(200 10% 45%)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={chartStyle} />
            <Bar dataKey="flow" fill="hsl(185 100% 50%)" radius={[4, 4, 0, 0]} opacity={0.8} name="车流量/h" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>

    {/* Incidents */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="tech-card-danger scan-line">
      <h3 className="section-title text-base">实时交通事件</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        {incidents.map((inc, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.08 }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg" style={{ background: "hsl(220 25% 10%)" }}>
            <AlertTriangle className="w-4 h-4 shrink-0" style={{ color: "hsl(0 75% 55%)" }} />
            <div className="flex-1">
              <p className="text-sm font-medium">{inc.location}</p>
              <p className="text-xs text-muted-foreground">{inc.type}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{inc.time}</p>
              <p className="text-[10px]" style={{ color: "hsl(40 90% 55%)" }}>预计{inc.est}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>

    {/* Road Status Table */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="tech-card">
      <h3 className="section-title text-base">主要道路实时状态</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        {roads.map((road, i) => (
          <motion.div key={road.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 + i * 0.05 }}
            className="flex items-center justify-between px-4 py-3 rounded-lg"
            style={{ background: `${road.color}08`, border: `1px solid ${road.color}20` }}>
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4" style={{ color: road.color }} />
              <div>
                <span className="text-sm font-medium">{road.name}</span>
                <p className="text-[10px] text-muted-foreground">{road.length}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: `${road.color}20`, color: road.color }}>{road.status}</span>
              <p className="text-xs text-muted-foreground mt-1">{road.speed} · 密度{road.density}%</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

export default RoadInfo;
