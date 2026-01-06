
import { createClient } from '@supabase/supabase-js';

// Credenciais fornecidas para integração direta
const supabaseUrl = 'https://oocyvbexigpaqgucqcwc.supabase.co';
const supabaseAnonKey = 'sb_publishable_UE3CY9AkCcnRTPNVyvPQaQ_2DNwzY_w';

/**
 * Inicialização protegida do cliente Supabase.
 * Evita o erro "supabaseUrl is required" ou falhas de parse de chave que impedem o app de abrir.
 */
const createSafeClient = () => {
  try {
    if (!supabaseUrl || !supabaseAnonKey || !supabaseUrl.startsWith('http')) {
      console.warn("Supabase: URL ou Chave inválida.");
      return null;
    }
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.error("Falha ao instanciar Supabase:", e);
    return null;
  }
};

export const supabase = createSafeClient();
