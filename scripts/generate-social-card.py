"""Gera a imagem Open Graph com as fontes locais. Requer Pillow."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
image = Image.new("RGB", (1200, 630), "#090910")
draw = ImageDraw.Draw(image)
pixel = ImageFont.truetype(str(ROOT / "assets/fonts/press-start-2p.ttf"), 54)
mono = ImageFont.truetype(str(ROOT / "assets/fonts/space-mono-regular.ttf"), 21)
label = ImageFont.truetype(str(ROOT / "assets/fonts/space-mono-regular.ttf"), 14)
brand = ImageFont.truetype(str(ROOT / "assets/fonts/space-mono-bold.ttf"), 40)
for x in range(0, 1200, 48):
    draw.line((x, 0, x, 630), fill="#151323")
for y in range(0, 630, 48):
    draw.line((0, y, 1200, y), fill="#151323")
draw.line((64, 112, 1136, 112), fill="#302638")
draw.text((64, 38), "horys", font=brand, fill="#eeeef5")
draw.text((186, 38), ".", font=brand, fill="#ff006e")
draw.text((855, 57), "SISTEMAS / APPS / GAMES", font=label, fill="#a2a2b4")
draw.rectangle((66, 166, 73, 173), fill="#00ffff")
draw.text((87, 157), "CÓDIGO COM PROPÓSITO.", font=label, fill="#00ffff")
draw.text((61, 213), "Ideias em", font=pixel, fill="#eeeef5")
draw.text((61, 301), "outra", font=pixel, fill="#eeeef5")
draw.text((65, 393), "dimensão.", font=pixel, fill="#145070")
draw.text((61, 389), "dimensão.", font=pixel, fill="#00ffff")
draw.text((64, 524), "Um pouco retrô. Sempre em frente.", font=mono, fill="#a2a2b4")
draw.rounded_rectangle((758, 190, 1117, 470), 14, fill="#302b3f", outline="#746583", width=2)
draw.rounded_rectangle((776, 211, 1099, 430), 9, fill="#0d1023", outline="#514263", width=2)
draw.ellipse((882, 238, 992, 348), fill="#ff006e")
for y in range(290, 348, 10):
    draw.rectangle((880, y, 994, y + 3), fill="#0d1023")
for x in range(780, 1100, 35):
    draw.line((938, 338, x, 429), fill="#563073")
for y in (355, 368, 387, 412):
    draw.line((778, y, 1097, y), fill="#563073")
draw.rectangle((904, 260, 920, 327), fill="#00ffff")
draw.rectangle((954, 260, 970, 327), fill="#00ffff")
draw.rectangle((920, 285, 954, 301), fill="#00ffff")
draw.text((855, 379), "> criar_futuros", font=label, fill="#00ffff")
for y in range(213, 429, 4):
    draw.line((779, y, 1096, y), fill="#090910", width=1)
draw.text((790, 439), "horys.", font=label, fill="#c0b5cc")
draw.ellipse((1078, 447, 1084, 453), fill="#00ffff")
draw.rectangle((911, 471, 963, 501), fill="#302b3f")
draw.rounded_rectangle((859, 495, 1015, 508), 5, fill="#40364c")
draw.text((969, 541), "horys.dev", font=mono, fill="#ff71ae")
image.save(ROOT / "assets/social-card.png", optimize=True)
print("assets/social-card.png — 1200 x 630")
