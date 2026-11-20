import os
import random
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1024, 1536

# Load Fonts
FONT_BLACK_XL = ImageFont.truetype(r'C:\Windows\Fonts\ariblk.ttf', 36)
FONT_BLACK_LG = ImageFont.truetype(r'C:\Windows\Fonts\ariblk.ttf', 28)
FONT_BLACK_MD = ImageFont.truetype(r'C:\Windows\Fonts\ariblk.ttf', 24)
FONT_BLACK_SM = ImageFont.truetype(r'C:\Windows\Fonts\ariblk.ttf', 20)

FONT_BOLD_XL  = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 30)
FONT_BOLD_LG  = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 22)
FONT_BOLD_MD  = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 17)
FONT_BOLD_SM  = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 14)
FONT_REG_MD   = ImageFont.truetype(r'C:\Windows\Fonts\arial.ttf', 16)

FONT_MONO_LG  = ImageFont.truetype(r'C:\Windows\Fonts\consolab.ttf', 18)
FONT_MONO_MD  = ImageFont.truetype(r'C:\Windows\Fonts\consolab.ttf', 15)
FONT_MONO_SM  = ImageFont.truetype(r'C:\Windows\Fonts\consolab.ttf', 12)
FONT_MONO_XS  = ImageFont.truetype(r'C:\Windows\Fonts\consolab.ttf', 10)

COLOR_OBSIDIAN = (16, 22, 34, 255)
COLOR_GOLD     = (229, 169, 60, 255)
COLOR_BLUE     = (37, 99, 235, 255)
COLOR_GREEN    = (16, 185, 129, 255)
COLOR_MUTED    = (100, 116, 139, 255)

def create_base_canvas():
    img = Image.new('RGBA', (W, H), (242, 238, 227, 255))
    draw = ImageDraw.Draw(img)
    
    # Subtle architectural ivory gradient
    for y in range(H):
        ratio = y / H
        r = int(246 * (1 - ratio) + 238 * ratio)
        g = int(242 * (1 - ratio) + 234 * ratio)
        b = int(232 * (1 - ratio) + 222 * ratio)
        draw.line([(0, y), (W, y)], fill=(r, g, b, 255))
        
    # Technical blueprint grid lines
    for x in range(0, W, 32):
        c = (25, 45, 80, 24) if x % 128 == 0 else (25, 45, 80, 12)
        draw.line([(x, 0), (x, H)], fill=c, width=1)
        
    for y in range(0, H, 32):
        c = (25, 45, 80, 24) if y % 128 == 0 else (25, 45, 80, 12)
        draw.line([(0, y), (W, y)], fill=c, width=1)
        
    # Precision technical outer borders
    draw.rectangle([28, 28, W - 28, H - 28], outline=(18, 24, 38, 200), width=2)
    draw.rectangle([34, 34, W - 34, H - 34], outline=(18, 24, 38, 70), width=1)
    
    # Corner crosshair tick marks
    def draw_crosshair(cx, cy):
        draw.line([(cx - 12, cy), (cx + 12, cy)], fill=(18, 24, 38, 220), width=2)
        draw.line([(cx, cy - 12), (cx, cy + 12)], fill=(18, 24, 38, 220), width=2)
    draw_crosshair(28, 28)
    draw_crosshair(W - 28, 28)
    draw_crosshair(28, H - 28)
    draw_crosshair(W - 28, H - 28)
    
    # Technical border markings along sides
    draw.text((45, 1492), '[SEC-ID // ARCHITECTURAL DEV CREDENTIAL]', fill=COLOR_MUTED, font=FONT_MONO_XS)
    draw.text((680, 1492), '[SYS-VER: 2026.11 // SMKN 1 BERINGIN]', fill=COLOR_MUTED, font=FONT_MONO_XS)
    
    # Top lanyard slot cutout
    slot_w, slot_h = 130, 26
    sx = (W - slot_w) // 2
    sy = 48
    draw.rounded_rectangle([sx - 4, sy - 4, sx + slot_w + 4, sy + slot_h + 4], radius=15, fill=(148, 163, 184, 180))
    draw.rounded_rectangle([sx, sy, sx + slot_w, sy + slot_h], radius=11, fill=(14, 18, 28, 255))
    
    return img

