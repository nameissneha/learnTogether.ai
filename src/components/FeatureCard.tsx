
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  iconColor = "text-academic-blue",
  className 
}: FeatureCardProps) => {
  return (
    <div className={cn(
      "bg-white p-8 rounded-lg shadow-sm border border-gray-100 card-hover", 
      className
    )}>
      <div className={cn("rounded-full p-3 w-fit mb-6", iconColor === "text-academic-blue" ? "bg-blue-50" : 
                                                  iconColor === "text-academic-green" ? "bg-green-50" : 
                                                  iconColor === "text-academic-red" ? "bg-red-50" : 
                                                  "bg-yellow-50")}>
        <Icon className={cn("h-8 w-8", iconColor)} />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-academic-gray">{description}</p>
    </div>
  );
};

export default FeatureCard;
