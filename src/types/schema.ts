// User roles
export type UserRole = 'super_admin' | 'admin' | 'manager' | 'employee' | 'user';

// Plan types
export type PlanType = 'free' | 'starter' | 'creator' | 'pro' | 'scale' | 'business' | 'enterprise';

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  plan: PlanType;
  credits: number;
  avatarUrl?: string;
  phone?: string;
  timezone?: string;
  language?: string;
  createdAt: string;
  updatedAt: string;
}

// Agent interface
export interface Agent {
  id: string;
  name: string;
  voiceId: string;
  voiceName?: string;
  systemPrompt: string;
  knowledgeBaseId?: string;
  phoneNumberId?: string;
  status: 'active' | 'inactive' | 'training';
  callsToday: number;
  totalCalls: number;
  avgDuration: number;
  successRate: number;
  createdAt: string;
  updatedAt: string;
}

// Voice interface
export interface Voice {
  id: string;
  name: string;
  category: string;
  language: string;
  gender: 'male' | 'female' | 'neutral';
  previewUrl?: string;
  isCustom: boolean;
  createdAt: string;
}

// Phone Number interface
export interface PhoneNumber {
  id: string;
  number: string;
  country: string;
  countryCode: string;
  type: 'local' | 'toll-free' | 'mobile';
  status: 'active' | 'pending' | 'inactive';
  agentId?: string;
  agentName?: string;
  provider: 'twilio' | 'vonage' | 'other';
  createdAt: string;
}

// Cost breakdown interface
export interface CostBreakdown {
  telephony: number;
  transcription: number;
  llm: number;
  tts: number;
  total: number;
}

// Call Log interface
export interface CallLog {
  id: string;
  agentId: string;
  agentName: string;
  phoneNumber: string;
  callerNumber: string;
  direction: 'inbound' | 'outbound';
  status: 'completed' | 'missed' | 'failed' | 'in-progress';
  duration: number;
  transcript?: string;
  audioUrl?: string;
  cost: CostBreakdown;
  sentiment?: 'positive' | 'neutral' | 'negative';
  objectionsDetected?: string[];
  createdAt: string;
}

// Knowledge Base interface
export interface KnowledgeBase {
  id: string;
  name: string;
  description?: string;
  documentsCount: number;
  totalTokens: number;
  status: 'ready' | 'processing' | 'error';
  createdAt: string;
  updatedAt: string;
}

// Product interface
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  category: string;
  stock: number;
  status: 'active' | 'inactive';
  imageUrl?: string;
  createdAt: string;
}

// Order interface
export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  products: { productId: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
}

// Employee interface
export interface Employee {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: 'active' | 'inactive';
  permissions: string[];
  createdAt: string;
}

// Integration connection interface
export interface IntegrationConnection {
  id: string;
  provider: 'openai' | 'elevenlabs' | 'twilio' | 'stripe' | 'google' | 'hubspot';
  name: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  credentials?: Record<string, string>;
}

// Automation interface
export interface Automation {
  id: string;
  name: string;
  description?: string;
  trigger: string;
  action: string;
  status: 'active' | 'inactive';
  executionsToday: number;
  lastRun?: string;
  createdAt: string;
}

// Transaction interface
export interface Transaction {
  id: string;
  type: 'credit' | 'debit' | 'refund';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
}

// Notification interface
export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// Plan features
export interface PlanFeatures {
  name: PlanType;
  displayName: string;
  price: number;
  minutes: number;
  agents: number;
  phoneNumbers: number;
  knowledgeBases: number;
  features: string[];
  isPopular?: boolean;
}

// Available permissions
export const AVAILABLE_PERMISSIONS = [
  'manage_agents',
  'manage_calls',
  'manage_products',
  'manage_orders',
  'manage_employees',
  'manage_billing',
  'manage_settings',
  'view_analytics',
  'export_data',
  'manage_integrations',
] as const;

export type Permission = typeof AVAILABLE_PERMISSIONS[number];

// Plan definitions
export const PLANS: PlanFeatures[] = [
  {
    name: 'free',
    displayName: 'Free',
    price: 0,
    minutes: 10,
    agents: 1,
    phoneNumbers: 0,
    knowledgeBases: 1,
    features: ['1 agente', '10 minutos/mês', '1 base de conhecimento'],
  },
  {
    name: 'starter',
    displayName: 'Starter',
    price: 29,
    minutes: 100,
    agents: 2,
    phoneNumbers: 1,
    knowledgeBases: 3,
    features: ['2 agentes', '100 minutos/mês', '1 número de telefone', '3 bases de conhecimento'],
  },
  {
    name: 'creator',
    displayName: 'Creator',
    price: 79,
    minutes: 500,
    agents: 5,
    phoneNumbers: 3,
    knowledgeBases: 10,
    features: ['5 agentes', '500 minutos/mês', '3 números de telefone', '10 bases de conhecimento', 'Suporte prioritário'],
    isPopular: true,
  },
  {
    name: 'pro',
    displayName: 'Pro',
    price: 199,
    minutes: 2000,
    agents: 15,
    phoneNumbers: 10,
    knowledgeBases: 25,
    features: ['15 agentes', '2000 minutos/mês', '10 números de telefone', '25 bases de conhecimento', 'API access', 'Webhooks'],
  },
  {
    name: 'scale',
    displayName: 'Scale',
    price: 499,
    minutes: 5000,
    agents: 50,
    phoneNumbers: 25,
    knowledgeBases: 50,
    features: ['50 agentes', '5000 minutos/mês', '25 números de telefone', '50 bases de conhecimento', 'White-label', 'SLA 99.9%'],
  },
  {
    name: 'business',
    displayName: 'Business',
    price: 999,
    minutes: 15000,
    agents: 100,
    phoneNumbers: 50,
    knowledgeBases: 100,
    features: ['100 agentes', '15000 minutos/mês', '50 números de telefone', 'Ilimitadas bases', 'Dedicated support', 'Custom integrations'],
  },
  {
    name: 'enterprise',
    displayName: 'Enterprise',
    price: -1, // Custom pricing
    minutes: -1,
    agents: -1,
    phoneNumbers: -1,
    knowledgeBases: -1,
    features: ['Agentes ilimitados', 'Minutos ilimitados', 'Números ilimitados', 'Infraestrutura dedicada', 'SLA customizado', 'Onboarding dedicado'],
  },
];
