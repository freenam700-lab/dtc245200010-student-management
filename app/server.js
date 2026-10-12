const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql_db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'SecureRootPassword123!',
  database: process.env.DB_NAME || 'student_db'
});

db.connect(err => {
  if (err) {
    console.error('Lỗi kết nối MySQL:', err);
    return;
  }
  console.log('Đã kết nối thành công tới cơ sở dữ liệu MySQL!');
  db.query(`CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    class VARCHAR(50) NOT NULL,
    gpa DECIMAL(3,2) NOT NULL
  )`);
});

app.get('/', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      return res.status(500).send('Lỗi server');
    }
    let html = `
      <html>
      <head>
        <title>Hệ thống Quản lý Sinh viên - DTC245200010</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; background: #f4f4f9; }
          h2 { color: #333; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; background: #fff; }
          th, td { padding: 12px; border: 1px solid #ddd; text-align: left; }
          th { background-color: #007bff; color: white; }
          form { background: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1); width: 400px; }
          input { display: block; width: 100%; margin-bottom: 10px; padding: 8px; box-sizing: border-box; }
          button { background: #28a745; color: white; border: none; padding: 10px 15px; cursor: pointer; }
          a { color: red; text-decoration: none; }
        </style>
      </head>
      <body>
        <h2>Hệ thống Quản lý Sinh viên (Mã SV: dtc245200010)</h2>
        <form action="/add" method="POST">
          <h3>Thêm sinh viên mới</h3>
          <input type="text" name="name" placeholder="Họ và tên" required>
          <input type="text" name="class" placeholder="Lớp (Ví dụ: CNTTK64)" required>
          <input type="number" step="0.01" name="gpa" placeholder="Điểm GPA (0-4.0)" required>
          <button type="submit">Thêm sinh viên</button>
        </form>
        <h3>Danh sách sinh viên</h3>
        <table>
          <tr><th>ID</th><th>Họ tên</th><th>Lớp</th><th>GPA</th><th>Hành động</th></tr>
    `;
    results.forEach(row => {
      html += `<tr>
        <td>${row.id}</td>
        <td>${row.name}</td>
        <td>${row.class}</td>
        <td>${row.gpa}</td>
        <td><a href="/delete/${row.id}">Xóa</a></td>
      </tr>`;
    });
    html += `</table></body></html>`;
    res.send(html);
  });
});

app.post('/add', (req, res) => {
  const { name, class: studentClass, gpa } = req.body;
  db.query('INSERT INTO students (name, class, gpa) VALUES (?, ?, ?)', [name, studentClass, gpa], err => {
    if (err) console.error(err);
    res.redirect('/');
  });
});

app.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM students WHERE id = ?', [id], err => {
    if (err) console.error(err);
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log(`Ứng dụng đang chạy tại cổng ${PORT}`);
});
