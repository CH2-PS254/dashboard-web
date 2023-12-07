import Image from "next/image";
import { MoreVertical } from "lucide-react";

import type { Pose } from "@/types/pose";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditImage } from "@/components/edit-image";

export function PoseCard(
  props: React.ComponentPropsWithoutRef<typeof Card> & { pose: Pose }
) {
  return (
    <Card {...props}>
      <div className="relative h-48">
        <Image
          src={props.pose.image || "placeholder.svg"}
          alt={props.pose.name}
          fill
          className="rounded-t-lg object-cover"
        />
        <div className="absolute top-0 right-0 p-2">
          <EditImage poseId={props.pose.id} />
        </div>
      </div>
      <CardHeader>
        <CardTitle className="truncate">{props.pose.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2">{props.pose.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-row justify-between items-center">
        <time dateTime={props.pose.updated_at} className="text-sm">
          {new Date(props.pose.updated_at).toLocaleString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZoneName: "short",
          })}
        </time>
        <PoseActions />
      </CardFooter>
    </Card>
  );
}

function PoseActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
