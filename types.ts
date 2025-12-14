export interface Movie {
  title: string;
  image: string;
  match: number;
  genres?: string[];
  tags?: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface ChatState {
  isOpen: boolean;
  isLoading: boolean;
}