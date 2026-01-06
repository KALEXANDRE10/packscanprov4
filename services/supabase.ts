
import { createClient } from '@supabase/supabase-js';

// Credenciais lidas das variáveis de ambiente injetadas pelo Vite/Vercel
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

const createSafeClient = () => {
  try {
    if (!supabaseUrl || !supabaseAnonKey || !supabaseUrl.startsWith('http')) {
      console.warn("Supabase: Aguardando configuração de variáveis de ambiente no Vercel.");
      return null;
    }
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.error("Falha ao instanciar Supabase:", e);
    return null;
  }
};

export const supabase = createSafeClient();
