import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

print("=== Generating Pixel-Perfect Front Card with Larger Half-Body Portrait ===")

W = 832
H = 1285
SCALE_X = W / 314.0  # ~2.6497
SCALE_Y = H / 469.0  # ~2.740

def sx(val):
    return int(round(val * SCALE_X))

def sy(val):
    return int(round(val * SCALE_Y))

# Colors
C_NAVY = (20, 30, 54, 255)
C_CREAM = (232, 228, 216, 255)
C_CREAM_LIGHT = (242, 239, 230, 255)
C_GRAY_NODE = (156, 163, 175, 255)

# Fonts
font_anton_title = ImageFont.truetype('fonts/Anton_400.ttf', sx(65))
font_anton_junior = ImageFont.truetype('fonts/Anton_400.ttf', sx(16))
font_anton_vert = ImageFont.truetype('fonts/Anton_400.ttf', sx(36))
font_anton_footer = ImageFont.truetype('fonts/Anton_400.ttf', sx(40))
font_pjs_name = ImageFont.truetype('fonts/Plus_Jakarta_Sans_800.ttf', sx(13))
font_pjs_school = ImageFont.truetype('fonts/Plus_Jakarta_Sans_800.ttf', int(sx(7.5)))

# 1. Base Canvas
img = Image.new('RGBA', (W, H), C_CREAM)

# 2. Spirograph Ellipses
spiro = Image.new('RGBA', (W, H), (0, 0, 0, 0))
s_draw = ImageDraw.Draw(spiro)
cx, cy = sx(157), sy(235)
rx, ry = sx(185), sy(120)

angles = [-24, -12, 0, 12, 24]
for ang in angles:
    rad = math.radians(ang)
    cos_a, sin_a = math.cos(rad), math.sin(rad)
    pts = []
    for t in range(0, 360, 2):
        t_rad = math.radians(t)
        ex = rx * math.cos(t_rad)
        ey = ry * math.sin(t_rad)
        rot_x = cx + ex * cos_a - ey * sin_a
        rot_y = cy + ex * sin_a + ey * cos_a
        pts.append((rot_x, rot_y))
    s_draw.line(pts + [pts[0]], fill=(20, 30, 54, 18), width=2)

# Central circle
cr = sx(145)
s_draw.ellipse([cx - cr, cy - cr, cx + cr, cy + cr], outline=(20, 30, 54, 16), width=2)
img.paste(spiro, (0, 0), spiro)

# 3. Top-right grid (width=125, height=58)
grid_w, grid_h = sx(125), sy(58)
grid_x0 = W - grid_w
grid_y0 = 0
grid_img = Image.new('RGBA', (W, H), (0, 0, 0, 0))
g_draw = ImageDraw.Draw(grid_img)

step_x = sx(15)
step_y = sy(14)
for x in range(grid_x0, W, max(1, step_x)):
    g_draw.line([(x, grid_y0), (x, grid_y0 + grid_h)], fill=(20, 30, 54, 46), width=1)
for y in range(grid_y0, grid_y0 + grid_h, max(1, step_y)):
    g_draw.line([(grid_x0, y), (W, y)], fill=(20, 30, 54, 46), width=1)
img.paste(grid_img, (0, 0), grid_img)

# 4. Blueprint SVG Lines
bp = Image.new('RGBA', (W, H), (0, 0, 0, 0))
bp_draw = ImageDraw.Draw(bp)

hx0, hy0 = sx(16), sy(42)
hx1, hy1 = sx(296), sy(114)
bp_draw.rectangle([hx0, hy0, hx1, hy1], outline=C_NAVY, width=2)

def draw_node(draw, x, y, r=9, fill=C_NAVY):
    draw.ellipse([x - r, y - r, x + r, y + r], fill=fill)

draw_node(bp_draw, hx0, hy0)
draw_node(bp_draw, hx0, hy1)
draw_node(bp_draw, hx1, hy1)
draw_node(bp_draw, hx1, sy(130))

# Right and bottom lines
bp_draw.line([(sx(252), sy(130)), (sx(296), sy(130))], fill=C_NAVY, width=2)
bp_draw.line([(sx(296), sy(130)), (sx(296), sy(385))], fill=C_NAVY, width=2)
bp_draw.line([(sx(220), sy(385)), (sx(296), sy(385))], fill=C_NAVY, width=2)

# Middle right dashed lines and nodes
dash_step = sx(10)
for x in range(sx(195), sx(245), dash_step):
    bp_draw.line([(x, sy(142)), (min(x + sx(6), sx(245)), sy(142))], fill=C_NAVY, width=2)
