export interface Pose {
  id: string;
  name: string;
  description: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface PoseResponse {
  status: "success" | "error";
  data: {
    poses: Pose[];
  };
}
