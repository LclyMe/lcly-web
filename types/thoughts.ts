export interface Thought {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  is_public: boolean;
  is_story_mode?: boolean;
  images?: string[];
  user?: {
    name: string;
  };
}
