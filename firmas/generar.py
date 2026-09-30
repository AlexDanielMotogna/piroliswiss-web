"""Genera las firmas de correo de Piroliswiss (una página HTML por persona).

Uso:  python firmas/generar.py
Abrir el .html en el navegador, seleccionar todo (Ctrl+A), copiar y pegar en la
configuración de firma de Gmail / Outlook / Hostinger Webmail.
Las imágenes se cargan desde https://piroliswiss.com/email/ (carpeta public/email).

Diseño: tipográfico y sobrio, como la web. Foto pequeña, nombre y cargo,
datos en texto plano separados por " / ", una línea fina y la marca debajo.
Sin tarjeta, sin botones, sin iconos. Solo tablas y estilos en línea, que es
lo que respetan Gmail y Outlook.
"""
from pathlib import Path

SITE = "https://piroliswiss.com"
IMG = f"{SITE}/email"
FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif"
INK, SLATE, RULE = "#15181A", "#6B7378", "#E3E5E1"
RED, LEAF = "#D40000", "#769B17"

PEOPLE = [
    ("frederico-zwald", "Frederico Zwald", "Fundador y CEO", "fredericozwald@piroliswiss.com"),
    ("christian-vargas", "Christian Vargas", "Cofundador y CFO", "christianvargas@piroliswiss.com"),
    ("alex-motogna", "Alex Motogna", "Cofundador y CTO", "alexdanielmotogna@piroliswiss.com"),
]


def signature(slug: str, name: str, role: str, email: str) -> str:
    link = f"color:{INK};text-decoration:none;"
    sep = f'<span style="color:{RULE};">&nbsp;/&nbsp;</span>'
    return f"""<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:{FONT};">
  <tr>
    <td style="padding:0 18px 0 0;vertical-align:top;">
      <img src="{IMG}/team/{slug}.jpg" width="64" height="64" alt="{name}" style="display:block;width:64px;height:64px;border:0;border-radius:8px;">
    </td>
    <td style="vertical-align:top;">
      <div style="font:600 15px/20px {FONT};color:{INK};letter-spacing:-0.2px;">{name}</div>
      <div style="font:13px/18px {FONT};color:{SLATE};">{role}</div>
      <div style="padding-top:10px;font:13px/19px {FONT};color:{INK};">
        <a href="mailto:{email}" style="{link}">{email}</a>
      </div>
      <div style="font:13px/19px {FONT};color:{SLATE};">
        <a href="{SITE}" style="{link}">piroliswiss.com</a>{sep}Santa Cruz de la Sierra, Bolivia
      </div>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding:16px 0 0;">
      <div style="height:1px;line-height:1px;font-size:0;background:{RULE};">&nbsp;</div>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding:12px 0 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr>
        <td style="padding:0 7px 0 0;vertical-align:middle;"><img src="{IMG}/mark.png" width="17" height="18" alt="" style="display:block;border:0;"></td>
        <td style="padding:0 18px 0 0;vertical-align:middle;font:700 11px/1 {FONT};letter-spacing:2.2px;color:{INK};white-space:nowrap;">PIROLI<span style="color:{LEAF};">SWISS</span></td>
        <td style="vertical-align:middle;font:11px/1 {FONT};color:{SLATE};letter-spacing:0.2px;">Carbón vegetal{sep}Ácido piroleñoso{sep}Briquetas</td>
      </tr></table>
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
for slug, name, role, email in PEOPLE:
    f = out / f"firma-{slug}.html"
    f.write_text(page(f"Firma {name} | Piroliswiss", signature(slug, name, role, email)), encoding="utf-8")
    print("ok", f.name)