draw_node(bp_draw, sx(230), sy(142))

for x in range(sx(185), sx(245), dash_step):
    bp_draw.line([(x, sy(178)), (min(x + sx(6), sx(245)), sy(178))], fill=C_NAVY, width=2)
draw_node(bp_draw, sx(212), sy(178))
draw_node(bp_draw, sx(230), sy(178))

img.paste(bp, (0, 0), bp)

# 5. Header: Badge JUNIOR
j_pad_x = sx(16)
j_pad_y = sy(2)
j_text = "JUNIOR"
j_box = font_anton_junior.getbbox(j_text)
j_w = (j_box[2] - j_box[0]) + j_pad_x * 2
j_h = (j_box[3] - j_box[1]) + j_pad_y * 2 + sy(4)
j_x = sx(28)
j_y = sy(14)

draw = ImageDraw.Draw(img)
draw.rectangle([j_x, j_y, j_x + j_w, j_y + j_h], fill=C_NAVY)
draw.text((j_x + j_pad_x, j_y + j_pad_y - sy(2)), j_text, fill=C_CREAM_LIGHT, font=font_anton_junior)

# 6. School Box: SMKN 1 BERINGIN (top: 31px, right: 16px)
sb_r = W - sx(16)
sb_y = sy(31)
logo_img = Image.open('public/logo-smkn1-beringin.png').convert('RGBA')
logo_size = sx(18)
logo_resized = logo_img.resize((logo_size, logo_size), Image.Resampling.LANCZOS)

school_text = "SMKN 1\nBERINGIN"
sb_box = draw.multiline_textbbox((0, 0), school_text, font=font_pjs_school, spacing=sy(1))
st_w = sb_box[2] - sb_box[0]
st_h = sb_box[3] - sb_box[1]

sb_pad_x = sx(7)
sb_pad_y = sy(3)
sb_gap = sx(5)
sb_total_w = sb_pad_x + logo_size + sb_gap + st_w + sb_pad_x
sb_total_h = max(logo_size, st_h) + sb_pad_y * 2
sb_x = sb_r - sb_total_w

