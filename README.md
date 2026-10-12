# Student Management System - DTC245200010

Hệ thống quản lý sinh viên tích hợp DevOps, Nginx, Prometheus, Grafana, Loki và Hardening bảo mật.

## Thành phần
- **Web App**: Node.js + Express (CRUD sinh viên, lớp, điểm số)
- **Database**: MySQL 8.0 + phpMyAdmin
- **Reverse Proxy**: Nginx (với security headers)
- **Giám sát**: Prometheus + Grafana + cAdvisor
- **Log tập trung**: Loki + Promtail
- **Hardening**: Non-root user, Network isolation, Password policies.

## Hướng dẫn chạy hệ thống
1. Clone repository về máy.
2. Khởi chạy bằng Docker Compose:
   ```bash
   docker compose up -d --build
