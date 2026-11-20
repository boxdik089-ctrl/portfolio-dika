import os
import math
import random
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

print("=== Building Clean Anime-Style Lanyard Cards from Code ===")

# --- FONTS SETUP ---
def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

FONT_BLACK_36 = get_font(r'C:\Windows\Fonts\ariblk.ttf', 36)
FONT_BLACK_32 = get_font(r'C:\Windows\Fonts\ariblk.ttf', 32)
FONT_BLACK_28 = get_font(r'C:\Windows\Fonts\ariblk.ttf', 28)
FONT_BLACK_24 = get_font(r'C:\Windows\Fonts\ariblk.ttf', 24)
FONT_BLACK_20 = get_font(r'C:\Windows\Fonts\ariblk.ttf', 20)
FONT_BLACK_16 = get_font(r'C:\Windows\Fonts\ariblk.ttf', 16)

FONT_BOLD_24  = get_font(r'C:\Windows\Fonts\arialbd.ttf', 24)
FONT_BOLD_20  = get_font(r'C:\Windows\Fonts\arialbd.ttf', 20)
FONT_BOLD_16  = get_font(r'C:\Windows\Fonts\arialbd.ttf', 16)
FONT_BOLD_14  = get_font(r'C:\Windows\Fonts\arialbd.ttf', 14)
FONT_BOLD_12  = get_font(r'C:\Windows\Fonts\arialbd.ttf', 12)

FONT_MONO_20  = get_font(r'C:\Windows\Fonts\consolab.ttf', 20)
FONT_MONO_16  = get_font(r'C:\Windows\Fonts\consolab.ttf', 16)
FONT_MONO_14  = get_font(r'C:\Windows\Fonts\consolab.ttf', 14)
FONT_MONO_12  = get_font(r'C:\Windows\Fonts\consolab.ttf', 12)
FONT_MONO_10  = get_font(r'C:\Windows\Fonts\consolab.ttf', 10)

# Japanese font fallback (MS Gothic / Meiryo / Yu Gothic)
FONT_JP_16 = get_font(r'C:\Windows\Fonts\msgothic.ttc', 16)
FONT_JP_14 = get_font(r'C:\Windows\Fonts\msgothic.ttc', 14)
FONT_JP_12 = get_font(r'C:\Windows\Fonts\msgothic.ttc', 12)

# COLOR PALETTE (Obsidian, Architectural Cream, Amber Gold, Cyber Cyan)
C_OBSIDIAN = (13, 21, 39, 255)
C_OBSIDIAN_SOFT = (22, 34, 58, 255)
C_CREAM = (245, 239, 225, 255)
C_CREAM_LIGHT = (252, 248, 238, 255)
C_GOLD = (229, 169, 60, 255)
C_CYAN = (56, 189, 248, 255)
C_GREEN = (34, 197, 94, 255)
C_MUTED = (100, 116, 139, 255)
C_BORDER = (18, 24, 38, 180)


# =====================================================================
# HELPER: DRAW HAZARD STRIPES
# =====================================================================
def draw_hazard_stripes(draw, x_start, y_start, width, height, stripe_w=18, color1=C_CREAM, color2=C_OBSIDIAN):
    draw.rectangle([x_start, y_start, x_start + width, y_start + height], fill=color1)
    total = width + height + 200
    for offset in range(-height - 100, total, stripe_w * 2):
        poly = [
            (x_start + offset, y_start),
            (x_start + offset + stripe_w, y_start),
            (x_start + offset + stripe_w - height, y_start + height),
            (x_start + offset - height, y_start + height)
        ]
        # Clip to bounding box
        draw.polygon(poly, fill=color2)
    # Right border line
    draw.line([(x_start, y_start), (x_start, y_start + height)], fill=C_OBSIDIAN, width=3)


