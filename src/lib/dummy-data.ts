import { Customer, Employee, AppState } from './types';

// Using placeholder image URLs that are guaranteed to work
const PLACEHOLDER_FOOD_IMAGE = 'https://placehold.co/400x400/e2e8f0/475569/png?text=Food+Image';
const PLACEHOLDER_CGM_GRAPH = 'https://placehold.co/800x400/e2e8f0/475569/png?text=CGM+Graph';

export const dummyCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    messages: [
      {
        id: '1',
        content: 'Hi, I need help with my diet plan.',
        sender: 'customer',
        timestamp: '2024-02-22T10:00:00Z',
      },
      {
        id: '2',
        content: 'Hello! I\'d be happy to help you with your diet plan. How can I assist you today?',
        sender: 'employee',
        timestamp: '2024-02-22T10:01:00Z',
      },
    ],
    timeline: [
      {
        id: '1',
        date: '2024-02-22',
        mealType: 'breakfast',
        foodImages: [PLACEHOLDER_FOOD_IMAGE, PLACEHOLDER_FOOD_IMAGE],
        cgmGraphImage: PLACEHOLDER_CGM_GRAPH,
        sugarLevel: 120,
        timestamp: '2024-02-22T08:00:00Z',
      },
      {
        id: '2',
        date: '2024-02-22',
        mealType: 'lunch',
        foodImages: [PLACEHOLDER_FOOD_IMAGE],
        cgmGraphImage: PLACEHOLDER_CGM_GRAPH,
        sugarLevel: 140,
        timestamp: '2024-02-22T13:00:00Z',
      },
    ],
    sugarLevels: [
      { timestamp: '2024-02-22T08:00:00Z', value: 120 },
      { timestamp: '2024-02-22T10:00:00Z', value: 130 },
      { timestamp: '2024-02-22T12:00:00Z', value: 135 },
      { timestamp: '2024-02-22T14:00:00Z', value: 140 },
    ],
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    messages: [
      {
        id: '1',
        content: 'Hello, I\'d like to discuss my CGM readings.',
        sender: 'customer',
        timestamp: '2024-02-22T11:00:00Z',
      },
    ],
    timeline: [
      {
        id: '1',
        date: '2024-02-22',
        mealType: 'breakfast',
        foodImages: [PLACEHOLDER_FOOD_IMAGE],
        cgmGraphImage: PLACEHOLDER_CGM_GRAPH,
        sugarLevel: 110,
        timestamp: '2024-02-22T08:30:00Z',
      },
    ],
    sugarLevels: [
      { timestamp: '2024-02-22T08:00:00Z', value: 110 },
      { timestamp: '2024-02-22T10:00:00Z', value: 115 },
      { timestamp: '2024-02-22T12:00:00Z', value: 125 },
    ],
  },
];

export const dummyEmployees: Employee[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    stats: {
      totalChats: 150,
      avgResponseTime: 2.5,
      customersHelped: 45,
    },
    actions: [
      {
        id: '1',
        type: 'chat_response',
        timestamp: '2024-02-22T10:01:00Z',
        description: 'Responded to customer query about diet plan',
      },
      {
        id: '2',
        type: 'review',
        timestamp: '2024-02-22T11:00:00Z',
        description: 'Reviewed customer\'s meal plan',
      },
    ],
  },
  {
    id: '2',
    name: 'Bob Wilson',
    email: 'bob@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    stats: {
      totalChats: 120,
      avgResponseTime: 3.0,
      customersHelped: 35,
    },
    actions: [
      {
        id: '1',
        type: 'customer_assignment',
        timestamp: '2024-02-22T09:00:00Z',
        description: 'Assigned to new customer Jane Smith',
      },
    ],
  },
];

export const initialAppState: AppState = {
  customers: dummyCustomers,
  employees: dummyEmployees,
  currentUser: null,
}; 