import { supabase } from "../config/supabaseClient.js";

const LoanModel = {
  async getAll(status) {
    let query = supabase
      .from("loans")
      .select(`
        id,
        loan_date,
        due_date,
        return_date,
        status,
        books (
          id,
          title,
          author
        ),
        members (
          id,
          name,
          email
        )
      `)
      .order("loan_date", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("loans")
      .select(`
        id,
        loan_date,
        due_date,
        return_date,
        status,
        books (
          id,
          title,
          author
        ),
        members (
          id,
          name,
          email
        )
      `)
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  async create(loan) {
    const { data, error } = await supabase
      .from("loans")
      .insert(loan)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async update(id, loan) {
    const { data, error } = await supabase
      .from("loans")
      .update(loan)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async delete(id) {
    const { data, error } = await supabase
      .from("loans")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }
};

export default LoanModel;