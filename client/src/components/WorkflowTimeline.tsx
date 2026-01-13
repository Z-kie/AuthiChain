import { motion } from "framer-motion";
import {
  Sprout,
  Factory,
  PackageCheck,
  Truck,
  Store,
  CheckCircle2,
  MapPin,
  Calendar
} from "lucide-react";
import { format } from "date-fns";

interface TimelineEvent {
  id: string;
  stage: string;
  description: string;
  location: string;
  date: Date;
  icon: any;
  status: "completed" | "current" | "pending";
}

interface WorkflowTimelineProps {
  productName?: string;
  currentStage?: number;
}

export function WorkflowTimeline({ productName = "Product", currentStage = 3 }: WorkflowTimelineProps) {
  const events: TimelineEvent[] = [
    {
      id: "1",
      stage: "Origin",
      description: "Raw materials sourced and verified",
      location: "Kyoto, Japan",
      date: new Date(2024, 10, 15),
      icon: Sprout,
      status: currentStage >= 1 ? "completed" : "pending",
    },
    {
      id: "2",
      stage: "Manufacturing",
      description: "Product assembled and quality checked",
      location: "Osaka, Japan",
      date: new Date(2024, 10, 20),
      icon: Factory,
      status: currentStage >= 2 ? "completed" : "pending",
    },
    {
      id: "3",
      stage: "Quality Assurance",
      description: "TrueMark™ signature applied and verified",
      location: "Tokyo, Japan",
      date: new Date(2024, 10, 25),
      icon: PackageCheck,
      status: currentStage >= 3 ? "completed" : currentStage === 2 ? "current" : "pending",
    },
    {
      id: "4",
      stage: "Distribution",
      description: "Shipped to authorized retailer",
      location: "Los Angeles, USA",
      date: new Date(2024, 11, 1),
      icon: Truck,
      status: currentStage >= 4 ? "completed" : currentStage === 3 ? "current" : "pending",
    },
    {
      id: "5",
      stage: "Retail",
      description: "Available for purchase",
      location: "New York, USA",
      date: new Date(2024, 11, 5),
      icon: Store,
      status: currentStage >= 5 ? "completed" : currentStage === 4 ? "current" : "pending",
    },
  ];

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/20">
      <div className="flex items-center gap-2 mb-6">
        <Truck className="w-5 h-5 text-amber-500" />
        <h3 className="font-bold">Seed-to-Sale Journey</h3>
      </div>

      <div className="space-y-1">
        {events.map((event, index) => {
          const Icon = event.icon;
          const isLast = index === events.length - 1;

          return (
            <div key={event.id} className="relative">
              <div className="flex gap-4">
                {/* Timeline line and icon */}
                <div className="relative flex flex-col items-center">
                  {/* Icon circle */}
                  <motion.div
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      event.status === "completed"
                        ? "bg-green-500 border-green-500"
                        : event.status === "current"
                        ? "bg-amber-500 border-amber-500 animate-pulse"
                        : "bg-muted border-border"
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        event.status === "completed" || event.status === "current"
                          ? "text-white"
                          : "text-muted-foreground"
                      }`}
                    />
                  </motion.div>

                  {/* Connecting line */}
                  {!isLast && (
                    <div className="w-0.5 h-20 bg-border mt-1">
                      {event.status === "completed" && (
                        <motion.div
                          className="w-full bg-green-500"
                          initial={{ height: 0 }}
                          animate={{ height: "100%" }}
                          transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Content */}
                <motion.div
                  className="flex-1 pb-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-sm flex items-center gap-2">
                        {event.stage}
                        {event.status === "completed" && (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {event.description}
                      </p>
                    </div>

                    {event.status !== "pending" && (
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        event.status === "completed"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-amber-500/10 text-amber-500"
                      }`}>
                        {event.status === "completed" ? "Complete" : "In Progress"}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                    {event.status !== "pending" && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{format(event.date, "MMM d, yyyy")}</span>
                      </div>
                    )}
                  </div>

                  {/* Additional details for current/completed stages */}
                  {event.status === "completed" && (
                    <div className="mt-2 text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded inline-block">
                      TX: 0x{Math.random().toString(16).slice(2, 10)}...
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary stats */}
      <div className="mt-6 pt-4 border-t border-border/50 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-green-500">{currentStage}</div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{events.length - currentStage}</div>
          <div className="text-xs text-muted-foreground">Remaining</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-amber-500">
            {Math.round((currentStage / events.length) * 100)}%
          </div>
          <div className="text-xs text-muted-foreground">Progress</div>
        </div>
      </div>
    </div>
  );
}
