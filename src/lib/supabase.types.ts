export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			badge: {
				Row: {
					description: string | null;
					id: string;
					image_url: string;
					name: string;
				};
				Insert: {
					description?: string | null;
					id?: string;
					image_url: string;
					name: string;
				};
				Update: {
					description?: string | null;
					id?: string;
					image_url?: string;
					name?: string;
				};
				Relationships: [];
			};
			presentation: {
				Row: {
					created_at: string;
					description: string | null;
					explanation: string | null;
					id: string;
					slides: Json[];
					topic: string;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					description?: string | null;
					explanation?: string | null;
					id?: string;
					slides?: Json[];
					topic: string;
					user_id: string;
				};
				Update: {
					created_at?: string;
					description?: string | null;
					explanation?: string | null;
					id?: string;
					slides?: Json[];
					topic?: string;
					user_id?: string;
				};
				Relationships: [];
			};
			recording: {
				Row: {
					answers: Json[] | null;
					audio_cid: string;
					created_at: string;
					id: string;
					presentation_id: string;
					question_score: Json | null;
					questions: Json;
					recording_score: Json;
					transcript: string;
					words: Json[] | null;
				};
				Insert: {
					answers?: Json[] | null;
					audio_cid: string;
					created_at?: string;
					id?: string;
					presentation_id: string;
					question_score?: Json | null;
					questions: Json;
					recording_score: Json;
					transcript: string;
					words?: Json[] | null;
				};
				Update: {
					answers?: Json[] | null;
					audio_cid?: string;
					created_at?: string;
					id?: string;
					presentation_id?: string;
					question_score?: Json | null;
					questions?: Json;
					recording_score?: Json;
					transcript?: string;
					words?: Json[] | null;
				};
				Relationships: [
					{
						foreignKeyName: 'recording_presentation_id_fkey';
						columns: ['presentation_id'];
						isOneToOne: false;
						referencedRelation: 'presentation';
						referencedColumns: ['id'];
					}
				];
			};
			usersAndBadges: {
				Row: {
					badge_id: string;
					created_at: string;
					id: number;
					user_id: string | null;
				};
				Insert: {
					badge_id?: string;
					created_at?: string;
					id?: number;
					user_id?: string | null;
				};
				Update: {
					badge_id?: string;
					created_at?: string;
					id?: number;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'usersAndBadges_badge_id_fkey';
						columns: ['badge_id'];
						isOneToOne: false;
						referencedRelation: 'badge';
						referencedColumns: ['id'];
					}
				];
			};
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
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
		? PublicSchema['Enums'][PublicEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof PublicSchema['CompositeTypes']
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
		: never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
		? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
		: never;
