# PPB API - Perpustakaan
## Myesha Azka Hafizha - 21120124130090 - Kelompok 17 Shift 03
Proyek ini adalah RESTful API untuk layanan pencatatan peminjaman buku perpustakaan, dibangun menggunakan **Node.js**, **Express.js**, dan **Supabase** (PostgreSQL). API ini digunakan untuk mengelola data buku, anggota, dan peminjaman buku. Proyek ini dibuat sebagai bagian dari Responsi Pemrograman Perangkat Bergerak Modul 1.

## Tujuan

Tujuan dari pembuatan API ini adalah untuk menerapkan konsep REST API menggunakan Node.js dan Express.js dengan Supabase sebagai database. API menyediakan operasi CRUD untuk data buku, anggota, dan peminjaman serta fitur filter peminjaman berdasarkan status.

## Persyaratan Sistem

Pastikan perangkat Anda sudah menginstal:

- [Node.js](https://nodejs.org/) (versi 16 atau lebih baru)
- Git (opsional, untuk *cloning* repositori)
- [Postman](https://www.postman.com/) (untuk pengujian API)
- [Supabase](https://supabase.com/) (sebagai database)
- [Vercel](https://vercel.com/) (untuk deployment)

## Struktur Basis Data (Supabase)

Database terdiri dari tiga tabel, yaitu `books`, `members`, dan `loans`.

### Tabel Books

```sql
create table books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text not null
);
```

### Tabel Members

```sql
create table members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null
);
```

### Tabel Loans

```sql
create table loans (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references books(id) on delete restrict,
  member_id uuid not null references members(id) on delete restrict,
  loan_date date not null default current_date,
  due_date date not null,
  return_date date,
  status text not null default 'Dipinjam',
  constraint loans_status_check
    check (status in ('Dipinjam', 'Dikembalikan', 'Terlambat'))
);
```

Relasi pada tabel `loans`:

- `book_id` merupakan *foreign key* yang mengarah ke `books.id`
- `member_id` merupakan *foreign key* yang mengarah ke `members.id`

## Cara Instalasi dan Menjalankan Program

1. **Clone Repositori**

   ```bash
   git clone https://github.com/myeshaazka/responsi-ppb-perpustakaan.git
   cd responsi-ppb-perpustakaan
   ```

2. **Instal Dependensi**

   Buka terminal di dalam folder proyek, lalu jalankan:

   ```bash
   npm install
   ```

3. **Konfigurasi *Environment Variables***

   Buat sebuah file baru bernama `.env` di folder utama (sejajar dengan `package.json`).

   Salin dan tempel format berikut:

   ```env
   SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   SUPABASE_KEY=anon-public-key-anda
   PORT=3000
   ```

   Ganti `SUPABASE_URL` dan `SUPABASE_KEY` dengan kredensial Supabase yang digunakan pada project.

   **Catatan:** File `.env` tidak perlu diunggah ke GitHub karena berisi konfigurasi rahasia.

4. **Jalankan Server API**

   Untuk mode *development*:

   ```bash
   npm run dev
   ```

   Atau untuk mode *production*:

   ```bash
   npm start
   ```

5. **Server Berjalan**

   Jika berhasil, server dapat diakses melalui:

   ```text
   http://localhost:3000
   ```

## Endpoint API

### Books

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/books` | Menampilkan semua buku |
| GET | `/api/books/:id` | Menampilkan buku berdasarkan ID |
| POST | `/api/books` | Menambahkan buku |
| PUT | `/api/books/:id` | Mengubah data buku |
| DELETE | `/api/books/:id` | Menghapus buku |

### Members

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/members` | Menampilkan semua anggota |
| GET | `/api/members/:id` | Menampilkan anggota berdasarkan ID |
| POST | `/api/members` | Menambahkan anggota |
| PUT | `/api/members/:id` | Mengubah data anggota |
| DELETE | `/api/members/:id` | Menghapus anggota |

### Loans

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/loans` | Menampilkan semua peminjaman |
| GET | `/api/loans/:id` | Menampilkan peminjaman berdasarkan ID |
| POST | `/api/loans` | Menambahkan data peminjaman |
| PUT | `/api/loans/:id` | Mengubah data peminjaman |
| DELETE | `/api/loans/:id` | Menghapus data peminjaman |
| GET | `/api/loans?status=Terlambat` | Menampilkan peminjaman berdasarkan status |

## Contoh Request dan Response

### POST `/api/loans`

Request:

```json
{
  "book_id": "b1127fd2-3067-4c78-8274-78e40f59513d",
  "member_id": "947168c6-1b09-4da8-9e4b-436fbad207ef",
  "loan_date": "2026-09-29",
  "due_date": "2026-10-06",
  "return_date": null,
  "status": "Dipinjam"
}
```

Response:

```json
{
  "message": "Peminjaman berhasil ditambahkan",
  "data": {
    "id": "7bb8074d-bd86-416c-a237-06df8396dfd6",
    "book_id": "b1127fd2-3067-4c78-8274-78e40f59513d",
    "member_id": "947168c6-1b09-4da8-9e4b-436fbad207ef",
    "loan_date": "2026-09-29",
    "due_date": "2026-10-06",
    "return_date": null,
    "status": "Dipinjam"
  }
}
```

### GET `/api/loans?status=Terlambat`

Response:

```json
{
  "message": "Data peminjaman berhasil diambil",
  "data": [
    {
      "id": "7bb8074d-bd86-416c-a237-06df8396dfd6",
      "loan_date": "2026-09-29",
      "due_date": "2026-10-06",
      "return_date": null,
      "status": "Terlambat",
      "books": {
        "id": "b1127fd2-3067-4c78-8274-78e40f59513d",
        "title": "Bumi",
        "author": "Tere Liye"
      },
      "members": {
        "id": "947168c6-1b09-4da8-9e4b-436fbad207ef",
        "name": "Andi",
        "email": "andi@gmail.com"
      }
    }
  ]
}
```

## Pengujian dengan Postman

Pengujian API dilakukan menggunakan Postman untuk memastikan seluruh endpoint dapat berjalan dengan baik. Pengujian meliputi operasi **GET, POST, PUT, dan DELETE** pada data buku, anggota, dan peminjaman.

Selain itu, dilakukan pengujian filter peminjaman menggunakan query parameter:

```http
GET /api/loans?status=Terlambat
```

## Deployment

API telah di-*deploy* menggunakan Vercel dan dapat diakses melalui:

https://responsi-ppb-perpustakaan.vercel.app

Contoh endpoint:

```text
https://responsi-ppb-perpustakaan.vercel.app/api/books
```

```text
https://responsi-ppb-perpustakaan.vercel.app/api/members
```

```text
https://responsi-ppb-perpustakaan.vercel.app/api/loans
```

## Repository

Source code project tersedia di GitHub:

https://github.com/myeshaazka/responsi-ppb-perpustakaan
