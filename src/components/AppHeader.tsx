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
    <header className="relative z-50 flex items-center justify-between h-16 px-6 border-b border-border"
      style={{
        background: "linear-gradient(180deg, hsl(220 25% 10%) 0%, hsl(220 25% 6%) 100%)",
      }}
    >
      {/* Nav items - left */}
      <nav className="flex items-center gap-1 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`header-nav-item whitespace-nowrap ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Title - right */}
      <div className="flex items-center gap-3 ml-6 shrink-0">
        <Activity className="w-5 h-5 text-primary" style={{ filter: "drop-shadow(0 0 6px hsl(185 100% 50% / 0.5))" }} />
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" style={{ filter: "drop-shadow(0 0 8px hsl(185 100% 50% / 0.6))" }} />
          <h1 className="font-display text-lg font-bold tracking-wider glow-text">
            交通安全系统
          </h1>
        </div>
        <div className="pulse-dot ml-2" />
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
