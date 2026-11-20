import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

print("Step 1: Loading assets...")
card = Image.open('public/lanyard/frontCard.png').convert('RGBA')
dika_raw = Image.open('public/assets/dika_cutout.png')

# Tight crop of Dika
dika_tight = dika_raw.crop((46, 10, 508, 1023))

# Scale Dika
scale = 1.06
dw = int(dika_tight.width * scale) # 489
dh = int(dika_tight.height * scale) # 1073
dika = dika_tight.resize((dw, dh), Image.Resampling.LANCZOS)

# Position Dika
px = 416 - dw // 2 - 8 # 163
py = 225

print("Step 2: Inpainting old background...")
# Inpaint areas where the old person sticks out
card_cv = cv2.imread('public/lanyard/frontCard.png')
h, w = card_cv.shape[:2]
mask = np.zeros((h, w), dtype=np.uint8)

# 1. Left side of old blazer (x=175..260, y=450..780)
mask[450:780, 175:260] = 255
# 2. Right side of old blazer (x=610..675, y=480..760)
mask[480:760, 610:675] = 255
# 3. Old hair/ears (x=350..530, y=240..340)
mask[240:340, 350:530] = 255

inpainted_bgr = cv2.inpaint(card_cv, mask, inpaintRadius=5, flags=cv2.INPAINT_TELEA)
bg = Image.fromarray(cv2.cvtColor(inpainted_bgr, cv2.COLOR_BGR2RGBA))

print("Step 3: Creating subtle contact shadow for Dika...")
# Create shadow mask from Dika's alpha
dika_alpha = dika.split()[3]
shadow_mask = dika_alpha.filter(ImageFilter.GaussianBlur(10))
shadow_img = Image.new('RGBA', (dw, dh), (0, 0, 0, 70))
shadow_img.putalpha(shadow_mask)

# Paste shadow slightly offset
bg.paste(shadow_img, (px + 6, py + 8), shadow_img)

print("Step 4: Pasting Dika...")
bg.paste(dika, (px, py), dika)

print("Step 5: Restoring chrome ring overlay...")
# Crop chrome ring from original card
orig_card = Image.open('public/lanyard/frontCard.png').convert('RGBA')
ring_crop = orig_card.crop((120, 730, 255, 950))
ring_arr = np.array(ring_crop)
# The metallic ring has bright highlights and dark outline
# We can create a mask for the metallic ring pixels (specular highlights or strong metal gradient)
gray = cv2.cvtColor(ring_arr[:, :, :3], cv2.COLOR_RGB2GRAY)
# Ring pixels have distinct highlights and specular reflections
_, ring_mask_bin = cv2.threshold(gray, 90, 255, cv2.THRESH_BINARY)
# Morphological close to keep ring solid
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
ring_mask_clean = cv2.morphologyEx(ring_mask_bin, cv2.MORPH_CLOSE, kernel)
ring_alpha = Image.fromarray(ring_mask_clean).filter(ImageFilter.GaussianBlur(1))

ring_overlay = ring_crop.copy()
ring_overlay.putalpha(ring_alpha)
bg.paste(ring_overlay, (120, 730), ring_overlay)

print("Step 6: Generating DIKA ARMADANA Name Tag...")
tag_w = 345
tag_h = 58
tag_img = Image.new('RGBA', (tag_w + 30, tag_h + 30), (0, 0, 0, 0))
tag_draw = ImageDraw.Draw(tag_img)

# Drop shadow for tag
tag_draw.rectangle([6, 6, tag_w + 6, tag_h + 6], fill=(0, 0, 0, 110))
# Cream tag background (#eae6d0)
tag_draw.rectangle([0, 0, tag_w, tag_h], fill=(234, 230, 208, 255))

# Font for name: Arial Bold / Black
font = None
for f_path in [r'C:\Windows\Fonts\ariblk.ttf', r'C:\Windows\Fonts\arialbd.ttf']:
    try:
        font = ImageFont.truetype(f_path, 30)
        break
    except:
        pass
if not font:
    font = ImageFont.load_default()

text = "DIKA ARMADANA"
bbox = tag_draw.textbbox((0, 0), text, font=font)
tw = bbox[2] - bbox[0]
th = bbox[3] - bbox[1]
tx = (tag_w - tw) // 2
ty = (tag_h - th) // 2 - 2
tag_draw.text((tx, ty), text, fill=(18, 24, 38, 255), font=font)

# Rotate tag slightly (-2.2 deg)
rotated_tag = tag_img.rotate(-2.2, resample=Image.Resampling.BICUBIC, expand=True)
bg.paste(rotated_tag, (190, 865), rotated_tag)

print("Step 7: Updating school badge text to SMKN 1 BERINGIN...")
# In original card, school text is at x=640..780, y=95..145
# We can inpaint the school text region with cream background
school_mask = np.zeros((h, w), dtype=np.uint8)
school_mask[95:145, 640:785] = 255
# Fill with the local cream color (around 233, 230, 215)
bg_draw = ImageDraw.Draw(bg)
bg_draw.rectangle([640, 95, 785, 145], fill=(233, 230, 215, 255))

# Draw "SMKN 1 BERINGIN"
try:
    school_font = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 16)
except:
    school_font = ImageFont.load_default()

bg_draw.text((642, 98), "SMKN 1", fill=(18, 24, 38, 255), font=school_font)
bg_draw.text((642, 118), "BERINGIN", fill=(18, 24, 38, 255), font=school_font)

print("Step 8: Saving final textures...")
# Convert to RGB (card texture is RGB)
final_card = bg.convert('RGB')
final_card.save('public/lanyard/frontCard.png', quality=95)
final_card.save('public/lanyard/frontCard-mobile.webp', 'WEBP', quality=90)
final_card.save('public/assets/dika_lanyard_card_preview.png')

print("All card textures successfully updated and exported!")

