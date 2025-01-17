export interface Thought {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  is_public: boolean;
  user?: {
    name: string;
  };
}
