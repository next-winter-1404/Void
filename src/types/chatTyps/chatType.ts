export interface ChatMessage {
  _id: string;
  room: string;
  sender: string;
  message: string;
  getterId: number;
  createdAt: string;
  updatedAt: string;
}

export interface SendMessagePayload {
  room: string;
  sender: string;
  message: string;
  getterId: number;
}

export interface EditMessagePayload {
  message: string;
}

export interface ChatRoom {
  room: string;
  lastMessage?: ChatMessage;
}