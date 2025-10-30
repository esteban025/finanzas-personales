import { supabase } from "@/services/supabase";

export const getSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export const getUserInfo = async () => {
  const session = await getSession();

  // devolver solamente el nombre, email y avaratar_url
  if (session?.user) {
    const { user } = session;
    return {
      email: user.email,
      avatar_url: user.user_metadata.avatar_url || null,
      full_name: user.user_metadata.full_name || null,
    };
  }
}
