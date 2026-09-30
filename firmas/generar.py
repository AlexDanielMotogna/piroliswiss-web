"""Genera las firmas de correo de Piroliswiss (una página HTML por persona).

Uso:  python firmas/generar.py
Abrir el .html en el navegador, seleccionar todo (Ctrl+A), copiar y pegar en la
configuración de firma de Gmail / Outlook / Hostinger Webmail.
Las imágenes se cargan desde https://piroliswiss.com/email/ (carpeta public/email).
"""
from pathlib import Path

SITE = "https://piroliswiss.com"
IMG = f"{SITE}/email"
FONT = "Arial, Helvetica, sans-serif"
INK, SLATE, RULE, RED, LEAF = "#15181A", "#586166", "#DCDFDB", "#D40000", "#6A8C14"

PEOPLE = [
    ("frederico-zwald", "Frederico Zwald", "Fundador y CEO", "fredericozwald@piroliswiss.com"),
    ("christian-vargas", "Christian Vargas", "Cofundador y CFO", "christianvargas@piroliswiss.com"),
    ("alex-motogna", "Alex Motogna", "Cofundador y CTO", "alexdanielmotogna@piroliswiss.com"),
]


def row(label: str, value: str) -> str:
    return (
        f'<tr><td style="padding:0 10px 3px 0;font:600 10px/16px {FONT};letter-spacing:1px;'
        f'text-transform:uppercase;color:{SLATE};vertical-align:top;white-space:nowrap;">{label}</td>'
        f'<td style="padding:0 0 3px;font:13px/16px {FONT};color:{INK};vertical-align:top;">{value}</td></tr>'
    )


def signature(slug: str, name: str, role: str, email: str) -> str:
    link = f"color:{INK};text-decoration:none;"
    return f"""<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:{FONT};color:{INK};">
  <tr>
    <td style="padding:0 18px 0 0;vertical-align:top;">
      <img src="{IMG}/team/{slug}.jpg" width="84" height="84" alt="{name}" style="display:block;width:84px;height:84px;border:0;border-radius:8px;">
    </td>
    <td style="padding:0;vertical-align:top;">
      <div style="font:600 18px/22px {FONT};color:{INK};letter-spacing:-0.2px;">{name}</div>
      <div style="padding-top:3px;font:11px/14px {FONT};letter-spacing:1.5px;text-transform:uppercase;color:{SLATE};">{role}</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:10px 0 8px;border-collapse:collapse;"><tr>
        <td style="width:28px;height:2px;line-height:2px;font-size:0;background:{RED};">&nbsp;</td>
      </tr></table>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        {row("Correo", f'<a href="mailto:{email}" style="{link}">{email}</a>')}
        {row("Web", f'<a href="{SITE}" style="{link}">piroliswiss.com</a>')}
        {row("Oficina", "Calle Clara 2885, Santa Cruz de la Sierra, Bolivia")}
      </table>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding:16px 0 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border-top:1px solid {RULE};"><tr>
        <td style="padding:12px 10px 0 0;vertical-align:middle;"><a href="{SITE}"><img src="{IMG}/mark.png" width="30" height="31" alt="Piroliswiss" style="display:block;border:0;"></a></td>
        <td style="padding:12px 4px 0 0;vertical-align:middle;font:600 13px/1 {FONT};letter-spacing:4px;color:{INK};white-space:nowrap;">PIROLI<span style="color:{LEAF};">SWISS</span></td>
        <td style="padding:12px 16px 0 0;vertical-align:middle;"><img src="{IMG}/flag.png" width="11" height="11" alt="" style="display:block;border:0;"></td>
        <td style="padding:12px 0 0;vertical-align:middle;font:12px/16px {FONT};color:{SLATE};">Carbón vegetal premium de rendimiento superior</td>
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
