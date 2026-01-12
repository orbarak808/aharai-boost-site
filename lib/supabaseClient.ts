import { createClient } from '@supabase/supabase-js';

// מוודאים שהמשתנים קיימים, אם לא - משתמשים במחרוזת ריקה כדי לא לשבור את הבנייה
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);