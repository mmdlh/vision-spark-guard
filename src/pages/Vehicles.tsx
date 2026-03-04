import { motion } from "framer-motion";
import { Car, Truck, Bus, Bike, Search, MoreHorizontal, TrendingUp, Shield, AlertTriangle, Wrench } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

const vehicleStats = [
  { type: "小型轿车", count: "8.2万", icon: Car, color: "hsl(185 100% 50%)" },
  { type: "大型货车", count: "1.8万", icon: Truck, color: "hsl(40 90% 55%)" },
  { type: "公共汽车", count: "6,200", icon: Bus, color: "hsl(150 70% 45%)" },
  { type: "摩托/电动车", count: "2.6万", icon: Bike, color: "hsl(260 80% 60%)" },
];

const vehicleList = [
  { plate: "京A·12345", type: "小型轿车", owner: "张三", status: "正常", inspection: "2026-08-15", insurance: "有效", mileage: "32,456km" },
  { plate: "京B·67890", type: "大型货车", owner: "李四", status: "违章未处理", inspection: "2026-03-20", insurance: "有效", mileage: "128,900km" },
  { plate: "京C·24680", type: "小型轿车", owner: "王五", status: "正常", inspection: "2026-11-30", insurance: "有效", mileage: "45,200km" },
  { plate: "京D·13579", type: "公共汽车", owner: "公交集团", status: "正常", inspection: "2026-06-10", insurance: "有效", mileage: "210,300km" },
  { plate: "京E·86420", type: "小型轿车", owner: "赵六", status: "保险过期", inspection: "2025-12-01", insurance: "过期", mileage: "67,800km" },
  { plate: "京F·97531", type: "摩托车", owner: "孙七", status: "正常", inspection: "2026-09-05", insurance: "有效", mileage: "12,100km" },
  { plate: "京G·55667", type: "大型货车", owner: "周八", status: "年检过期", inspection: "2025-11-20", insurance: "有效", mileage: "185,400km" },
  { plate: "京H·88234", type: "小型轿车", owner: "吴九", status: "正常", inspection: "2026-10-18", insurance: "有效", mileage: "28,700km" },
  { plate: "京J·11098", type: "公共汽车", owner: "公交集团", status: "维修中", inspection: "2026-04-22", insurance: "有效", mileage: "305,200km" },
];

const statusPie = [
  { name: "正常", value: 82, color: "hsl(150 70% 45%)" },
  { name: "违章未处理", value: 8, color: "hsl(40 90% 55%)" },
  { name: "过期/异常", value: 6, color: "hsl(0 75% 55%)" },
  { name: "维修中", value: 4, color: "hsl(260 80% 60%)" },
];

const monthlyReg = [
  { month: "1月", count: 1200 }, { month: "2月", count: 980 }, { month: "3月", count: 1450 },
  { month: "4月", count: 1380 }, { month: "5月", count: 1560 }, { month: "6月", count: 1290 },
];

const chartStyle = { background: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 20%)", borderRadius: 8 };

const Vehicles = () => (
  <div className="p-6 space-y-6 grid-bg min-h-[calc(100vh-5rem)]">
    <div className="flex items-center justify-between">
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-title text-xl">车辆管理中心</motion.h2>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tech-card flex items-center gap-2 px-4 py-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">搜索车牌号...</span>
      </motion.div>
    </div>

    {/* Vehicle Type Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {vehicleStats.map((v, i) => (
        <motion.div key={v.type} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="tech-card">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl float-animation" style={{ background: `${v.color}12`, boxShadow: `0 0 20px ${v.color}15` }}>
              <v.icon className="w-8 h-8" style={{ color: v.color }} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{v.type}</p>
              <p className="stat-number text-2xl" style={{ color: v.color }}>{v.count}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Quick stats row */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "年检合格率", value: "94.2%", icon: Shield, color: "hsl(150 70% 45%)", variant: "tech-card-success" },
        { label: "违章待处理", value: "2,847", icon: AlertTriangle, color: "hsl(40 90% 55%)", variant: "tech-card-warning" },
        { label: "本月新注册", value: "1,450", icon: TrendingUp, color: "hsl(185 100% 50%)", variant: "tech-card" },
        { label: "维修保养中", value: "326", icon: Wrench, color: "hsl(260 80% 60%)", variant: "tech-card-accent" },
      ].map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }} className={s.variant}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="stat-number text-xl mt-1" style={{ color: s.color }}>{s.value}</p>
            </div>
            <s.icon className="w-5 h-5" style={{ color: s.color }} />
          </div>
        </motion.div>
      ))}
    </div>

    {/* Charts row */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="tech-card-accent">
        <h3 className="section-title text-base">车辆状态分布</h3>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={statusPie} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" stroke="none">
              {statusPie.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
            <Tooltip contentStyle={chartStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-2 mt-1">
          {statusPie.map((d) => (
            <span key={d.name} className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: d.color }} />{d.name} {d.value}%
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="tech-card lg:col-span-2">
        <h3 className="section-title text-base">月度新车注册量</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyReg}>
            <XAxis dataKey="month" tick={{ fill: "hsl(200 10% 45%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(200 10% 45%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={chartStyle} />
            <Bar dataKey="count" fill="hsl(185 100% 50%)" radius={[4, 4, 0, 0]} opacity={0.8} name="注册量" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>

    {/* Vehicle Table */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="tech-card overflow-hidden">
      <h3 className="section-title text-base mb-4">车辆登记列表</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid hsl(220 20% 18%)" }}>
              {["车牌号", "类型", "所有人", "状态", "年检到期", "保险", "里程", "操作"].map((h) => (
                <th key={h} className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vehicleList.map((v, i) => (
              <motion.tr
                key={v.plate}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.04 }}
                className="hover:bg-secondary/30 transition-colors"
                style={{ borderBottom: "1px solid hsl(220 20% 14%)" }}
              >
                <td className="py-3 px-4 font-mono text-primary font-medium">{v.plate}</td>
                <td className="py-3 px-4">{v.type}</td>
                <td className="py-3 px-4">{v.owner}</td>
                <td className="py-3 px-4">
                  <span className="text-xs px-2 py-1 rounded-full" style={{
                    background: v.status === "正常" ? "hsl(150 70% 45% / 0.15)" : v.status === "维修中" ? "hsl(260 80% 60% / 0.15)" : "hsl(0 75% 55% / 0.15)",
                    color: v.status === "正常" ? "hsl(150 70% 45%)" : v.status === "维修中" ? "hsl(260 80% 60%)" : "hsl(0 75% 55%)",
                  }}>{v.status}</span>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{v.inspection}</td>
                <td className="py-3 px-4">
                  <span className="text-xs" style={{ color: v.insurance === "有效" ? "hsl(150 70% 45%)" : "hsl(0 75% 55%)" }}>{v.insurance}</span>
                </td>
                <td className="py-3 px-4 text-xs text-muted-foreground">{v.mileage}</td>
                <td className="py-3 px-4">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  </div>
);

export default Vehicles;
