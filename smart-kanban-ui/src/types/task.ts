export type TaskArea =
  | "frontend"
  | "backend"
  | "qa"
  | "devops"
  | "ux"
  | "product";
export type Topic = {
  id: string;
  title: string;
  description?: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  area: TaskArea;
  topics?: Topic[];
  epicId?: string;
  sprint?: string;
};
