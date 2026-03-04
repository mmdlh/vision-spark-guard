import { motion } from "framer-motion";
import { Navigation, Thermometer, Cloud, Wind, Eye, AlertTriangle } from "lucide-react";

const roads = [
  { name: "长安街", status: "畅通", speed: "52km/h", density: 32, color: "hsl(150 70% 45%)" },
  { name: "二环路", status: "缓行", speed: "28km/h", density: 65, color: "hsl(40 90% 55%)" },
  { name: "三环路", status: "拥堵", speed: "15km/h", density: 88, color: "hsl(0 75% 55%)" },
  { name: "四环路", status: "缓行", speed: "35km/h", density: 55, color: "hsl(40 90% 55%)" },
  { name: "五环路", status: "畅通", speed: "68km/h", density: 20, color: "hsl(150 70% 45%)" },
  { name: "京藏高速", status: "畅通", speed: "95km/h", density: 15, color: "hsl(150 70% 45%)" },
  { name: "京港澳高速", status: "缓行", speed: "42km/h", density: 50, color: "hsl(40 90% 55%)" },
  { name: "机场高速", status: "拥堵", speed: "12km/h", density: 92, color: "hsl(0 75% 55%)" },
];

const weather = { temp: "8°C", condition: "多云", wind: "北风3级", visibility: "12km", humidity: "45%" };

const RoadInfo = () => (
  <div className="p-6 space-y-6 grid-bg min-h-[calc(100vh-4rem)]">
    <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-title text-xl">路况信息中心</motion.h2>

    {/* Top: Weather + Map placeholder */}
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Weather Panel */}
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
        </div>
      </motion.div>

      {/* Simulated Map */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="tech-card lg:col-span-3 relative overflow-hidden" style={{ minHeight: 300 }}>
        <h3 className="section-title text-base">实时路况热力图</h3>
        <div className="absolute inset-0 mt-12 flex items-center justify-center">
          {/* Artistic grid map representation */}
          <div className="relative w-full h-full">
            {/* Concentric rings representing ring roads */}
            {[1, 2, 3, 4, 5].map((ring) => (
              <div
                key={ring}
                className="absolute rounded-full border"
                style={{
                  width: `${ring * 18}%`,
                  height: `${ring * 28}%`,
                  top: `${50 - ring * 14}%`,
                  left: `${50 - ring * 9}%`,
                  borderColor: ring <= 2 ? "hsl(150 70% 45% / 0.3)" : ring <= 4 ? "hsl(40 90% 55% / 0.3)" : "hsl(0 75% 55% / 0.2)",
                  boxShadow: `0 0 ${ring * 4}px ${ring <= 2 ? "hsl(150 70% 45% / 0.1)" : "hsl(40 90% 55% / 0.1)"}`,
                }}
              />
            ))}
            {/* Crosshair lines */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px]" style={{ background: "hsl(185 100% 50% / 0.15)" }} />
            <div className="absolute left-0 right-0 top-1/2 h-[1px]" style={{ background: "hsl(185 100% 50% / 0.15)" }} />
            {/* Hotspots */}
            {[
              { top: "30%", left: "55%", color: "hsl(0 75% 55%)", label: "三环拥堵" },
              { top: "65%", left: "40%", color: "hsl(40 90% 55%)", label: "二环缓行" },
              { top: "20%", left: "70%", color: "hsl(0 75% 55%)", label: "机场高速" },
            ].map((spot, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="absolute flex flex-col items-center"
                style={{ top: spot.top, left: spot.left }}
              >
                <div className="w-3 h-3 rounded-full" style={{ background: spot.color, boxShadow: `0 0 12px ${spot.color}` }} />
                <span className="text-[10px] mt-1 whitespace-nowrap" style={{ color: spot.color }}>{spot.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>

    {/* Road Status Table */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="tech-card">
      <h3 className="section-title text-base">主要道路实时状态</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        {roads.map((road, i) => (
          <motion.div
            key={road.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.05 }}
            className="flex items-center justify-between px-4 py-3 rounded-lg"
            style={{ background: `${road.color}08`, border: `1px solid ${road.color}20` }}
          >
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4" style={{ color: road.color }} />
              <span className="text-sm font-medium">{road.name}</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: `${road.color}20`, color: road.color }}>{road.status}</span>
              <p className="text-xs text-muted-foreground mt-1">{road.speed}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

export default RoadInfo;
