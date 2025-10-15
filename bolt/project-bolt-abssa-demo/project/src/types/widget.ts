export interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  message_type: 'user' | 'assistant';
  created_at: string;
}

export interface WidgetAction {
  id: string;
  user_id: string;
  action_type: 'send_email' | 'upload_document';
  action_data: Record<string, any>;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  completed_at?: string;
}

export interface DocumentUpload {
  id: string;
  user_id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  section: string;
  created_at: string;
}

export interface ApplicationSection {
  id: string;
  section_name: string;
  section_description: string;
  metadata: Record<string, any>;
  created_at: string;
}
