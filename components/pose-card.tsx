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

export function PoseCard(
  props: React.ComponentPropsWithoutRef<typeof Card> & { pose: Pose }
) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{props.pose.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{props.pose.description}</CardDescription>
      </CardContent>
      <CardFooter>
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
