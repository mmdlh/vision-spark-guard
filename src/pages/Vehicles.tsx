import { motion } from "framer-motion";
import { Car, Truck, Bus, Bike, Search, MoreHorizontal } from "lucide-react";

const vehicleStats = [
  { type: "小型轿车", count: "8.2万", icon: Car, color: "hsl(185 100% 50%)" },
  { type: "大型货车", count: "1.8万", icon: Truck, color: "hsl(40 90% 55%)" },
  { type: "公共汽车", count: "6,200", icon: Bus, color: "hsl(150 70% 45%)" },
  { type: "摩托/电动车", count: "2.6万", icon: Bike, color: "hsl(260 80% 60%)" },
];

const vehicleList = [
  { plate: "京A·12345", type: "小型轿车", owner: "张三", status: "正常", inspection: "2026-08-15", insurance: "有效" },
  { plate: "京B·67890", type: "大型货车", owner: "李四", status: "违章未处理", inspection: "2026-03-20", insurance: "有效" },
  { plate: "京C·24680", type: "小型轿车", owner: "王五", status: "正常", inspection: "2026-11-30", insurance: "有效" },
  { plate: "京D·13579", type: "公共汽车", owner: "公交集团", status: "正常", inspection: "2026-06-10", insurance: "有效" },
  { plate: "京E·86420", type: "小型轿车", owner: "赵六", status: "保险过期", inspection: "2025-12-01", insurance: "过期" },
  { plate: "京F·97531", type: "摩托车", owner: "孙七", status: "正常", inspection: "2026-09-05", insurance: "有效" },
  { plate: "京G·55667", type: "大型货车", owner: "周八", status: "年检过期", inspection: "2025-11-20", insurance: "有效" },
];

const Vehicles = () => (
  <div className="p-6 space-y-6 grid-bg min-h-[calc(100vh-4rem)]">
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

    {/* Vehicle Table */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="tech-card overflow-hidden">
      <h3 className="section-title text-base mb-4">车辆登记列表</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid hsl(220 20% 18%)" }}>
              {["车牌号", "类型", "所有人", "状态", "年检到期", "保险", "操作"].map((h) => (
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
                transition={{ delay: 0.5 + i * 0.05 }}
                className="hover:bg-secondary/30 transition-colors"
                style={{ borderBottom: "1px solid hsl(220 20% 14%)" }}
              >
                <td className="py-3 px-4 font-mono text-primary font-medium">{v.plate}</td>
                <td className="py-3 px-4">{v.type}</td>
                <td className="py-3 px-4">{v.owner}</td>
                <td className="py-3 px-4">
                  <span className="text-xs px-2 py-1 rounded-full" style={{
                    background: v.status === "正常" ? "hsl(150 70% 45% / 0.15)" : "hsl(0 75% 55% / 0.15)",
                    color: v.status === "正常" ? "hsl(150 70% 45%)" : "hsl(0 75% 55%)",
                  }}>{v.status}</span>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{v.inspection}</td>
                <td className="py-3 px-4">
                  <span className="text-xs" style={{ color: v.insurance === "有效" ? "hsl(150 70% 45%)" : "hsl(0 75% 55%)" }}>{v.insurance}</span>
                </td>
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
