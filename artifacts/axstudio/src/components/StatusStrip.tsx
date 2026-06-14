import { motion } from "framer-motion";
import { Film, MonitorPlay, Clapperboard, MapPin } from "lucide-react";

export function StatusStrip() {
  const items = [
    {
      icon: <Clapperboard className="w-6 h-6 text-primary" />,
      label: "제작사",
      value: "AX STUDIO",
    },
    {
      icon: <MonitorPlay className="w-6 h-6 text-primary" />,
      label: "준비 포맷",
      value: "EBS 드라마 + 보드게임",
    },
    {
      icon: <Film className="w-6 h-6 text-primary" />,
      label: "장르",
      value: "역사 판타지 / 에듀테인먼트",
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      label: "공간 지원",
      value: "서울영상위원회 (2026.02 입주)",
    },
  ];

  return (
    <div className="bg-card border-y border-border py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-border">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="mb-4 p-3 bg-muted rounded-full">
                {item.icon}
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">{item.label}</h3>
              <p className="font-semibold text-foreground">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
