# 🐾 Sistema de Gestión de Turnos – Veterinaria / Estética Canina

Aplicación **desktop**, **offline** y **minimalista** para la gestión de turnos en veterinarias y estéticas caninas.  
Pensada para ser rápida, simple y escalable localmente, sin dependencias online.

---

## 🎯 Objetivo del proyecto

Facilitar la gestión de turnos, clientes y mascotas en veterinarias, evitando:
- Agendas manuales
- Sistemas lentos o genéricos
- Pérdida de historial
- Errores al reprogramar turnos

El producto está diseñado para ser **instalado en una sola PC por veterinaria**, con **base de datos local independiente**.

---

## 🧩 Características principales

- Gestión de turnos (crear, buscar, modificar)
- Turnos con uno o varios servicios
- Solapamiento permitido con advertencia
- Agenda diaria, semanal y mensual
- Clientes con múltiples mascotas
- Historial de turnos por mascota
- Búsqueda instantánea por número de documento
- Configuración de horarios de atención
- Backups manuales de la base de datos
- **Sin imágenes**
- **Sin conexión a internet**
- **Sin sistema de usuarios ni roles**

---

## 🖥️ Plataforma

- Desktop (Electron)
- Totalmente offline
- Solo modo claro
- Interfaz minimalista y profesional
- Sidebar lateral + vistas principales

---

## 🧱 Stack tecnológico

### Frontend (Renderer)
- React
- TypeScript
- React Router DOM
- Tailwind CSS v4
- shadcn/ui
- Lucide Icons

### Backend (Main)
- Electron
- better-sqlite3
- SQLite

### Arquitectura
- IPC tipado extremo a extremo
- Tipos compartidos entre frontend y backend
- Repositorios por dominio
- Sin acceso directo a DB desde React

---

## 📁 Estructura del proyecto

