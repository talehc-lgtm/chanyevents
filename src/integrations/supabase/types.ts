export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      casting_evaluations: {
        Row: {
          comment: string | null
          created_at: string
          decision: string
          elocution: number | null
          experience: number | null
          full_name: string
          id: string
          number: number | null
          phone: string | null
          posture: number | null
          presentation: number | null
          smile: number | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          decision?: string
          elocution?: number | null
          experience?: number | null
          full_name: string
          id?: string
          number?: number | null
          phone?: string | null
          posture?: number | null
          presentation?: number | null
          smile?: number | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          decision?: string
          elocution?: number | null
          experience?: number | null
          full_name?: string
          id?: string
          number?: number | null
          phone?: string | null
          posture?: number | null
          presentation?: number | null
          smile?: number | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
        }
        Relationships: []
      }
      cw_applications: {
        Row: {
          admin_notes: string
          arrived_at: string | null
          availability: Json
          briefing_available: boolean
          constraints: string
          created_at: string
          decision: string
          decision_reason: string
          demo: boolean
          dossier_checked: boolean
          event_id: string
          id: string
          jury_ids: string[]
          number: number
          person_id: string
          position: string
          queue_order: number | null
          status: string
        }
        Insert: {
          admin_notes?: string
          arrived_at?: string | null
          availability?: Json
          briefing_available?: boolean
          constraints?: string
          created_at?: string
          decision?: string
          decision_reason?: string
          demo?: boolean
          dossier_checked?: boolean
          event_id: string
          id?: string
          jury_ids?: string[]
          number?: number
          person_id: string
          position: string
          queue_order?: number | null
          status?: string
        }
        Update: {
          admin_notes?: string
          arrived_at?: string | null
          availability?: Json
          briefing_available?: boolean
          constraints?: string
          created_at?: string
          decision?: string
          decision_reason?: string
          demo?: boolean
          dossier_checked?: boolean
          event_id?: string
          id?: string
          jury_ids?: string[]
          number?: number
          person_id?: string
          position?: string
          queue_order?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "cw_applications_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "cw_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cw_applications_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "cw_people"
            referencedColumns: ["id"]
          },
        ]
      }
      cw_assignments: {
        Row: {
          application_id: string
          day: string
          end_time: string
          id: string
          post_id: string
          start_time: string
        }
        Insert: {
          application_id: string
          day: string
          end_time: string
          id?: string
          post_id: string
          start_time: string
        }
        Update: {
          application_id?: string
          day?: string
          end_time?: string
          id?: string
          post_id?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "cw_assignments_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "cw_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cw_assignments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "cw_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      cw_audit: {
        Row: {
          action: string
          actor_id: string
          created_at: string
          detail: Json
          event_id: string
          id: string
          target_id: string | null
        }
        Insert: {
          action: string
          actor_id: string
          created_at?: string
          detail?: Json
          event_id: string
          id?: string
          target_id?: string | null
        }
        Update: {
          action?: string
          actor_id?: string
          created_at?: string
          detail?: Json
          event_id?: string
          id?: string
          target_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cw_audit_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "cw_events"
            referencedColumns: ["id"]
          },
        ]
      }
      cw_evaluations: {
        Row: {
          application_id: string
          appreciation: string
          comments: Json
          id: string
          juror_id: string
          rubric_id: string
          scores: Json
          status: string
          updated_at: string
          validated_at: string | null
        }
        Insert: {
          application_id: string
          appreciation?: string
          comments?: Json
          id?: string
          juror_id: string
          rubric_id: string
          scores?: Json
          status?: string
          updated_at?: string
          validated_at?: string | null
        }
        Update: {
          application_id?: string
          appreciation?: string
          comments?: Json
          id?: string
          juror_id?: string
          rubric_id?: string
          scores?: Json
          status?: string
          updated_at?: string
          validated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cw_evaluations_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "cw_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cw_evaluations_rubric_id_fkey"
            columns: ["rubric_id"]
            isOneToOne: false
            referencedRelation: "cw_rubrics"
            referencedColumns: ["id"]
          },
        ]
      }
      cw_events: {
        Row: {
          archived: boolean
          casting_at: string
          created_at: string
          id: string
          location: string
          mission_end: string
          mission_location: string
          mission_start: string
          name: string
          next_number: number
          required_evaluations: number
          timezone: string
        }
        Insert: {
          archived?: boolean
          casting_at: string
          created_at?: string
          id?: string
          location?: string
          mission_end: string
          mission_location?: string
          mission_start: string
          name: string
          next_number?: number
          required_evaluations?: number
          timezone?: string
        }
        Update: {
          archived?: boolean
          casting_at?: string
          created_at?: string
          id?: string
          location?: string
          mission_end?: string
          mission_location?: string
          mission_start?: string
          name?: string
          next_number?: number
          required_evaluations?: number
          timezone?: string
        }
        Relationships: []
      }
      cw_members: {
        Row: {
          display_name: string
          event_id: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          display_name: string
          event_id: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          display_name?: string
          event_id?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cw_members_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "cw_events"
            referencedColumns: ["id"]
          },
        ]
      }
      cw_people: {
        Row: {
          created_at: string
          details: Json
          full_name: string
          id: string
          normalized_phone: string
          phone: string
        }
        Insert: {
          created_at?: string
          details?: Json
          full_name: string
          id?: string
          normalized_phone: string
          phone: string
        }
        Update: {
          created_at?: string
          details?: Json
          full_name?: string
          id?: string
          normalized_phone?: string
          phone?: string
        }
        Relationships: []
      }
      cw_posts: {
        Row: {
          event_id: string
          id: string
          name: string
          quota: number
          welcome_required: boolean
        }
        Insert: {
          event_id: string
          id?: string
          name: string
          quota?: number
          welcome_required?: boolean
        }
        Update: {
          event_id?: string
          id?: string
          name?: string
          quota?: number
          welcome_required?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "cw_posts_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "cw_events"
            referencedColumns: ["id"]
          },
        ]
      }
      cw_rubrics: {
        Row: {
          criteria: Json
          event_id: string
          id: string
          locked_at: string | null
          version: number
        }
        Insert: {
          criteria: Json
          event_id: string
          id?: string
          locked_at?: string | null
          version?: number
        }
        Update: {
          criteria?: Json
          event_id?: string
          id?: string
          locked_at?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "cw_rubrics_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "cw_events"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          age: number | null
          ai_recommendation: string | null
          ai_summary: string | null
          city: string | null
          created_at: string
          cv_path: string | null
          email: string | null
          evaluated_at: string | null
          experience: string | null
          full_availability: boolean | null
          full_name: string
          height_cm: number | null
          id: string
          message: string | null
          phone: string
          photo_paths: string[] | null
          position: string
          profile: Json | null
          score: number | null
          speaks_english: boolean | null
          speaks_french: boolean | null
        }
        Insert: {
          age?: number | null
          ai_recommendation?: string | null
          ai_summary?: string | null
          city?: string | null
          created_at?: string
          cv_path?: string | null
          email?: string | null
          evaluated_at?: string | null
          experience?: string | null
          full_availability?: boolean | null
          full_name: string
          height_cm?: number | null
          id?: string
          message?: string | null
          phone: string
          photo_paths?: string[] | null
          position: string
          profile?: Json | null
          score?: number | null
          speaks_english?: boolean | null
          speaks_french?: boolean | null
        }
        Update: {
          age?: number | null
          ai_recommendation?: string | null
          ai_summary?: string | null
          city?: string | null
          created_at?: string
          cv_path?: string | null
          email?: string | null
          evaluated_at?: string | null
          experience?: string | null
          full_availability?: boolean | null
          full_name?: string
          height_cm?: number | null
          id?: string
          message?: string | null
          phone?: string
          photo_paths?: string[] | null
          position?: string
          profile?: Json | null
          score?: number | null
          speaks_english?: boolean | null
          speaks_french?: boolean | null
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          budget: string | null
          city: string | null
          company: string | null
          country: string | null
          created_at: string
          details: string | null
          email: string
          event_date: string | null
          event_type: string | null
          guests: string | null
          id: string
          job_title: string | null
          location: string | null
          name: string
          needs: string[] | null
          organization: string | null
          phone: string | null
          status: string
        }
        Insert: {
          budget?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          details?: string | null
          email: string
          event_date?: string | null
          event_type?: string | null
          guests?: string | null
          id?: string
          job_title?: string | null
          location?: string | null
          name: string
          needs?: string[] | null
          organization?: string | null
          phone?: string | null
          status?: string
        }
        Update: {
          budget?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          details?: string | null
          email?: string
          event_date?: string | null
          event_type?: string | null
          guests?: string | null
          id?: string
          job_title?: string | null
          location?: string | null
          name?: string
          needs?: string[] | null
          organization?: string | null
          phone?: string | null
          status?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
