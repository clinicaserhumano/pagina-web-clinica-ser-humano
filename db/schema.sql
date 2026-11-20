-- Esquema de la base de datos del sitio (MySQL / MariaDB en cPanel).
-- Reemplaza a las tablas que vivían en Supabase. Idempotente: se puede ejecutar varias veces.

SET NAMES utf8mb4;

-- Artículos del blog (/novedades)
CREATE TABLE IF NOT EXISTS entradas_blog (
  id             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  titulo         VARCHAR(255) NOT NULL,
  slug           VARCHAR(255) NOT NULL,
  extracto       TEXT NULL,
  contenido      MEDIUMTEXT NULL,
  autor          VARCHAR(150) NULL,
  categoria      VARCHAR(100) NULL,
  etiquetas      JSON NULL,
  imagen_url     VARCHAR(500) NULL,
  publicado      TINYINT(1) NOT NULL DEFAULT 0,
  creado_en      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_entradas_slug (slug),
  KEY idx_entradas_publicado (publicado, creado_en)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Comentarios de los artículos (moderados desde /admin)
CREATE TABLE IF NOT EXISTS comments (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug       VARCHAR(255) NOT NULL,
  nombre     VARCHAR(150) NOT NULL,
  comentario TEXT NOT NULL,
  aprobado   TINYINT(1) NOT NULL DEFAULT 0,
  creado_en  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_comments_slug (slug, aprobado, creado_en),
  KEY idx_comments_aprobado (aprobado, creado_en)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Personas que escriben por el formulario de contacto
CREATE TABLE IF NOT EXISTS mensajes_contacto (
  id        INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre    VARCHAR(150) NOT NULL,
  telefono  VARCHAR(50)  NOT NULL,
  email     VARCHAR(255) NULL,
  mensaje   TEXT NOT NULL,
  leido     TINYINT(1) NOT NULL DEFAULT 0,
  creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_mensajes_leido (leido, creado_en)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
