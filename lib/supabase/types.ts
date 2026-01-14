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
      products: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          category: string | null
          brand: string | null
          image_url: string | null
          truemark_id: string | null
          truemark_data: Json | null
          blockchain_tx_hash: string | null
          is_registered: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          category?: string | null
          brand?: string | null
          image_url?: string | null
          truemark_id?: string | null
          truemark_data?: Json | null
          blockchain_tx_hash?: string | null
          is_registered?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          category?: string | null
          brand?: string | null
          image_url?: string | null
          truemark_id?: string | null
          truemark_data?: Json | null
          blockchain_tx_hash?: string | null
          is_registered?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      scans: {
        Row: {
          id: string
          product_id: string
          scan_result: string
          confidence: number | null
          location: string | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          scan_result: string
          confidence?: number | null
          location?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          scan_result?: string
          confidence?: number | null
          location?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
      user_stats: {
        Row: {
          user_id: string
          total_points: number
          level: number
          current_streak: number
          best_streak: number
          total_verifications: number
          total_registrations: number
          counterfeit_found: number
          last_activity_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          total_points?: number
          level?: number
          current_streak?: number
          best_streak?: number
          total_verifications?: number
          total_registrations?: number
          counterfeit_found?: number
          last_activity_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          total_points?: number
          level?: number
          current_streak?: number
          best_streak?: number
          total_verifications?: number
          total_registrations?: number
          counterfeit_found?: number
          last_activity_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          name: string
          description: string
          icon: string
          point_value: number
          category: string
          criteria: Json
          tier: string
          created_at: string
        }
        Insert: {
          id: string
          name: string
          description: string
          icon: string
          point_value: number
          category: string
          criteria: Json
          tier?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon?: string
          point_value?: number
          category?: string
          criteria?: Json
          tier?: string
          created_at?: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          earned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          earned_at?: string
        }
      }
      user_activity: {
        Row: {
          id: string
          user_id: string
          activity_type: string
          activity_date: string
          points_earned: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_type: string
          activity_date?: string
          points_earned?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_type?: string
          activity_date?: string
          points_earned?: number
          created_at?: string
        }
      }
    }
  }
}

export type Product = Database['public']['Tables']['products']['Row']
export type Scan = Database['public']['Tables']['scans']['Row']
export type UserStats = Database['public']['Tables']['user_stats']['Row']
export type Achievement = Database['public']['Tables']['achievements']['Row']
export type UserAchievement = Database['public']['Tables']['user_achievements']['Row']
export type UserActivity = Database['public']['Tables']['user_activity']['Row']

export interface AwardPointsResult {
  points_awarded: number
  new_total: number
  level: number
  level_up: boolean
  streak: number
  new_achievements: Achievement[]
}
