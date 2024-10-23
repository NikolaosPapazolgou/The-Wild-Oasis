import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://pinshqtrmoexaxmhvduw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpbnNocXRybW9leGF4bWh2ZHV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0NDU2MTIsImV4cCI6MjA0NTAyMTYxMn0.QSYJaWFiuI5zSYTeGsvq8CjzZogtc7AaEZw0wtoZ7x4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
