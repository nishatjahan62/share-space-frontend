import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TONES = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  danger: "border-red-200 bg-red-50 text-red-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
  neutral: "bg-muted text-muted-foreground",
} as const;

const STATUS_TONE: Record<string, keyof typeof TONES> = {
  AVAILABLE: "success", APPROVED: "success", CONFIRMED: "success", PAID: "success",
  ACTIVE: "success", RESOLVED: "success", COMPLETED: "success",
  PENDING: "warning", RESERVED: "warning", OPEN: "warning",
  IN_PROGRESS: "info",
  REJECTED: "danger", FAILED: "danger", OVERDUE: "danger", TERMINATED: "danger", OCCUPIED: "danger",
  WITHDRAWN: "neutral", ENDED: "neutral", CLOSED: "neutral",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="outline" className={cn("capitalize", TONES[STATUS_TONE[status] ?? "neutral"])}>
      {status.replace(/_/g, " ").toLowerCase()}
    </Badge>
  );
}