export type Topic = {
  id: string;
  title: string;
  description?: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  topics?: Topic[];
};
