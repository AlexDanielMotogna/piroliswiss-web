"""Genera las firmas de correo de Piroliswiss (una página HTML por persona).

Uso:  python firmas/generar.py
Abrir el .html en el navegador, seleccionar todo (Ctrl+A), copiar y pegar en la
configuración de firma de Gmail / Outlook / Hostinger Webmail.
Las imágenes se cargan desde https://piroliswiss.com/email/ (carpeta public/email).

Diseño (referencia del cliente, 2026-09-30): a la izquierda el wordmark
PIROLISWISS con la bandera suiza; línea vertical verde; a la derecha nombre,
cargo y los datos con iconos verdes (PNG en public/email/icons). Fondo blanco.
Solo tablas y estilos en línea, que es lo que respetan Gmail y Outlook.
Teléfono: rellenar en PEOPLE; si está vacío la fila no aparece.
"""
from pathlib import Path

SITE = "https://piroliswiss.com"
IMG = f"{SITE}/email"
FONT = "Arial, Helvetica, sans-serif"
INK, SLATE = "#1F2326", "#5F676C"
LEAF = "#769B17"

# (slug, nombre, cargo, correo, teléfono)
PEOPLE = [
    ("frederico-zwald", "Frederico Zwald", "Fundador y CEO", "fredericozwald@piroliswiss.com", ""),
    ("christian-vargas", "Christian Vargas", "Cofundador y CFO", "christianvargas@piroliswiss.com", ""),
    ("alex-motogna", "Alex Motogna", "Cofundador y CTO", "alexdanielmotogna@piroliswiss.com", ""),
]


def row(icon: str, value: str) -> str:
    return (
        f'<tr><td style="padding:0 10px 7px 0;vertical-align:middle;">'
        f'<img src="{IMG}/icons/{icon}.png" width="16" height="16" alt="" style="display:block;width:16px;height:16px;border:0;"></td>'
        f'<td style="padding:0 0 7px;vertical-align:middle;font:13px/16px {FONT};color:{INK};white-space:nowrap;">{value}</td></tr>'
    )


def signature(slug: str, name: str, role: str, email: str, phone: str) -> str:
    link = f"color:{INK};text-decoration:none;"
    rows = ""
    if phone:
        rows += row("phone", f'<a href="tel:{phone.replace(" ", "")}" style="{link}">{phone}</a>')
    rows += row("mail", f'<a href="mailto:{email}" style="{link}">{email}</a>')
    rows += row("pin", "Santa Cruz, Bolivia")
    rows += row("web", f'<a href="{SITE}" style="{link}">www.piroliswiss.com</a>')
    return f"""<table role="presentation" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" style="border-collapse:collapse;background:#FFFFFF;font-family:{FONT};">
  <tr>
    <td style="padding:0 26px 0 0;vertical-align:middle;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr>
        <td style="vertical-align:middle;font:700 22px/1 {FONT};letter-spacing:4px;color:{INK};white-space:nowrap;">PIROLI<span style="color:{LEAF};">SWISS</span></td>
        <td style="padding:0 0 0 6px;vertical-align:middle;"><img src="{IMG}/flag.png" width="18" height="18" alt="" style="display:block;width:18px;height:18px;border:0;"></td>
      </tr></table>
    </td>
    <td width="2" bgcolor="{LEAF}" style="width:2px;background:{LEAF};font-size:0;line-height:0;">&nbsp;</td>
    <td style="padding:4px 0 0 22px;vertical-align:top;">
      <div style="font:700 17px/21px {FONT};color:{INK};">{name}</div>
      <div style="padding-bottom:14px;font:13px/18px {FONT};color:{SLATE};">{role}</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        {rows}
      </table>
    </td>
  </tr>
</table>"""


def page(title: str, body: str) -> str:
    return f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>{title}</title>
</head>
<body style="margin:0;padding:32px;background:#ffffff;">
{body}
</body>
</html>
"""


out = Path(__file__).parent
for slug, name, role, email, phone in PEOPLE:
    f = out / f"firma-{slug}.html"
    f.write_text(page(f"Firma {name} | Piroliswiss", signature(slug, name, role, email, phone)), encoding="utf-8")
    print("ok", f.name)
