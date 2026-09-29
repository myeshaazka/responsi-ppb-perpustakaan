import { supabase } from "../config/supabaseClient.js";

const BookModel = {
  async getAll() {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("title", { ascending: true });

    if (error) {
      throw error;
    }

    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async create(book) {
    const { data, error } = await supabase
      .from("books")
      .insert(book)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async update(id, book) {
    const { data, error } = await supabase
      .from("books")
      .update(book)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async delete(id) {
    const { data, error } = await supabase
      .from("books")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }
};

export default BookModel;