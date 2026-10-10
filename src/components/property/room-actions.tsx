import Link from "next/link";
import { RoomRequestDialog } from "@/components/property/room-request-dialog";
import type { Role } from "@/types";

interface RoomActionsProps {
  roomId: string;
  isAvailable: boolean;
  viewerRole: Role | null;
  redirectTo: string;
}

export function RoomActions({
  roomId,
  isAvailable,
  viewerRole,
  redirectTo,
}: RoomActionsProps) {
  if (!viewerRole) {
    return (
      <Link
        href={`/login?from=${encodeURIComponent(redirectTo)}`}
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Login to request or apply
      </Link>
    );
  }

  if (viewerRole !== "TENANT") {
    return (
      <p className="text-sm text-muted-foreground">
        Only tenant accounts can request viewings or apply.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <RoomRequestDialog mode="viewing" roomId={roomId} />

      <RoomRequestDialog
        mode="application"
        roomId={roomId}
        disabled={!isAvailable}
      />
    </div>
  );
}