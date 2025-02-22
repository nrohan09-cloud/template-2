export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Message {
  id: string;
  content: string;
  sender: 'customer' | 'employee';
  timestamp: string;
}

export interface TimelineEntry {
  id: string;
  date: string;
  mealType: MealType;
  foodImages: string[];
  cgmGraphImage: string;
  sugarLevel: number;
  timestamp: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  messages: Message[];
  timeline: TimelineEntry[];
  sugarLevels: {
    timestamp: string;
    value: number;
  }[];
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  stats: {
    totalChats: number;
    avgResponseTime: number;
    customersHelped: number;
  };
  actions: {
    id: string;
    type: 'chat_response' | 'review' | 'customer_assignment';
    timestamp: string;
    description: string;
  }[];
}

export interface AppState {
  customers: Customer[];
  employees: Employee[];
  currentUser: {
    type: 'customer' | 'employee' | 'admin';
    id: string;
  } | null;
}

// Utility type for API responses
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: 'success' | 'error';
} 