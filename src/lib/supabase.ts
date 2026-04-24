import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const missingSupabaseMessage =
  'CRM routes require VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to be set.';

const missingSupabaseProxy = new Proxy(
  {},
  {
    get() {
      throw new Error(missingSupabaseMessage);
    },
  },
);

export const supabase = (isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : missingSupabaseProxy) as SupabaseClient;
