
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          is_active: boolean 
          is_blocked: boolean
          email: string
        }
        Insert: {
          id: string 
          updated_at?: string | null
          username?: string | null | undefined
          full_name?: string | null
          avatar_url?: string | null
          is_active: boolean 
          is_blocked: boolean
          email: string
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
           is_active: boolean 
          is_blocked: boolean
          email: string
        }
      }
      merchants: {
        Row: {
          id: number
          updated_at: string | null
          is_active: boolean 
          is_blocked: boolean
          About: string | null
          BannerUrl: string | null
          name: string | null
          created_by_userid: string
        }
        Insert: {
          id: number
          updated_at: string | null
          is_active: boolean 
          is_blocked: boolean
          About: string | null
          BannerUrl: string | null
          name: string | null
          created_by_userid: string
        }
        Update: {
          id: number
          updated_at: string | null
          is_active: boolean 
          is_blocked: boolean
          About: string | null
          BannerUrl: string | null
          name: string | null
          created_by_userid: string
        }
      }
      merchant_admin:{
        Row: {
          id: string
          merchantId: number
          UserRole: string
          updated_at: string
        }
        Insert: {
           id: string
          merchantId: number
          UserRole: string
          updated_at: string
        }
        Update: {
           id: string
          merchantId: number
          UserRole: string
          updated_at: string
        }
      }
      products:{
        Row: {
          id: number
          merchant_id: number
          Price: number
          Description: string
          Name: string
          updated_at: string
          image_url: string
        }
        Insert: {
          id: number
          merchant_id: number
          Price: number
          Description: string
          Name: string
          updated_at: string
          image_url: string
        }
        Ipdate: {
          id: number
          merchant_id: number
          Price: number
          Description: string
          Name: string
          updated_at: string
          image_url: string
        }
      }
      product_display: {
        Row: {
          id: number
          DiscountPercentage: number
          stock: number
        }
        Insert: {
          id: number
          DiscountPercentage: number
          stock: number
        }
        Update: {
          id: number
          DiscountPercentage: number
          stock: number
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

