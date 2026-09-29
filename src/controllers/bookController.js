import BookModel from "../models/bookModel.js";

const BookController = {
  async getAll(req, res) {
    try {
      const books = await BookModel.getAll();

      res.status(200).json({
        message: "Data buku berhasil diambil",
        data: books
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengambil data buku",
        error: error.message
      });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;

      const book = await BookModel.getById(id);

      res.status(200).json({
        message: "Data buku berhasil diambil",
        data: book
      });
    } catch (error) {
      res.status(404).json({
        message: "Buku tidak ditemukan",
        error: error.message
      });
    }
  },

  async create(req, res) {
    try {
      const { title, author } = req.body;

      const book = await BookModel.create({
        title,
        author
      });

      res.status(201).json({
        message: "Buku berhasil ditambahkan",
        data: book
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal menambahkan buku",
        error: error.message
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, author } = req.body;

      const book = await BookModel.update(id, {
        title,
        author
      });

      res.status(200).json({
        message: "Buku berhasil diperbarui",
        data: book
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal memperbarui buku",
        error: error.message
      });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const book = await BookModel.delete(id);

      res.status(200).json({
        message: "Buku berhasil dihapus",
        data: book
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal menghapus buku",
        error: error.message
      });
    }
  }
};

export default BookController;