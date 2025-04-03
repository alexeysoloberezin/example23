import {createClient} from "@supabase/supabase-js";

export const useSupabase = () => {
  const supabaseUrl: string = useRuntimeConfig().public.apiUrl as string
  const supabaseKey: string = useRuntimeConfig().public.secretKey as string

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase: отсутствуют NUXT_PUBLIC_SUPABASE_URL или NUXT_PUBLIC_SUPABASE_KEY");
  }

  const supabase = createClient(
    supabaseUrl,
    supabaseKey
  );

  return supabase
};

