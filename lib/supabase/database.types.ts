export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      follows: {
        Row: {
          id: string;
          created_at: string;
          follower_id: string;
          following_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          follower_id: string;
          following_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          follower_id?: string;
          following_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_fkey";
            columns: ["follower_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "follows_following_id_fkey";
            columns: ["following_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      thoughts: {
        Row: {
          id: string;
          created_at: string;
          profile_id: string;
          content: string;
          is_public: boolean;
          title: string | null;
          images: string[] | null;
          location: Json | null;
          is_story_mode: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          profile_id: string;
          content: string;
          is_public?: boolean;
          title?: string | null;
          images?: string[] | null;
          location?: Json | null;
          is_story_mode?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          profile_id?: string;
          content?: string;
          is_public?: boolean;
          title?: string | null;
          images?: string[] | null;
          location?: Json | null;
          is_story_mode?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "thoughts_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          id: string;
          created_at: string;
          username: string;
          display_name: string;
          postcode: string | null;
          is_private: boolean;
          is_verified: boolean;
          bio: string | null;
          avatar: string | null;
          location: Json | null;
          name_search: string | null;
          in_review: boolean;
          created_by: string | null;
          wikipedia_data: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          username: string;
          display_name: string;
          postcode?: string | null;
          is_private?: boolean;
          is_verified?: boolean;
          bio?: string | null;
          avatar?: string | null;
          location?: Json | null;
          name_search?: string | null;
          in_review?: boolean;
          created_by?: string | null;
          wikipedia_data?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          username?: string;
          display_name?: string;
          postcode?: string | null;
          is_private?: boolean;
          is_verified?: boolean;
          bio?: string | null;
          avatar?: string | null;
          location?: Json | null;
          name_search?: string | null;
          in_review?: boolean;
          created_by?: string | null;
          wikipedia_data?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      // ... existing code ...
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
