import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kvicrrygvxtobpsjuapv.supabase.co";
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey || " ");

async function getAllLanguages() {
  return await supabase?.from("languages").select();
}

export { getAllLanguages };
