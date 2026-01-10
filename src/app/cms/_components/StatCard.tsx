import { Icon } from "@iconify/react/dist/iconify.js";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  trendUp?: boolean;
}

export default function StatCard({ title, value, icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        {trend && (
          <p className={`text-xs mt-2 flex items-center gap-1 ${trendUp ? "text-green-600" : "text-red-500"}`}>
            <Icon icon={trendUp ? "solar:graph-up-bold" : "solar:graph-down-bold"} />
            {trend}
          </p>
        )}
      </div>
      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
        <Icon icon={icon} width="24" height="24" />
      </div>
    </div>
  );
}
