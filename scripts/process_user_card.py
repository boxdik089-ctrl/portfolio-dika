import cv2
import numpy as np
from PIL import Image

src_path = r'C:\Users\Hype AMD\.gemini\antigravity\brain\73f32cd5-9018-452e-bf40-e08d27c74f6e\.user_uploaded\media_1793225681596_780a52f5.png'
img = Image.open(src_path)
print(f'Original image size: {img.size}, mode: {img.mode}')

arr = np.array(img.convert('RGB'))
h, w = arr.shape[:2]

# Let's inspect the borders
# Left border is dark (outside the card), right border is dark
# Top and bottom might also have dark padding
# Let's find columns where brightness > 40
col_bright = arr.mean(axis=(0, 2))
row_bright = arr.mean(axis=(1, 2))

# Find card boundaries
cols = np.where(col_bright > 30)[0]
rows = np.where(row_bright > 30)[0]

c_min, c_max = cols.min(), cols.max()
r_min, r_max = rows.min(), rows.max()

print(f'Detected card bounds: x in [{c_min}, {c_max}], y in [{r_min}, {r_max}]')
print(f'Card width: {c_max - c_min + 1}, height: {r_max - r_min + 1}')

card_cropped = img.crop((c_min, r_min, c_max + 1, r_max + 1))
card_cropped.save('public/assets/user_card_cropped.png')
print('Saved public/assets/user_card_cropped.png')