# =====================================================================
# HELPER: DRAW CYBER QR / DATA MATRIX
# =====================================================================
def draw_cyber_qr(draw, x, y, size):
    # Outer box
    draw.rectangle([x, y, x + size, y + size], fill=C_CREAM_LIGHT, outline=C_OBSIDIAN, width=2)
    
    # 3 Corner Finder Patterns
    def draw_finder(fx, fy, f_size=36):
        draw.rectangle([fx, fy, fx + f_size, fy + f_size], fill=C_OBSIDIAN)
        draw.rectangle([fx + 5, fy + 5, fx + f_size - 5, fy + f_size - 5], fill=C_CREAM_LIGHT)
        draw.rectangle([fx + 10, fy + 10, fx + f_size - 10, fy + f_size - 10], fill=C_OBSIDIAN)
        
    pad = 8
    f_size = int(size * 0.28)
    draw_finder(x + pad, y + pad, f_size)
    draw_finder(x + size - pad - f_size, y + pad, f_size)
    draw_finder(x + pad, y + size - pad - f_size, f_size)
    
    # Grid of pseudorandom data bits
    rng = random.Random(20261101)
    grid_n = 19
    cell_w = (size - pad * 2) / grid_n
    for r in range(grid_n):
        for c in range(grid_n):
            # Don't draw over finder patterns
            if (r < 7 and c < 7) or (r < 7 and c > grid_n - 8) or (r > grid_n - 8 and c < 7):
                continue
            if rng.random() > 0.52:
                cx = x + pad + c * cell_w
                cy = y + pad + r * cell_w
                draw.rectangle([cx, cy, cx + cell_w - 1, cy + cell_w - 1], fill=C_OBSIDIAN)


# =====================================================================
# HELPER: DRAW VECTOR BARCODE
# =====================================================================
def draw_barcode(draw, x, y, width, height, seed=42):
    rng = random.Random(seed)
    cur_x = x
    while cur_x < x + width:
        bar_w = rng.choice([2, 3, 5, 7, 9, 11])
        gap_w = rng.choice([2, 3, 4, 6])
        if cur_x + bar_w > x + width:
            bar_w = x + width - cur_x
        draw.rectangle([cur_x, y, cur_x + bar_w, y + height], fill=C_OBSIDIAN)
        cur_x += bar_w + gap_w


# =====================================================================
# 1. GENERATE BACK CARD (1024 x 1536)
# =====================================================================
print("Rendering Back Card (1024 x 1536)...")
W_BC, H_BC = 1024, 1536
bc = Image.new('RGBA', (W_BC, H_BC), C_CREAM)
draw_bc = ImageDraw.Draw(bc)

# 1.1 Architectural paper gradient (warm ivory)
for y in range(H_BC):
    r = y / H_BC
    cr = int(246 * (1 - r) + 235 * r)
    cg = int(240 * (1 - r) + 228 * r)
    cb = int(226 * (1 - r) + 212 * r)
    draw_bc.line([(0, y), (W_BC, y)], fill=(cr, cg, cb, 255))

# 1.2 Fine blueprint millimeter grid
for gx in range(0, W_BC, 24):
    c = (30, 50, 90, 26) if gx % 96 == 0 else (30, 50, 90, 12)
    draw_bc.line([(gx, 0), (gx, H_BC)], fill=c, width=1)
for gy in range(0, H_BC, 24):
    c = (30, 50, 90, 26) if gy % 96 == 0 else (30, 50, 90, 12)
    draw_bc.line([(0, gy), (W_BC, gy)], fill=c, width=1)

# 1.3 Left edge technical ruler (x = 0..85)
draw_bc.rectangle([0, 0, 85, H_BC], fill=(238, 231, 216, 180))
draw_bc.line([(85, 0), (85, H_BC)], fill=C_OBSIDIAN, width=2)
for ry in range(0, H_BC, 16):
    is_major = (ry % 64 == 0)
    rw = 16 if is_major else 8
    draw_bc.line([(85 - rw, ry), (85, ry)], fill=C_OBSIDIAN, width=2 if is_major else 1)
    if is_major and ry > 40 and ry < H_BC - 60:
        draw_bc.text((12, ry - 7), f'{ry:04d}', fill=C_MUTED, font=FONT_MONO_10)

# Vertical label on left ruler
label_left = "SYSTEM CLEARANCE // ARCHITECTURE ID // 2026.11"
# Draw rotated vertical text on left
txt_img = Image.new('RGBA', (600, 30), (0, 0, 0, 0))
txt_draw = ImageDraw.Draw(txt_img)
txt_draw.text((0, 5), label_left, fill=C_OBSIDIAN, font=FONT_MONO_12)
txt_rot = txt_img.rotate(90, expand=True)
bc.paste(txt_rot, (42, 450), txt_rot)

# 1.4 Right Hazard Stripes (x = 888..1024)
draw_hazard_stripes(draw_bc, 888, 0, W_BC - 888, H_BC, stripe_w=22)

