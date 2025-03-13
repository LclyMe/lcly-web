import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Globe,
  Heart,
  GitBranch,
  Server,
  Building,
  LucideIcon,
} from "lucide-react";

export type Benefit = {
  title: string;
  description: string;
  icon: LucideIcon;
};

// Default benefits of Lcly
export const defaultBenefits: Benefit[] = [
  {
    title: "Open Source",
    description:
      "The entire platform is open source and always will be, allowing for community contributions and transparency.",
    icon: GitBranch,
  },
  // {
  //   title: "Self-Hostable",
  //   description:
  //     "Communities can self-host their own instance of Lcly, ensuring complete control over their data.",
  //   icon: Server,
  // },
  {
    title: "Non-Profit",
    description:
      "We believe public infrastructure should never be a profit-making venture, ensuring decisions are made for communities, not shareholders.",
    icon: Heart,
  },
  {
    title: "Privacy First",
    description:
      "We're committed to protecting your privacy and personal data, with minimal data collection and no data selling.",
    icon: Lock,
  },
  {
    title: "Civic Engagement",
    description:
      "We integrate with local government data to keep you informed about elections, council meetings, and MP activities, empowering meaningful participation in local democracy.",
    icon: Building,
  },
  {
    title: "UK Focused",
    description:
      "Built specifically for UK communities, with features tailored to local needs and concerns.",
    icon: Globe,
  },
  {
    title: "Community Owned",
    description:
      "Lcly is built by and for communities, ensuring the platform serves the people who use it.",
    icon: ShieldCheck,
  },
];

interface BenefitsGridProps {
  benefits?: Benefit[];
  showHeader?: boolean;
  headerText?: string;
}

export function BenefitsGrid({
  benefits = defaultBenefits,
  showHeader = false,
  headerText = "Why Choose Lcly?",
}: BenefitsGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {showHeader && (
        <h2 className="text-3xl font-bold text-center mb-10">{headerText}</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl"
          >
            <div className="text-4xl mb-4">
              <benefit.icon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
            <p className="text-muted-foreground">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
