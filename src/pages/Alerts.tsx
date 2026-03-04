import { motion } from "framer-motion";
import { Bell, AlertTriangle, Shield, Siren, Radio, CheckCircle2 } from "lucide-react";

const alerts = [
  { id: 1, level: "紧急", title: "四惠桥西 — 重大交通事故", desc: "多车连环碰撞，已造成道路完全封闭，建议绕行。", time: "3分钟前", handled: false, icon: Siren },
  { id: 2, level: "高危", title: "机场高速 — 严重拥堵预警", desc: "拥堵指数达到9.2，预计持续至18:00。建议出行旅客提前安排。", time: "12分钟前", handled: false, icon: AlertTriangle },
  { id: 3, level: "中等", title: "望京地区 — 信号灯故障", desc: "望京南路3个路口信号灯系统异常，已派遣维修团队。", time: "28分钟前", handled: true, icon: Radio },
  { id: 4, level: "紧急", title: "西直门立交 — 危险品车辆泄漏", desc: "化工运输车辆发生轻微泄漏，已启动应急响应方案。", time: "45分钟前", handled: false, icon: Shield },
  { id: 5, level: "低", title: "朝阳区 — 施工路段提醒", desc: "建国路东段进行道路维护，右侧车道封闭至明日6:00。", time: "1小时前", handled: true, icon: Bell },
  { id: 6, level: "中等", title: "海淀区 — 学校路段限速", desc: "中关村二小路段启动学校限速模式，限速30km/h。", time: "2小时前", handled: true, icon: Shield },
];

const levelStyle: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  "紧急": { bg: "hsl(0 75% 55% / 0.08)", border: "hsl(0 75% 55% / 0.3)", text: "hsl(0 75% 55%)", glow: "0 0 20px hsl(0 75% 55% / 0.15)" },
  "高危": { bg: "hsl(40 90% 55% / 0.08)", border: "hsl(40 90% 55% / 0.3)", text: "hsl(40 90% 55%)", glow: "0 0 20px hsl(40 90% 55% / 0.15)" },
  "中等": { bg: "hsl(185 100% 50% / 0.08)", border: "hsl(185 100% 50% / 0.3)", text: "hsl(185 100% 50%)", glow: "0 0 20px hsl(185 100% 50% / 0.15)" },
  "低": { bg: "hsl(150 70% 45% / 0.08)", border: "hsl(150 70% 45% / 0.3)", text: "hsl(150 70% 45%)", glow: "0 0 20px hsl(150 70% 45% / 0.15)" },
};

const Alerts = () => (
  <div className="p-6 space-y-6 grid-bg min-h-[calc(100vh-4rem)]">
    <div className="flex items-center justify-between">
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-title text-xl">预警中心</motion.h2>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
        <span className="flex items-center gap-2 text-sm"><span className="pulse-dot-danger" /> 2 个紧急</span>
        <span className="flex items-center gap-2 text-sm"><span className="pulse-dot-warning" /> 1 个高危</span>
        <span className="flex items-center gap-2 text-sm"><span className="pulse-dot" /> 2 个中等</span>
      </motion.div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {alerts.map((alert, i) => {
        const style = levelStyle[alert.level];
        return (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="relative rounded-lg p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{ background: style.bg, border: `1px solid ${style.border}`, boxShadow: style.glow }}
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${style.text}, transparent)` }} />

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg shrink-0" style={{ background: `${style.text}15` }}>
                <alert.icon className="w-6 h-6" style={{ color: style.text, filter: `drop-shadow(0 0 6px ${style.text})` }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${style.text}20`, color: style.text }}>{alert.level}</span>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
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