def render_hazard_stripes(width, height, stripe_w=16):
    stripes = Image.new('RGBA', (width, height), (242, 236, 220, 255))
    s_draw = ImageDraw.Draw(stripes)
    
    total = width + height + 100
    for offset in range(-height, total, stripe_w * 2):
        poly = [
            (offset, 0),
            (offset + stripe_w, 0),
            (offset + stripe_w - height, height),
            (offset - height, height)
        ]
        s_draw.polygon(poly, fill=COLOR_OBSIDIAN)
        
    s_draw.rectangle([0, 0, width - 1, height - 1], outline=COLOR_OBSIDIAN, width=2)
    return stripes

def draw_vector_barcode(draw, x, y, width, height, code_seed):
    rng = random.Random(code_seed)
    cur_x = x
    while cur_x < x + width:
        bar_w = rng.choice([2, 3, 5, 7, 9])
        if cur_x + bar_w > x + width:
            bar_w = x + width - cur_x
        draw.rectangle([cur_x, y, cur_x + bar_w - 1, y + height], fill=COLOR_OBSIDIAN)
        space_w = rng.choice([2, 3, 4, 6])
        cur_x += bar_w + space_w

def build_front_card():
    card = create_base_canvas()
    draw = ImageDraw.Draw(card)
    
    # 1. Top Right Header: Official SMKN 1 Beringin Branding
    # Logo
    logo = Image.open('public/assets/smkn1-beringin-logo.png')
    lw = 100
    lh = int(logo.height * (lw / logo.width))
    logo_resized = logo.resize((lw, lh), Image.Resampling.LANCZOS)
    
    lx = 645
    ly = 85
    card.paste(logo_resized, (lx, ly), logo_resized)
    
    # Typography: SMK NEGERI 1 BERINGIN
    tx = lx + lw + 16
    lines = ['SMK', 'NEGERI 1', 'BERINGIN']
    for i, line in enumerate(lines):
        draw.text((tx, ly + 2 + i * 32), line, fill=COLOR_OBSIDIAN, font=FONT_BLACK_LG)
        
    # Department sub-badge under header
    draw.text((lx + 6, ly + lh + 8), '// DEPT: TIK • TEKNOLOGI INFORMASI', fill=COLOR_BLUE, font=FONT_MONO_SM)
    
    # 2. Top Left Hazard Badge
    hz = render_hazard_stripes(180, 48, stripe_w=14)
    card.paste(hz, (50, 85))
    
    # Verification pill badge under hazard
    draw.rounded_rectangle([50, 142, 230, 168], radius=6, fill=COLOR_OBSIDIAN)
    draw.ellipse([60, 151, 68, 159], fill=COLOR_GREEN)
    draw.text((74, 147), 'VERIFIED DEV', fill=(240, 245, 255, 255), font=FONT_MONO_XS)
    
    # 3. Center Character: Dika Armadana Cutout
    dika_raw = Image.open('public/assets/dika_cutout.png')
    dika_tight = dika_raw.crop((46, 10, 508, 1023))
    
    scale = 1.08
    dw = int(dika_tight.width * scale) # ~498
    dh = int(dika_tight.height * scale) # ~1094
    dika = dika_tight.resize((dw, dh), Image.Resampling.LANCZOS)
    
    # Position: Left-aligned
    px = 152
    py = 220
    
    # Soft realistic contact shadow onto card paper
    dika_alpha = dika.split()[3]
    shadow_mask = dika_alpha.filter(ImageFilter.GaussianBlur(14))
    shadow_img = Image.new('RGBA', (dw, dh), (15, 20, 30, 85))
    shadow_img.putalpha(shadow_mask)
    card.paste(shadow_img, (px + 10, py + 12), shadow_img)
    
    # Paste Dika
    card.paste(dika, (px, py), dika)
    
    # 4. Foreground Name Tag Badge: DIKA ARMADANA
    tag_w = 440
    tag_h = 88
    tag = Image.new('RGBA', (tag_w + 30, tag_h + 30), (0, 0, 0, 0))
    t_draw = ImageDraw.Draw(tag)
    
    # Tag drop shadow
    t_draw.rounded_rectangle([10, 10, tag_w + 10, tag_h + 10], radius=10, fill=(0, 0, 0, 100))
    # Tag ivory plate
    t_draw.rounded_rectangle([0, 0, tag_w, tag_h], radius=10, fill=(245, 242, 230, 255), outline=COLOR_OBSIDIAN, width=2)
    # Tag accent gold tab on left
    t_draw.rounded_rectangle([0, 0, 10, tag_h], radius=4, fill=COLOR_GOLD)
    
    # Name Tag Content
    t_draw.text((22, 10), '[STUDENT ARCHITECT // ID: 2026-DEV]', fill=COLOR_BLUE, font=FONT_MONO_XS)
    t_draw.text((22, 24), 'DIKA ARMADANA', fill=COLOR_OBSIDIAN, font=FONT_BLACK_XL)
    t_draw.text((22, 64), 'FULL-STACK ENGINEER & CREATIVE WEB ARCHITECT', fill=COLOR_MUTED, font=FONT_BOLD_SM)
    
    # Paste name tag across lower chest
    tag_x = 180
    tag_y = 865
    card.paste(tag, (tag_x, tag_y), tag)
    
    # 5. Bottom Section: High-contrast Vector Barcode & Credential Meta
    bx = 60
    by = 1380
    bw = 904
    bh = 65
    
    draw.rectangle([bx - 10, by - 10, bx + bw + 10, by + bh + 45], fill=(246, 243, 233, 220), outline=COLOR_OBSIDIAN, width=1)
    draw_vector_barcode(draw, bx, by, bw, bh, 'DIKA_ARMADANA_SMKN1_BERINGIN_2026')
    
    serial_text = '* DK - 2024 - 2027 - TIK - SMK NEGERI 1 BERINGIN *'
    draw.text(((W - int(len(serial_text) * 9.2)) // 2, by + bh + 10), serial_text, fill=COLOR_OBSIDIAN, font=FONT_MONO_MD)
    
    return card

def build_back_card():
    card = create_base_canvas()
    draw = ImageDraw.Draw(card)
    
    # 1. Top Header: Official SMKN 1 Beringin Header
    logo = Image.open('public/assets/smkn1-beringin-logo.png')
    lw = 115
    lh = int(logo.height * (lw / logo.width))
    logo_resized = logo.resize((lw, lh), Image.Resampling.LANCZOS)
    
    lx = 65
    ly = 80
    card.paste(logo_resized, (lx, ly), logo_resized)
    
    # Typography: SMK NEGERI 1 BERINGIN
    tx = lx + lw + 18
    lines = ['SMK', 'NEGERI 1', 'BERINGIN']
    for i, line in enumerate(lines):
        draw.text((tx, ly + i * 35), line, fill=COLOR_OBSIDIAN, font=FONT_BLACK_XL)
        
    # Top Right Hazard Stripes
    hz = render_hazard_stripes(220, 56, stripe_w=16)
    card.paste(hz, (740, 85))
    
    draw.rounded_rectangle([740, 148, 960, 178], radius=6, fill=COLOR_OBSIDIAN)
    draw.ellipse([752, 159, 760, 167], fill=COLOR_GREEN)
    draw.text((768, 154), 'VERIFIED STUDENT // 2027', fill=(240, 245, 255, 255), font=FONT_MONO_XS)
    
    # 2. Magnetic Security Stripe
    mag_y = 225
    mag_h = 75
    draw.rectangle([0, mag_y, W, mag_y + mag_h], fill=(22, 26, 36, 255))
    draw.line([(0, mag_y), (W, mag_y)], fill=COLOR_GOLD, width=2)
    draw.line([(0, mag_y + mag_h), (W, mag_y + mag_h)], fill=COLOR_GOLD, width=2)
    
    mag_text = '// CRYPTOGRAPHICALLY SECURED // SMK NEGERI 1 BERINGIN // ARCHITECTURAL DEV CREDENTIAL //'
    draw.text((45, mag_y + 28), mag_text, fill=(210, 220, 240, 200), font=FONT_MONO_SM)
    
    # 3. Main Body: Official Credential Data Table
    table_x = 60
    table_y = 335
    table_w = 904
    table_h = 760
    
    # Card panel container
    draw.rounded_rectangle([table_x, table_y, table_x + table_w, table_y + table_h], radius=12, fill=(247, 244, 234, 255), outline=COLOR_OBSIDIAN, width=2)
    
    # Header strip of table
    draw.rounded_rectangle([table_x, table_y, table_x + table_w, table_y + 54], radius=10, fill=COLOR_OBSIDIAN)
    draw.rectangle([table_x, table_y + 40, table_x + table_w, table_y + 54], fill=COLOR_OBSIDIAN)
    draw.text((table_x + 24, table_y + 16), 'OFFICIAL STUDENT & DEVELOPER CREDENTIAL SPECIFICATION', fill=(255, 255, 255, 255), font=FONT_MONO_MD)
    
    # Data Rows
    fields = [
        ('FULL NAME', 'DIKA ARMADANA'),
        ('PROFESSIONAL ROLE', 'FULL STACK ENGINEER & CREATIVE WEB ARCHITECT'),
        ('INSTITUTION', 'SMK NEGERI 1 BERINGIN'),
        ('DEPARTMENT / MAJOR', 'TEKNOLOGI INFORMASI & KOMUNIKASI (TIK)'),
        ('CORE COMPETENCIES', 'REACT 19, TYPESCRIPT, THREE.JS, TAILWIND CSS, GSAP'),
        ('ACADEMIC PERIOD', '2024 - 2027 (ACTIVE ENROLLED STUDENT)'),
        ('IDENTIFICATION CODE', 'DK-2024-2027-TIK-SMKN1-089'),
        ('SECURITY CLEARANCE', 'LEVEL 4 // FULL SYSTEM INTEGRATION VERIFIED'),
        ('PORTFOLIO ACCESS', 'HTTPS://TIKSMKN1BERINGIN.MY.ID')
    ]
    
    row_h = 76
    start_y = table_y + 64
    for idx, (label, val) in enumerate(fields):
        ry = start_y + idx * row_h
        # Alternating subtle row tint
        if idx % 2 == 1:
            draw.rectangle([table_x + 4, ry - 4, table_x + table_w - 4, ry + row_h - 4], fill=(238, 234, 222, 160))
            
        draw.line([(table_x + 20, ry + row_h - 4), (table_x + table_w - 20, ry + row_h - 4)], fill=(18, 24, 38, 35), width=1)
        
        # Label
        draw.text((table_x + 24, ry + 10), label, fill=COLOR_MUTED, font=FONT_MONO_XS)
        # Value
        draw.text((table_x + 24, ry + 28), val, fill=COLOR_OBSIDIAN, font=FONT_BOLD_MD)
        
    # 4. Circular Official Seal / Stamp on bottom left
    seal_cx = 200
    seal_cy = 1240
    seal_r  = 85
    draw.ellipse([seal_cx - seal_r, seal_cy - seal_r, seal_cx + seal_r, seal_cy + seal_r], outline=COLOR_BLUE, width=3)
    draw.ellipse([seal_cx - seal_r + 8, seal_cy - seal_r + 8, seal_cx + seal_r - 8, seal_cy + seal_r - 8], outline=COLOR_BLUE, width=1)
    
    draw.text((seal_cx - 68, seal_cy - 40), 'SMKN 1 BERINGIN', fill=COLOR_BLUE, font=FONT_MONO_SM)
    draw.text((seal_cx - 52, seal_cy - 12), '★ VERIFIED ★', fill=COLOR_BLUE, font=FONT_BOLD_MD)
    draw.text((seal_cx - 40, seal_cy + 16), 'ACTIVE DEV', fill=COLOR_BLUE, font=FONT_MONO_XS)
    draw.text((seal_cx - 24, seal_cy + 34), '2026', fill=COLOR_BLUE, font=FONT_MONO_XS)
    
    # 5. Bottom Right: High-density Vector Barcode
    bx = 360
    by = 1170
    bw = 604
    bh = 70
    
    draw.rectangle([bx - 10, by - 10, bx + bw + 10, by + bh + 40], fill=(246, 243, 233, 220), outline=COLOR_OBSIDIAN, width=1)
    draw_vector_barcode(draw, bx, by, bw, bh, 'BACK_DK_SMKN1_BERINGIN_2026_SECURITY_HASH')
    
    serial_text = '* DK - 2024 - 2027 - TIK - SMKN 1 BERINGIN - AUTHENTIC *'
    draw.text(((bx + bw // 2) - int(len(serial_text) * 4.5), by + bh + 10), serial_text, fill=COLOR_OBSIDIAN, font=FONT_MONO_SM)
    
    return card

if __name__ == '__main__':
    print('Generating 100% clean Front Card...')
    fc = build_front_card().convert('RGB')
    fc.save('public/lanyard/frontCard.png', quality=95)
    fc.save('public/lanyard/frontCard-mobile.webp', 'WEBP', quality=90)
    fc.save('public/assets/dika_lanyard_card_preview.png')
    
    print('Generating 100% clean Back Card...')
    bc = build_back_card().convert('RGB')
    bc.save('public/lanyard/backCard.png', quality=95)
    bc.save('public/lanyard/backCard-mobile.webp', 'WEBP', quality=90)
    
    print('All textures successfully generated from scratch with ZERO patchwork!')
