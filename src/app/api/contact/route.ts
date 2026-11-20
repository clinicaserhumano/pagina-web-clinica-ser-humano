import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { execute } from "@/lib/db";

// Transporter singleton — se crea una sola vez y reutiliza la conexión
const transporter = nodemailer.createTransport({
  service: "gmail",
  pool: true,
  maxConnections: 3,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function buildEmail(nombre: string, telefono: string, mensaje: string) {
  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ebece8;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#ebece8;padding:32px 16px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">

        <!-- Header naranja -->
        <tr>
          <td style="background:#ff6b12;border-radius:16px 16px 0 0;padding:28px 32px;text-align:center">
            <p style="margin:0;color:#fff;font-size:22px;font-weight:700;letter-spacing:-0.3px">
              Clínica Ser Humano
            </p>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:13px">
              Nuevo mensaje desde serhumano.org
            </p>
          </td>
        </tr>

        <!-- Cuerpo -->
        <tr>
          <td style="background:#ffffff;padding:32px;border-radius:0 0 16px 16px">

            <p style="margin:0 0 24px;color:#616569;font-size:14px">
              Un visitante completó el formulario de contacto. Aquí están sus datos:
            </p>

            <!-- Datos -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:12px 16px;background:#ebece8;border-radius:10px 10px 0 0;border-bottom:1px solid #d5d6d2">
                  <p style="margin:0;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.8px">Nombre</p>
                  <p style="margin:4px 0 0;font-size:16px;font-weight:600;color:#616569">${nombre}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#ebece8;border-radius:0;border-bottom:1px solid #d5d6d2">
                  <p style="margin:0;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.8px">Teléfono</p>
                  <p style="margin:4px 0 0;font-size:16px;font-weight:600;color:#616569">
                    <a href="tel:${telefono}" style="color:#ff6b12;text-decoration:none">${telefono}</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#ebece8;border-radius:0 0 10px 10px">
                  <p style="margin:0;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.8px">Mensaje</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#616569;line-height:1.5">${mensaje}</p>
                </td>
              </tr>
            </table>

            <!-- CTA responder -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px">
              <tr>
                <td align="center">
                  <a href="https://wa.me/593969520111?text=Hola%20${encodeURIComponent(nombre)}%2C%20te%20contactamos%20desde%20Ser%20Humano%20Salud%20Integral."
                     style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:12px 28px;border-radius:50px;font-size:14px;font-weight:600">
                    Responder por WhatsApp
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 0;text-align:center">
            <p style="margin:0;font-size:11px;color:#aaa">
              Clínica Clínica Ser Humano · Guayaquil, Ecuador<br>
              Este correo fue generado automáticamente desde serhumano.org
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  const { nombre, telefono, mensaje } = await req.json();

  if (!nombre || !telefono || !mensaje) {
    return NextResponse.json({ error: "Campos incompletos" }, { status: 400 });
  }

  // Guarda en la base de datos y envía el email en paralelo (ambos en segundo plano)
  execute("INSERT INTO mensajes_contacto (nombre, telefono, mensaje) VALUES (?, ?, ?)", [
    String(nombre).slice(0, 150),
    String(telefono).slice(0, 50),
    String(mensaje),
  ]).catch((err) => console.error("[contact] Error guardando en la base de datos:", err.message));

  transporter.sendMail({
    from: `"Ser Humano Web" <${process.env.SMTP_USER}>`,
    to: "recepcion@serhumano.org",
    replyTo: process.env.SMTP_USER,
    subject: `📩 Nuevo contacto: ${nombre} — ${telefono}`,
    html: buildEmail(nombre, telefono, mensaje),
  }).catch((err) => console.error("[contact] Error enviando correo:", err));

  return NextResponse.json({ ok: true });
}
