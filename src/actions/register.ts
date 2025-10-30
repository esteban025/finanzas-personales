import { supabase } from "@/services/supabase";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

export const register = defineAction({
  input: z.object({
    email: z.string().email(),
  }),
  async handler({ email }) {
    if (!email) {
            throw new ActionError({
              code: "BAD_REQUEST",
              message: "El correo electrónico es requerido.",
            });
          }
    
          try {
            // Usamos signInWithOtp para enviar un magic link al correo.
            const { data, error } = await supabase.auth.signInWithOtp({ email });
    
            if (error) {
              throw new ActionError({
                code: "BAD_REQUEST",
                message: error.message,
              });
            }
    
            return {
              success: true,
              message:
                "Hemos enviado un enlace a tu correo. Revisa tu bandeja (o spam) y sigue el enlace para iniciar sesión.",
              data,
            };
          } catch (err: any) {
            throw new ActionError({
              code: "INTERNAL_SERVER_ERROR",
              message: err?.message ?? "Error al enviar enlace de inicio de sesión.",
            });
          }
  }
})