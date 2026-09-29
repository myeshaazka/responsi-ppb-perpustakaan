import MemberModel from "../models/memberModel.js";

const MemberController = {
  async getAll(req, res) {
    try {
      const members = await MemberModel.getAll();

      res.status(200).json({
        message: "Data anggota berhasil diambil",
        data: members
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal mengambil data anggota",
        error: error.message
      });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const member = await MemberModel.getById(id);

      res.status(200).json({
        message: "Data anggota berhasil diambil",
        data: member
      });
    } catch (error) {
      res.status(404).json({
        message: "Anggota tidak ditemukan",
        error: error.message
      });
    }
  },

  async create(req, res) {
    try {
      const { name, email } = req.body;

      const member = await MemberModel.create({
        name,
        email
      });

      res.status(201).json({
        message: "Anggota berhasil ditambahkan",
        data: member
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal menambahkan anggota",
        error: error.message
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      const member = await MemberModel.update(id, {
        name,
        email
      });

      res.status(200).json({
        message: "Anggota berhasil diperbarui",
        data: member
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal memperbarui anggota",
        error: error.message
      });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const member = await MemberModel.delete(id);

      res.status(200).json({
        message: "Anggota berhasil dihapus",
        data: member
      });
    } catch (error) {
      res.status(500).json({
        message: "Gagal menghapus anggota",
        error: error.message
      });
    }
  }
};

export default MemberController;