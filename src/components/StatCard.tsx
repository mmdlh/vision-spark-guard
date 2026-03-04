import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon: LucideIcon;
  variant?: "default" | "accent" | "success" | "warning" | "danger";
  delay?: number;
}

const variantMap = {
  default: "tech-card",
  accent: "tech-card-accent",
  success: "tech-card-success",
  warning: "tech-card-warning",
  danger: "tech-card-danger",
};

const iconColorMap = {
  default: "hsl(185 100% 50%)",
  accent: "hsl(260 80% 60%)",
  success: "hsl(150 70% 45%)",
  warning: "hsl(40 90% 55%)",
  danger: "hsl(0 75% 55%)",
};

const StatCard = ({ title, value, change, changeType = "neutral", icon: Icon, variant = "default", delay = 0 }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={variantMap[variant]}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="stat-number" style={{ color: iconColorMap[variant] }}>
            {value}
          </p>
          {change && (
            <p className={`text-xs mt-2 ${changeType === "up" ? "text-success" : changeType === "down" ? "text-destructive" : "text-muted-foreground"}`}>
              {changeType === "up" ? "↑" : changeType === "down" ? "↓" : "→"} {change}
            </p>
          )}
        </div>
        <div
          className="p-3 rounded-lg"
          style={{
            background: `${iconColorMap[variant]}15`,
            boxShadow: `0 0 15px ${iconColorMap[variant]}20`,
          }}
        >
          <Icon className="w-6 h-6" style={{ color: iconColorMap[variant] }} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
