import type { PoseResponse } from "@/types/pose";

import { AddPose } from "@/components/add-pose";
import { PoseCard } from "@/components/pose-card";
import { Separator } from "@/components/ui/separator";

async function getPoses() {
  const res = await fetch(`${process.env.POSE_SERVICE_URL}/poses`, {
    headers: {
      "Authorization": `Bearer ${process.env.POSE_SERVICE_TOKEN}`,
    },
    next: { tags: ["poses"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const poses: PoseResponse = await getPoses();

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Poses</h1>
        <AddPose />
      </div>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {poses.data.poses.map((pose) => (
          <PoseCard key={pose.id} pose={pose} />
        ))}
      </div>
    </div>
  );
}
