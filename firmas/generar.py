"""Genera las firmas de correo de Piroliswiss (una página HTML por persona).

Uso:  python firmas/generar.py
Abrir el .html en el navegador, seleccionar todo (Ctrl+A), copiar y pegar en la
configuración de firma de Gmail / Outlook / Hostinger Webmail.
Las imágenes se cargan desde https://piroliswiss.com/email/ (carpeta public/email).

Diseño: tarjeta con panel oliva (foto + marca) y panel claro (datos + botón),
y una franja inferior con los tres productos. Solo tablas y estilos en línea,
que es lo que respetan Gmail y Outlook.
"""
from pathlib import Path

SITE = "https://piroliswiss.com"
IMG = f"{SITE}/email"
FONT = "Arial, Helvetica, sans-serif"
INK, SLATE, RULE = "#15181A", "#586166", "#DCDFDB"
RED, LEAF_LIGHT = "#D40000", "#A6C94A"
OLIVE, OLIVE_FG, OLIVE_MUTE = "#22300B", "#EEF2E4", "#A9B98A"
PAPER, TILE = "#F4F5F2", "#F7F7F7"

PEOPLE = [
    ("frederico-zwald", "Frederico Zwald", "Fundador y CEO", "fredericozwald@piroliswiss.com"),
    ("christian-vargas", "Christian Vargas", "Cofundador y CFO", "christianvargas@piroliswiss.com"),
    ("alex-motogna", "Alex Motogna", "Cofundador y CTO", "alexdanielmotogna@piroliswiss.com"),
]
PRODUCTS = [("prod-carbon", "Carbón vegetal"), ("prod-acido", "Ácido piroleñoso"), ("prod-briquetas", "Briquetas de carbón")]


def contact(label: str, value: str) -> str:
    return (
        f'<tr><td style="padding:0 8px 6px 0;vertical-align:top;">'
        f'<div style="width:6px;height:6px;margin-top:5px;background:{RED};font-size:0;line-height:0;">&nbsp;</div></td>'
        f'<td style="padding:0 12px 6px 0;vertical-align:top;font:700 10px/16px {FONT};letter-spacing:1.2px;'
        f'text-transform:uppercase;color:{SLATE};white-space:nowrap;">{label}</td>'
        f'<td style="padding:0 0 6px;vertical-align:top;font:13px/16px {FONT};color:{INK};">{value}</td></tr>'
    )


def signature(slug: str, name: str, role: str, email: str) -> str:
    link = f"color:{INK};text-decoration:none;"
    products = "".join(
        f'<td style="padding:0 14px 0 0;vertical-align:middle;">'
        f'<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr>'
        f'<td style="padding:0 7px 0 0;vertical-align:middle;"><img src="{IMG}/{img}.jpg" width="30" height="30" alt="" '
        f'style="display:block;width:30px;height:30px;border:0;border-radius:6px;background:{TILE};"></td>'
        f'<td style="vertical-align:middle;font:600 11px/13px {FONT};color:{INK};white-space:nowrap;">{label}</td>'
        f"</tr></table></td>"
        for img, label in PRODUCTS
    )
    return f"""<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="580" style="width:580px;max-width:100%;border-collapse:separate;border-spacing:0;font-family:{FONT};border:1px solid {RULE};border-radius:12px;overflow:hidden;">
  <tr>
    <td width="168" bgcolor="{OLIVE}" style="width:168px;background:{OLIVE};padding:22px 20px;vertical-align:top;border-radius:12px 0 0 0;">
      <img src="{IMG}/team/{slug}.jpg" width="96" height="96" alt="{name}" style="display:block;width:96px;height:96px;border:2px solid {OLIVE_FG};border-radius:10px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:22px;border-collapse:collapse;"><tr>
        <td style="padding:0 8px 0 0;vertical-align:middle;"><img src="{IMG}/mark-white.png" width="24" height="25" alt="" style="display:block;border:0;"></td>
        <td style="vertical-align:middle;font:700 11px/1 {FONT};letter-spacing:2.6px;color:{OLIVE_FG};white-space:nowrap;">PIROLI<span style="color:{LEAF_LIGHT};">SWISS</span></td>
        <td style="padding:0 0 0 5px;vertical-align:middle;"><img src="{IMG}/flag.png" width="10" height="10" alt="" style="display:block;border:0;"></td>
      </tr></table>
      <div style="margin-top:10px;font:11px/15px {FONT};color:{OLIVE_MUTE};">Santa Cruz de la Sierra<br>Bolivia</div>
    </td>
    <td bgcolor="#FFFFFF" style="background:#FFFFFF;padding:22px 24px 20px;vertical-align:top;">
      <div style="font:700 21px/24px {FONT};color:{INK};letter-spacing:-0.3px;">{name}</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 14px;border-collapse:collapse;"><tr>
        <td style="padding:0 8px 0 0;vertical-align:middle;"><div style="width:22px;height:2px;background:{RED};font-size:0;line-height:0;">&nbsp;</div></td>
        <td style="vertical-align:middle;font:700 11px/1 {FONT};letter-spacing:1.6px;text-transform:uppercase;color:{RED};">{role}</td>
      </tr></table>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        {contact("Correo", f'<a href="mailto:{email}" style="{link}">{email}</a>')}
        {contact("Web", f'<a href="{SITE}" style="{link}">piroliswiss.com</a>')}
        {contact("Oficina", "Calle Clara 2885, Santa Cruz de la Sierra")}
      </table>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:12px;border-collapse:separate;"><tr>
        <td bgcolor="{RED}" style="background:{RED};border-radius:6px;">
          <a href="{SITE}/contacto/" style="display:inline-block;padding:9px 16px;font:700 12px/1 {FONT};color:#FFFFFF;text-decoration:none;letter-spacing:.3px;">Solicitar cotización</a>
        </td>
      </tr></table>
    </td>
  </tr>
  <tr>
    <td colspan="2" bgcolor="{PAPER}" style="background:{PAPER};padding:12px 20px;border-top:3px solid {RED};border-radius:0 0 12px 12px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr>
        {products}
        <td style="vertical-align:middle;font:11px/13px {FONT};color:{SLATE};">
          <a href="{SITE}/productos/" style="color:{SLATE};text-decoration:underline;">Ver productos</a>
        </td>
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
