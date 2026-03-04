import { NavLink, useLocation } from "react-router-dom";
import { Shield, Activity } from "lucide-react";

const navItems = [
  { label: "态势总览", path: "/" },
  { label: "事故管理", path: "/accidents" },
  { label: "违章监控", path: "/violations" },
  { label: "路况信息", path: "/road-info" },
  { label: "车辆管理", path: "/vehicles" },
  { label: "预警中心", path: "/alerts" },
  { label: "数据分析", path: "/analytics" },
  { label: "系统管理", path: "/settings" },
];

const AppHeader = () => {
  const location = useLocation();

  return (
    <header className="relative z-50 flex items-center justify-between h-20 px-8 border-b border-border"
      style={{
        background: "linear-gradient(180deg, hsl(220 25% 12%) 0%, hsl(220 25% 6%) 100%)",
        boxShadow: "0 4px 30px hsl(185 100% 50% / 0.05), inset 0 1px 0 hsl(185 100% 50% / 0.08)",
      }}
    >
      {/* Nav items - left */}
      <nav className="flex items-center gap-0 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`header-nav-item flex-1 text-center whitespace-nowrap ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Title - right */}
      <div className="flex items-center gap-4 ml-8 shrink-0">
        <Activity className="w-6 h-6 text-primary" style={{ filter: "drop-shadow(0 0 8px hsl(185 100% 50% / 0.5))" }} />
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" style={{ filter: "drop-shadow(0 0 10px hsl(185 100% 50% / 0.6))" }} />
          <h1 className="font-display text-2xl font-bold tracking-widest glow-text">
            交通安全系统
          </h1>
        </div>
        <div className="pulse-dot ml-3" />
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(185 100% 50% / 0.3), hsl(260 80% 60% / 0.2), transparent)",
        }}
      />
    </header>
  );
};

export default AppHeader;
