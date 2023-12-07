"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createPose } from "@/app/actions";
import { Loader2, PlusCircleIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Add
    </Button>
  );
}

export function AddPose() {
  const [state, formAction] = useFormState(createPose, {
    error: false,
    message: "",
  });

  const { toast } = useToast();

  useEffect(() => {
    toast({
      variant: state.error ? "destructive" : "default",
      title: state.error ? "Error" : "Success",
      description: state.message,
    });
  }, [state, toast]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Add pose
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Add Pose</DialogTitle>
            <DialogDescription>
              Add a new pose to your collection
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" autoFocus />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" />
            </div>
          </div>
          <DialogFooter>
            <SubmitButton />
            <p aria-live="polite" className="sr-only" role="status">
              {state?.message}
            </p>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
