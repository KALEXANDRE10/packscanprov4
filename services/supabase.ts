
import { createClient } from '@supabase/supabase-js';

// Credenciais fornecidas para integração direta
const supabaseUrl = 'https://oocyvbexigpaqgucqcwc.supabase.co';
const supabaseAnonKey = 'sb_publishable_UE3CY9AkCcnRTPNVyvPQaQ_2DNwzY_w';

/**
 * Inicialização do cliente Supabase.
 * As chaves foram inseridas diretamente para garantir a conectividade conforme solicitado.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