# 1.5 Top Lanyard Cutout Slot (x = 180..320, y = 50..82)
slot_x0, slot_y0, slot_w, slot_h = 170, 52, 140, 28
draw_bc.rounded_rectangle([slot_x0 - 4, slot_y0 - 4, slot_x0 + slot_w + 4, slot_y0 + slot_h + 4], radius=16, fill=(160, 174, 192, 220))
draw_bc.rounded_rectangle([slot_x0, slot_y0, slot_x0 + slot_w, slot_y0 + slot_h], radius=12, fill=(12, 16, 26, 255))
draw_bc.text((slot_x0 + 18, slot_y0 + 7), "LANYARD ATTACH", fill=(148, 163, 184, 255), font=FONT_MONO_10)

# 1.6 School Header (x = 360..860, y = 45..225)
logo = Image.open('public/assets/smkn1-beringin-logo.png').convert('RGBA')
lw = 135
lh = int(logo.height * (lw / logo.width))
logo_scaled = logo.resize((lw, lh), Image.Resampling.LANCZOS)
bc.paste(logo_scaled, (365, 50), logo_scaled)

draw_bc.text((518, 52), "SMK", fill=C_OBSIDIAN, font=FONT_BLACK_36)
draw_bc.text((518, 94), "NEGERI 1", fill=C_OBSIDIAN, font=FONT_BLACK_36)
draw_bc.text((518, 136), "BERINGIN", fill=C_OBSIDIAN, font=FONT_BLACK_36)

# Sub-header badge
draw_bc.rectangle([518, 186, 855, 210], fill=C_OBSIDIAN)
draw_bc.text((526, 188), "TIK • REKAYASA PERANGKAT LUNAK", fill=C_GOLD, font=FONT_MONO_12)
draw_bc.text((526, 214), "DELI SERDANG • SUMATERA UTARA", fill=C_MUTED, font=FONT_MONO_10)

# Horizontal tech divider line with crosshairs
draw_bc.line([(95, 245), (875, 245)], fill=C_OBSIDIAN, width=2)
draw_bc.line([(95, 249), (875, 249)], fill=C_OBSIDIAN, width=1)
draw_bc.rectangle([95, 243, 105, 251], fill=C_OBSIDIAN)
draw_bc.rectangle([865, 243, 875, 251], fill=C_OBSIDIAN)


# 1.7 SECTION 1: DEVELOPER CREDENTIAL IDENTIFICATION (y = 265..485)
card_x0, card_x1 = 110, 865
draw_bc.rounded_rectangle([card_x0, 265, card_x1, 485], radius=6, fill=C_OBSIDIAN)

# Header tab on dark box
draw_bc.rounded_rectangle([card_x0, 265, card_x1, 305], radius=6, fill=C_OBSIDIAN_SOFT)
draw_bc.rectangle([card_x0, 290, card_x1, 305], fill=C_OBSIDIAN_SOFT) # square bottom corners
draw_bc.text((card_x0 + 16, 276), "ACCREDITED DEVELOPER CREDENTIAL // 認証カード", fill=C_CYAN, font=FONT_BOLD_14)
draw_bc.text((card_x1 - 180, 276), "SEC-LEVEL: 01 // PRO", fill=C_GOLD, font=FONT_MONO_12)

# Data Rows
rows = [
    ("NAME / 氏名", "DIKA ARMADANA", "(ディカ・アルマダナ)", C_CREAM_LIGHT),
    ("ROLE / 役職", "FULL STACK ENGINEER & CREATIVE WEB ARCHITECT", "", C_GOLD),
    ("INSTITUTE", "SMK NEGERI 1 BERINGIN (TIK / RPL)", "", C_CREAM_LIGHT),
    ("PORTFOLIO", "https://github.com/boxdik089-ctrl", "", C_CYAN),
]

for idx, (lbl, val, jp, col) in enumerate(rows):
    ry = 320 + idx * 38
    draw_bc.text((card_x0 + 16, ry), lbl, fill=C_MUTED, font=FONT_MONO_12)
    draw_bc.text((card_x0 + 140, ry - 3), val, fill=col, font=FONT_BOLD_16)
    if jp:
        draw_bc.text((card_x0 + 310, ry - 1), jp, fill=C_MUTED, font=FONT_JP_12)

# Status Badge in bottom right of card
draw_bc.rectangle([card_x1 - 170, 435, card_x1 - 16, 465], fill=(22, 101, 52, 255), outline=C_GREEN, width=1)
draw_bc.ellipse([card_x1 - 160, 447, card_x1 - 150, 457], fill=C_GREEN)
draw_bc.text((card_x1 - 142, 442), "VERIFIED ACTIVE", fill=C_CREAM_LIGHT, font=FONT_MONO_12)


