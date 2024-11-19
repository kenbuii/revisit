import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://edtnokdxetrhphsxxpcd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkdG5va2R4ZXRyaHBoc3h4cGNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NzMxMTAsImV4cCI6MjA0NzU0OTExMH0.GXeVhh1Xy6J1N65U3VjYGPcTWUn7eSW40ea2CxG_usY";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
