import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

interface MiniChartProps {
  data: { name: string; value: number }[];
  color?: string;
  type?: "area" | "bar";
  height?: number;
}

const MiniChart = ({ data, color = "hsl(185 100% 50%)", type = "area", height = 120 }: MiniChartProps) => {
  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fill: "hsl(200 10% 40%)", fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 20%)", borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: "hsl(200 20% 80%)" }}
          />
          <Bar dataKey="value" fill={color} radius={[3, 3, 0, 0]} opacity={0.8} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`gradient-${color.replace(/[^a-zA-Z0-9]/g, "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip
          contentStyle={{ background: "hsl(220 25% 12%)", border: "1px solid hsl(220 20% 20%)", borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: "hsl(200 20% 80%)" }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          fill={`url(#gradient-${color.replace(/[^a-zA-Z0-9]/g, "")})`}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MiniChart;
