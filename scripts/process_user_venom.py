from PIL import Image
import numpy as np
import rembg

# 1. Load the user uploaded image
src_path = 'C:/Users/Hype AMD/.gemini/antigravity/brain/76d2d53e-4a16-4e1f-91c0-bf6ca1b27aae/.user_uploaded/media_1795141928197_0c8de5e2.jpg'
im = Image.open(src_path)

# 2. Crop the exact Pinterest card: x: [29, 376], y: [29, 648]
card = im.crop((29, 29, 376, 648))
card.save('user_venom_card_clean.png')
print('Card size:', card.size)

# 3. Use u2netp (fast ~4MB) or silueta (~43MB)
session = rembg.new_session('u2netp')
out = rembg.remove(card, session=session)
out.save('user_venom_u2netp.png')
print('u2netp finished!')
