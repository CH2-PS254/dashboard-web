"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createPose(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
  });
  const parse = schema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!parse.success) {
    return { error: true, message: "Failed to create pose" };
  }

  const pose = parse.data;

  try {
    await fetch(`${process.env.POSE_SERVICE_URL}/poses`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.POSE_SERVICE_TOKEN}`,
      },
      body: JSON.stringify(pose),
    });

    revalidatePath("poses");
    return { error: false, message: `Added pose ${pose.name}` };
  } catch (e) {
    return { error: true, message: "Failed to create pose" };
  }
}

export async function updatePose(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().min(1),
  });
  const parse = schema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!parse.success) {
    return { message: "Failed to update pose" };
  }

  const pose = parse.data;

  try {
    await fetch(`${process.env.POSE_SERVICE_URL}/poses/${pose.id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${process.env.POSE_SERVICE_TOKEN}`,
      },
      body: JSON.stringify(pose),
    });

    revalidatePath("poses");
    return { message: `Updated pose ${pose.name}` };
  } catch (e) {
    return { message: "Failed to update pose" };
  }
}

export async function deletePose(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
  });

  try {
    await fetch(`${process.env.POSE_SERVICE_URL}/poses/${data.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${process.env.POSE_SERVICE_TOKEN}`,
      },
    });

    revalidatePath("poses");
    return { message: `Deleted pose ${data.id}` };
  } catch (e) {
    return { message: "Failed to delete pose" };
  }
}

export async function createPoseImage(prevState: any, formData: FormData) {
  const schema = z.object({
    poseId: z.string().min(1),
    image: z.any(),
  });
  const data = schema.parse({
    poseId: formData.get("poseId"),
    image: formData.get("image"),
  });

  try {
    await fetch(`${process.env.POSE_SERVICE_URL}/poses/${data.poseId}/image`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.POSE_SERVICE_TOKEN}`,
      },
      body: formData,
    });

    revalidatePath("poses");
    return { message: `Added image to pose ${data.poseId}` };
  } catch (e) {
    return { message: "Failed to add image to pose" };
  }
}
