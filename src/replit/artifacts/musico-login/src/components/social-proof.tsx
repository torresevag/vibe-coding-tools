import { motion } from "framer-motion";
import { Users, Music, Activity } from "lucide-react";

const stats = [
  { icon: Users, label: "50k+ Musicians", delay: 0.2 },
  { icon: Music, label: "10k+ Collabs", delay: 0.4 },
  { icon: Activity, label: "Live Gigs", delay: 0.6 },
];

export function SocialProof() {
  return (
    <div className="flex flex-wrap gap-4 mt-12">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + stat.delay, duration: 0.5 }}
          className="flex items-center gap-3 px-5 py-3 rounded-2xl glass-panel bg-white/5"
        >
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
            <stat.icon className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-medium text-sm text-foreground/90">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
