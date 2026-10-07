import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useAdminAccess = () => {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [hasAdmin, setHasAdmin] = useState(true);

  const verify = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setAuthenticated(false);
      setChecking(false);
      return false;
    }
    const { data, error } = await supabase.functions.invoke('admin-applications', {
      body: { action: 'check_access' },
    });
    const allowed = !error && data?.authorized === true;
    setAuthenticated(allowed);
    if (!allowed) await supabase.auth.signOut();
    setChecking(false);
    return allowed;
  }, []);

  useEffect(() => {
    const initialise = async () => {
      const { data } = await supabase.functions.invoke('admin-applications', {
        body: { action: 'admin_status' },
      });
      setHasAdmin(data?.hasAdmin !== false);
      await verify();
    };
    initialise();
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') setAuthenticated(false);
    });
    return () => listener.subscription.unsubscribe();
  }, [verify]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { ok: false, message: error.message };
    const allowed = await verify();
    return { ok: allowed, message: allowed ? '' : 'Ce compte ne possède pas les droits administrateur.' };
  };

  const createFirstAdmin = async (email: string, password: string, setupCode: string) => {
    const { data, error } = await supabase.functions.invoke('admin-applications', {
      body: { action: 'bootstrap_admin', email, password, setupCode },
    });
    if (error || !data?.ok) return { ok: false, message: data?.error ?? error?.message ?? 'Création impossible.' };
    setHasAdmin(true);
    return signIn(email, password);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setAuthenticated(false);
  };

  return { checking, authenticated, hasAdmin, signIn, createFirstAdmin, signOut };
};