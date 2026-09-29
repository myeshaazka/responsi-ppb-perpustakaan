import LoanModel from "../models/loanModel.js";

const LoanController = {
  async getAll(req, res) {
    try {
      const { status } = req.query;

      const loans = await LoanModel.getAll(status);

      res.status(200).json({
        message: "Data peminjaman berhasil diambil",
        data: loans
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengambil data peminjaman",
        error: error.message
      });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;

      const loan = await LoanModel.getById(id);

      res.status(200).json({
        message: "Data peminjaman berhasil diambil",
        data: loan
      });
    } catch (error) {
      res.status(404).json({
        message: "Data peminjaman tidak ditemukan",
        error: error.message
      });
    }
  },

  async create(req, res) {
    try {
      const {
        book_id,
        member_id,
        loan_date,
        due_date,
        return_date,
        status
      } = req.body;

      const loan = await LoanModel.create({
        book_id,
        member_id,
        loan_date,
        due_date,
        return_date,
        status
      });

      res.status(201).json({
        message: "Peminjaman berhasil ditambahkan",
        data: loan
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal menambahkan peminjaman",
        error: error.message
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;

      const {
        book_id,
        member_id,
        loan_date,
        due_date,
        return_date,
        status
      } = req.body;

      const loan = await LoanModel.update(id, {
        book_id,
        member_id,
        loan_date,
        due_date,
        return_date,
        status
      });

      res.status(200).json({
        message: "Peminjaman berhasil diperbarui",
        data: loan
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal memperbarui peminjaman",
        error: error.message
      });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const loan = await LoanModel.delete(id);

      res.status(200).json({
        message: "Peminjaman berhasil dihapus",
        data: loan
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal menghapus peminjaman",
        error: error.message
      });
    }
  }
};

export default LoanController;