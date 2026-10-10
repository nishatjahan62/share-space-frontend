import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RoomActions } from "@/components/property/room-actions";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency } from "@/lib/format";
import type { Role, Room } from "@/types";

interface RoomCardProps {
  room: Room;
  viewerRole: Role | null;
  redirectTo: string;
}

export function RoomCard({
  room,
  viewerRole,
  redirectTo,
}: RoomCardProps) {
  const filled =
    room.capacity > 0
      ? Math.round((room.currentOccupancy / room.capacity) * 100)
      : 0;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Room {room.roomNumber}</CardTitle>
        <StatusBadge status={room.status} />
      </CardHeader>

      <CardContent className="space-y-4">
        <p>
          <span className="text-2xl font-bold">
            {formatCurrency(room.rentAmount)}
          </span>
          <span className="text-muted-foreground"> / month</span>
        </p>

        <div className="space-y-1.5">
          <div
            className="h-2 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={filled}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Room occupancy"
          >
            <div
              className="h-full bg-primary"
              style={{ width: `${filled}%` }}
            />
          </div>

          <p className="text-xs text-muted-foreground">
            {room.currentOccupancy} of {room.capacity} spots filled
          </p>
        </div>

        <RoomActions
          roomId={room.id}
          isAvailable={room.status === "AVAILABLE"}
          viewerRole={viewerRole}
          redirectTo={redirectTo}
        />
      </CardContent>
    </Card>
  );
}