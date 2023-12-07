"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Loader2, Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createPoseImage } from "@/app/actions";
import { useToast } from "@/components/ui/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Save
    </Button>
  );
}

export function EditImage(
  props: React.ComponentPropsWithoutRef<typeof DialogTrigger> & {
    poseId: string;
  }
) {
  const [state, formAction] = useFormState(createPoseImage, {
    message: "",
  });

  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Success",
      description: state.message,
    });
  }, [state, toast]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit image</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
            <DialogDescription>
              Change the image for this pose
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input type="hidden" name="poseId" value={props.poseId} />
              <Label htmlFor="image">Image</Label>
              <Input type="file" id="image" name="image" />
            </div>
            <DialogFooter>
              <SubmitButton />
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