# 1.8 SECTION 2: CYBER DATA MATRIX & SYSTEM SPECIFICATIONS (y = 505..890)
# Left: Cyber QR / Matrix
draw_cyber_qr(draw_bc, 110, 505, 230)

# Right: Technical Telemetry Specifications
spec_x = 365
draw_bc.rounded_rectangle([spec_x, 505, card_x1, 745], radius=6, fill=C_CREAM_LIGHT, outline=C_OBSIDIAN, width=2)
# Spec header
draw_bc.rectangle([spec_x, 505, card_x1, 540], fill=C_OBSIDIAN)
draw_bc.text((spec_x + 14, 514), "SYSTEM ARCHITECTURE METRICS // 性能仕様", fill=C_GOLD, font=FONT_BOLD_14)

specs = [
    ("CORE RUNTIME", "REACT 19 • TYPESCRIPT 5.8 • VITE"),
    ("MOTION / 3D", "THREE.JS • R3F • GSAP SCROLLTRIGGER"),
    ("SMOOTH SCROLL", "LENIS HIGH-PERFORMANCE VIRTUAL SCROLL"),
    ("COMPILER", "GPU ACCELERATED CSS & WEBGL SHADERS"),
    ("AFFILIATION", "SMK NEGERI 1 BERINGIN (SUMUT)"),
    ("ENVIRONMENT", "PRODUCTION GRADE // OPTIMIZED"),
]

for idx, (k, v) in enumerate(specs):
    sy = 552 + idx * 31
    draw_bc.text((spec_x + 14, sy), f"[{k}]", fill=C_MUTED, font=FONT_MONO_10)
    draw_bc.text((spec_x + 130, sy - 2), v, fill=C_OBSIDIAN, font=FONT_MONO_12)

# Japanese aesthetic banner under QR
draw_bc.rectangle([110, 755, card_x1, 795], fill=C_OBSIDIAN)
draw_bc.text((125, 765), "クリエイティブ・ウェブ・エンジニアリング // 次世代アーキテクチャ", fill=C_CYAN, font=FONT_JP_14)
draw_bc.text((card_x1 - 220, 767), "AUTHENTICATED HARDWARE", fill=C_GOLD, font=FONT_MONO_10)

# Skill telemetry bars (y = 810..890)
skills = [
    ("3D WEB & INTERACTIVE", 0.95),
    ("FRONTEND ARCHITECTURE", 0.98),
    ("FULL STACK BACKEND", 0.92),
    ("PERFORMANCE OPTIMIZATION", 0.96),
]

for idx, (sname, val) in enumerate(skills):
    col_idx = idx % 2
    row_idx = idx // 2
    bx = 110 + col_idx * 385
    by = 810 + row_idx * 40
    bw = 365
    draw_bc.text((bx, by), sname, fill=C_OBSIDIAN, font=FONT_MONO_10)
    draw_bc.text((bx + bw - 38, by), f"{int(val*100)}%", fill=C_GOLD, font=FONT_MONO_10)
    # Background bar
    draw_bc.rectangle([bx, by + 16, bx + bw, by + 26], fill=(215, 205, 185, 255), outline=C_OBSIDIAN, width=1)
    # Fill bar
    draw_bc.rectangle([bx, by + 16, bx + int(bw * val), by + 26], fill=C_OBSIDIAN)


# 1.9 SECTION 3: TECHNICAL BLUEPRINT SCHEMATIC (y = 910..1240)
draw_bc.rounded_rectangle([110, 910, card_x1, 1240], radius=6, fill=C_OBSIDIAN)

# Crosshair grid within dark box
draw_bc.rectangle([110, 910, card_x1, 945], fill=C_OBSIDIAN_SOFT)
draw_bc.text((126, 920), "TELEMETRY & CREDENTIAL MATRIX // 開発者認証情報", fill=C_CYAN, font=FONT_BOLD_14)
draw_bc.text((card_x1 - 160, 922), "BUILD: 2026.11.REV1", fill=C_MUTED, font=FONT_MONO_10)

