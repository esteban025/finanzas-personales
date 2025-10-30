import { supabase } from "@/services/supabase";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const createCategory = defineAction({
  input: z.object({
    name: z.string().min(1, "El nombre es requerido."),
    description: z.string(),
  }),
  async handler({ name, description }) {
    
    const user = supabase.auth.getUser();
    const { data: userData } = await user;
    if (!userData.user) {
      throw new Error("Usuario no autenticado.");
    }

    const { data, error } = await supabase.from("categories").insert([
      {
        name,
        description,
        user_id: userData.user.id,
      },
    ]);

    if (error) {
      throw new Error("Error al crear categoría: " + error.message);
    }

    return data;
  },
});