draw.rectangle([sb_x, sb_y, sb_x + sb_total_w, sb_y + sb_total_h], fill=C_CREAM_LIGHT, outline=(20, 30, 54, 64), width=1)
img.paste(logo_resized, (sb_x + sb_pad_x, sb_y + (sb_total_h - logo_size) // 2), logo_resized)
draw.multiline_text((sb_x + sb_pad_x + logo_size + sb_gap, sb_y + sb_pad_y), school_text, fill=C_NAVY, font=font_pjs_school, spacing=sy(1))

# 7. DEVELOPER Title (top: 47px) - 100% CLEAR AND FULLY VISIBLE!
dev_text = "DEVELOPER"
dev_bbox = font_anton_title.getbbox(dev_text)
dev_w = dev_bbox[2] - dev_bbox[0]
dev_x = (W - dev_w) // 2
dev_y = sy(47)
dev_bottom = dev_y + (dev_bbox[3] - dev_bbox[1])
draw.text((dev_x, dev_y), dev_text, fill=C_NAVY, font=font_anton_title)

# 8. Left Chart Box (top: 130px, left: 24px, width: 132px, height: 245px)
cb_x = sx(24)
cb_y = sy(130)
cb_w = sx(132)
cb_h = sy(245)

chart_canvas = Image.new('RGBA', (cb_w, cb_h), C_NAVY)
c_draw = ImageDraw.Draw(chart_canvas)

cb_step = sx(22)
for x in range(0, cb_w, max(1, cb_step)):
    c_draw.line([(x, 0), (x, cb_h)], fill=(232, 228, 216, 51), width=1)
for y in range(0, cb_h, max(1, cb_step)):
    c_draw.line([(0, y), (cb_w, y)], fill=(232, 228, 216, 51), width=1)

c_draw.line([(sx(22), sy(88)), (sx(66), sy(22))], fill=C_GRAY_NODE, width=3)
chart_nodes = [(sx(22), sy(88)), (sx(44), sy(55)), (sx(66), sy(22)), (sx(44), sy(176)), (sx(66), sy(176))]
for nx, ny in chart_nodes:
    draw_node(c_draw, nx, ny, r=sx(5), fill=C_GRAY_NODE)

img.paste(chart_canvas, (cb_x, cb_y), chart_canvas)

# 9. Right Vertical Text: TEKNIK JARINGAN (top: 135px, right: 14px)
vert_text = "TEKNIK JARINGAN"
vt_bbox = font_anton_vert.getbbox(vert_text)
vt_w = vt_bbox[2] - vt_bbox[0] + sx(20)
vt_h = vt_bbox[3] - vt_bbox[1] + sy(20)

txt_img = Image.new('RGBA', (vt_w, vt_h), (0, 0, 0, 0))
t_draw = ImageDraw.Draw(txt_img)
t_draw.text((sx(10), sy(5)), vert_text, fill=C_NAVY, font=font_anton_vert)

txt_rotated = txt_img.rotate(90, expand=True, resample=Image.Resampling.BICUBIC)
rv_x = W - sx(14) - txt_rotated.width
rv_y = sy(135)
img.paste(txt_rotated, (rv_x, rv_y), txt_rotated)

# 10. Subject Photo (Dika Half-Body Cutout) - LARGER & HALF-BODY AS REQUESTED ("besarkan aja tapi setengah badan")
# Cropped from head to belt/waist so face & chest are larger and prominent
# Top positioned comfortably below DEVELOPER (gap ~18px)
dika_raw = Image.open('public/foto-dika.png').convert('RGBA')
dika_w = 544
dika_h = int(dika_raw.height * (dika_w / dika_raw.width))
dika_resized = dika_raw.resize((dika_w, dika_h), Image.Resampling.LANCZOS)

dika_top = dev_bottom + 18
dika_x = (W - dika_w) // 2

# Soft drop shadow
shadow = Image.new('RGBA', (dika_w + 40, dika_h + 40), (0, 0, 0, 0))
shadow_alpha = dika_resized.split()[3].point(lambda p: int(p * 0.22))
shadow.paste((0, 0, 0, 255), (20, 20), mask=shadow_alpha)
shadow = shadow.filter(ImageFilter.GaussianBlur(sx(8)))
img.paste(shadow, (dika_x - 20, dika_top - 20 + sy(6)), shadow)

# Paste Dika
img.paste(dika_resized, (dika_x, dika_top), dika_resized)

# 11. Name Strip: DIKA ARMADANA (positioned across lower torso)
name_text = "DIKA ARMADANA"
name_pad_x = sx(26)
name_pad_y = sy(6)
n_bbox = font_pjs_name.getbbox(name_text)
n_w = (n_bbox[2] - n_bbox[0]) + name_pad_x * 2
n_h = (n_bbox[3] - n_bbox[1]) + name_pad_y * 2 + sy(4)

name_strip = Image.new('RGBA', (n_w, n_h), C_CREAM_LIGHT)
ns_draw = ImageDraw.Draw(name_strip)
ns_draw.text((name_pad_x, name_pad_y), name_text, fill=(11, 13, 18, 255), font=font_pjs_name)

ns_shadow = Image.new('RGBA', (n_w + 30, n_h + 30), (0, 0, 0, 0))
nss_draw = ImageDraw.Draw(ns_shadow)
nss_draw.rectangle([15, 15, 15 + n_w, 15 + n_h], fill=(0, 0, 0, 46))
ns_shadow = ns_shadow.filter(ImageFilter.GaussianBlur(sx(4)))

ns_rot = name_strip.rotate(-1.5, expand=True, resample=Image.Resampling.BICUBIC)
nss_rot = ns_shadow.rotate(-1.5, expand=True, resample=Image.Resampling.BICUBIC)

# Placed across lower torso right above footer bar
ns_y = H - sy(94) - ns_rot.height
ns_x = int(W * 0.5 - ns_rot.width * 0.52)

img.paste(nss_rot, (ns_x - 15, ns_y - 15 + sy(3)), nss_rot)
img.paste(ns_rot, (ns_x, ns_y), ns_rot)

# 12. Footer Portfolio Bar: height: 76px, background: #141e36
f_h = sy(76)
f_y = H - f_h
f_draw = ImageDraw.Draw(img)
f_draw.rectangle([0, f_y, W, H], fill=C_NAVY)

footer_text = "PORTFOLIO"
f_pad_x = sx(20)
f_bbox = font_anton_footer.getbbox(footer_text)
f_text_y = f_y + (f_h - (f_bbox[3] - f_bbox[1])) // 2 - sy(4)
f_draw.text((f_pad_x, f_text_y), footer_text, fill=C_CREAM, font=font_anton_footer)

# 13. Save outputs
out_png = 'public/lanyard/frontCard.png'
out_webp = 'public/lanyard/frontCard-mobile.webp'

final_rgb = img.convert('RGB')
final_rgb.save(out_png, 'PNG', quality=98)
final_rgb.save(out_webp, 'WEBP', quality=95)
print(f"Generated successfully with larger half-body: {out_png} and {out_webp}")
