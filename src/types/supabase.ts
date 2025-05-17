export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          avatar_url: string | null
          title: string | null
          location: string | null
          linkedin_url: string | null
          github_url: string | null
          rating: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          phone?: string | null
          avatar_url?: string | null
          title?: string | null
          location?: string | null
          linkedin_url?: string | null
          github_url?: string | null
          rating?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          avatar_url?: string | null
          title?: string | null
          location?: string | null
          linkedin_url?: string | null
          github_url?: string | null
          rating?: number
          created_at?: string
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string | null
          created_at?: string
        }
      }
      user_skills: {
        Row: {
          id: string
          user_id: string
          skill_id: string
          proficiency_level: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          skill_id: string
          proficiency_level: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          skill_id?: string
          proficiency_level?: number
          created_at?: string
        }
      }
      certificates: {
        Row: {
          id: string
          user_id: string
          name: string
          issuer: string
          issue_date: string
          url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          issuer: string
          issue_date: string
          url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          issuer?: string
          issue_date?: string
          url?: string | null
          created_at?: string
        }
      }
      connections: {
        Row: {
          id: string
          requester_id: string
          recipient_id: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          requester_id: string
          recipient_id: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          requester_id?: string
          recipient_id?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}