# Circular radar schematic (x = 150..370, y = 970..1190)
rcx, rcy, rad = 250, 1085, 95
draw_bc.ellipse([rcx - rad, rcy - rad, rcx + rad, rcy + rad], outline=(56, 189, 248, 120), width=1)
draw_bc.ellipse([rcx - rad//2, rcy - rad//2, rcx + rad//2, rcy + rad//2], outline=(56, 189, 248, 80), width=1)
draw_bc.line([(rcx - rad - 15, rcy), (rcx + rad + 15, rcy)], fill=(56, 189, 248, 140), width=1)
draw_bc.line([(rcx, rcy - rad - 15), (rcx, rcy + rad + 15)], fill=(56, 189, 248, 140), width=1)
draw_bc.text((rcx - 22, rcy - 6), "CORE", fill=C_GOLD, font=FONT_MONO_12)

# Technical notes next to radar
draw_bc.text((385, 965), "PRIMARY DIRECTIVE:", fill=C_GOLD, font=FONT_MONO_12)
notes = [
    "• Delivering award-winning interactive 3D web experiences.",
    "• Strict adherence to zero-lag 60fps rendering guidelines.",
    "• Native smooth scrolling synchronized with GSAP timelines.",
    "• Designed & engineered by Dika Armadana (SMKN 1 Beringin).",
    "• Verified digital credentials recorded for production deployment."
]
for n_idx, note in enumerate(notes):
    draw_bc.text((385, 995 + n_idx * 26), note, fill=C_CREAM, font=FONT_MONO_12)

draw_bc.text((385, 1145), "HASH: SHA256: 7e4d27e2-c182-400b-b26e-9eff53fcd702", fill=C_CYAN, font=FONT_MONO_10)
draw_bc.text((385, 1170), "DIGITAL SIGNATURE: DIKA_ARMADANA // SMKN_1_BERINGIN_TIK", fill=C_GOLD, font=FONT_MONO_10)


# 1.10 BOTTOM BARCODE & FOOTER (y = 1260..1500)
# Barcode container
draw_bc.rectangle([110, 1265, card_x1, 1410], fill=C_CREAM_LIGHT, outline=C_OBSIDIAN, width=2)
draw_barcode(draw_bc, 140, 1280, card_x1 - 170, 75, seed=2026)
draw_bc.text((220, 1370), "* ID-2026-DIKA-ARMADANA // SMK-NEGERI-1-BERINGIN // VERIFIED *", fill=C_OBSIDIAN, font=FONT_MONO_14)

# Footer legal / credit text
draw_bc.text((115, 1435), "AUTHORIZATION: CERTIFIED PORTFOLIO BADGE", fill=C_OBSIDIAN, font=FONT_BOLD_12)
draw_bc.text((115, 1455), "ALL RIGHTS RESERVED © 2026 DIKA ARMADANA • BOXDIK089@GMAIL.COM", fill=C_MUTED, font=FONT_MONO_10)
draw_bc.text((115, 1475), "SMK NEGERI 1 BERINGIN • KABUPATEN DELI SERDANG • PROVINSI SUMATERA UTARA", fill=C_MUTED, font=FONT_MONO_10)


# Save Back Card
bc_rgb = bc.convert('RGB')
bc_rgb.save('public/lanyard/backCard.png', quality=95)
bc_rgb.save('public/lanyard/backCard-mobile.webp', 'WEBP', quality=90)
print("Back Card generated successfully: public/lanyard/backCard.png and backCard-mobile.webp")



# =====================================================================
# 2. GENERATE FRONT CARD (832 x 1285)
# =====================================================================
print("Rendering Front Card (832 x 1285)...")
W_FC, H_FC = 832, 1285

# Base: We load the anime ocean sunset base (card_base_zero_person.png)
fc_base = Image.open('public/assets/card_base_zero_person.png').convert('RGBA')

# 2.1 Overlay Dika Cutout with realistic contact shadow
dika_raw = Image.open('public/assets/dika_cutout.png')
dika_tight = dika_raw.crop((46, 10, 508, 1023))
scale = 1.06
dw = int(dika_tight.width * scale)
dh = int(dika_tight.height * scale)
dika = dika_tight.resize((dw, dh), Image.Resampling.LANCZOS)

px = 416 - dw // 2 - 8 # 163
py = 225

# Contact drop shadow
dika_alpha = dika.split()[3]
shadow_mask = dika_alpha.filter(ImageFilter.GaussianBlur(12))
shadow_img = Image.new('RGBA', (dw, dh), (0, 0, 0, 85))
shadow_img.putalpha(shadow_mask)

fc_base.paste(shadow_img, (px + 6, py + 8), shadow_img)
fc_base.paste(dika, (px, py), dika)

# 2.2 Restore Chrome Ring Overlay
if os.path.exists('public/assets/ring_left.png'):
    ring_img = Image.open('public/assets/ring_left.png')
    # If RGB, make black/transparent alpha
    if ring_img.mode != 'RGBA':
        ring_arr = np.array(ring_img)
        gray = ring_arr.mean(axis=-1)
        alpha = np.clip((gray - 30) * 3, 0, 255).astype(np.uint8)
        ring_rgba = Image.fromarray(np.dstack([ring_arr, alpha]))
        fc_base.paste(ring_rgba, (120, 730), ring_rgba)
    else:
        fc_base.paste(ring_img, (120, 730), ring_img)

# 2.3 DIKA ARMADANA Name Tag Plate (Rotated -2.2°)
tag_w, tag_h = 350, 62
tag_img = Image.new('RGBA', (tag_w + 30, tag_h + 30), (0, 0, 0, 0))
tag_draw = ImageDraw.Draw(tag_img)
# Soft drop shadow
tag_draw.rectangle([6, 6, tag_w + 6, tag_h + 6], fill=(0, 0, 0, 120))
# Cream badge plate
tag_draw.rectangle([0, 0, tag_w, tag_h], fill=(236, 232, 212, 255))
tag_draw.rectangle([0, 0, tag_w, tag_h], outline=C_OBSIDIAN, width=2)
tag_draw.rectangle([3, 3, tag_w - 3, tag_h - 3], outline=(18, 24, 38, 80), width=1)

# Name Text
text_name = "DIKA ARMADANA"
bbox = tag_draw.textbbox((0, 0), text_name, font=FONT_BLACK_32)
tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
tag_draw.text(((tag_w - tw) // 2, 8), text_name, fill=C_OBSIDIAN, font=FONT_BLACK_32)
tag_draw.text(((tag_w - 180) // 2, 42), "// CREATIVE WEB ARCHITECT", fill=C_MUTED, font=FONT_MONO_10)

# Rotate and paste
tag_rot = tag_img.rotate(-2.2, resample=Image.Resampling.BICUBIC, expand=True)
fc_base.paste(tag_rot, (188, 860), tag_rot)

# 2.4 Top-Right SMKN 1 Beringin Badge Slot (x = 555..795, y = 88..155)
fc_draw = ImageDraw.Draw(fc_base)
badge_x0, badge_y0, badge_x1, badge_y1 = 555, 88, 795, 155
# Outer drop shadow
fc_draw.rectangle([badge_x0 + 3, badge_y0 + 3, badge_x1 + 3, badge_y1 + 3], fill=(0, 0, 0, 90))
# Cream rounded plate
fc_draw.rectangle([badge_x0, badge_y0, badge_x1, badge_y1], fill=(238, 233, 218, 255))
fc_draw.rectangle([badge_x0, badge_y0, badge_x1, badge_y1], outline=C_OBSIDIAN, width=2)

# Small transparent logo
lw_fc = 48
lh_fc = int(logo.height * (lw_fc / logo.width))
logo_fc = logo.resize((lw_fc, lh_fc), Image.Resampling.LANCZOS)
fc_base.paste(logo_fc, (badge_x0 + 8, badge_y0 + 8), logo_fc)

# Typography
fc_draw.text((badge_x0 + 64, badge_y0 + 12), "SMKN 1", fill=C_OBSIDIAN, font=FONT_BLACK_20)
fc_draw.text((badge_x0 + 64, badge_y0 + 34), "BERINGIN", fill=C_OBSIDIAN, font=FONT_BLACK_20)

# 2.5 Anime HUD telemetry markings
fc_draw.text((45, 1245), "[SYS.ONLINE // 60FPS]", fill=(255, 255, 255, 200), font=FONT_MONO_12)
fc_draw.text((580, 1245), "LOC: 03°34'N // 98°52'E", fill=(255, 255, 255, 200), font=FONT_MONO_12)

# Save Front Card
fc_rgb = fc_base.convert('RGB')
fc_rgb.save('public/lanyard/frontCard.png', quality=95)
fc_rgb.save('public/lanyard/frontCard-mobile.webp', 'WEBP', quality=90)
print("Front Card generated successfully: public/lanyard/frontCard.png and frontCard-mobile.webp")

print("=== ALL CLEAN ANIME-STYLE CARDS GENERATED SUCCESSFULLY ===")
