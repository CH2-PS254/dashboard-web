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
import Image from "next/image";

export function PoseCard(
  props: React.ComponentPropsWithoutRef<typeof Card> & { pose: Pose }
) {
  return (
    <Card {...props}>
      {props.pose.image ? (
        <div className="relative h-48">
          <Image
            src={props.pose.image}
            alt={props.pose.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      ) : (
        <div className="h-48 bg-muted rounded-t-lg" />
      )}
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>{props.pose.name}</CardTitle>
        <PoseActions />
      </CardHeader>
      <CardContent>
        <CardDescription>{props.pose.description}</CardDescription>
      </CardContent>
      <CardFooter>
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
