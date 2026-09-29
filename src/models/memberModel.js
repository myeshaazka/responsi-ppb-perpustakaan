import { supabase } from "../config/supabaseClient.js";

const MemberModel = {
  async getAll() {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw error;

    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  async create(member) {
    const { data, error } = await supabase
      .from("members")
      .insert(member)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async update(id, member) {
    const { data, error } = await supabase
      .from("members")
      .update(member)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async delete(id) {
    const { data, error } = await supabase
      .from("members")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }
};

export default MemberModel;