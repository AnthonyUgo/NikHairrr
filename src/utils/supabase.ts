// src/utils/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qkrlaqpucbxjavonbpvr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrcmxhcXB1Y2J4amF2b25icHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5OTk2MzEsImV4cCI6MjA3OTU3NTYzMX0.Hp5vyKTnioFCP6CC9R1QmBZHNmDvc56gZ15IyeE9-j0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/`,
    },
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Loyalty Points helpers
export const getUserLoyaltyPoints = async (userId: string) => {
  const { data, error } = await supabase
    .from('loyalty_points')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  return { data, error };
};

export const addLoyaltyPoints = async (userId: string, points: number, source: string) => {
  const { data, error } = await supabase
    .from('loyalty_points')
    .upsert({
      user_id: userId,
      points,
      source,
      created_at: new Date().toISOString(),
    });
  
  return { data, error };
};
