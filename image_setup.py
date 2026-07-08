from pathlib import Path
from PIL import Image

root = Path(__file__).parent
images_dir = root / 'images'

mapping = {
    'WhatsApp Image 2026-07-07 at 2.51.48 PM (4).jpeg': 'hero.jpg',
    'WhatsApp Image 2026-07-07 at 2.51.48 PM.jpeg': 'about.jpg',
    'WhatsApp Image 2026-07-07 at 2.51.42 PM.jpeg': 'gallery-1.jpg',
    'WhatsApp Image 2026-07-07 at 2.51.43 PM.jpeg': 'gallery-2.jpg',
    'WhatsApp Image 2026-07-07 at 2.51.46 PM.jpeg': 'gallery-3.jpg',
    'WhatsApp Image 2026-07-07 at 2.51.47 PM.jpeg': 'gallery-4.jpg',
    'WhatsApp Image 2026-07-07 at 2.51.48 PM (2).jpeg': 'gallery-5.jpg',
    'WhatsApp Image 2026-07-07 at 2.51.52 PM.jpeg': 'gallery-6.jpg',
}

sizes = {
    'hero.jpg': [800, 1200],
    'about.jpg': [600, 900],
    'gallery-1.jpg': [480, 900],
    'gallery-2.jpg': [480, 900],
    'gallery-3.jpg': [480, 900],
    'gallery-4.jpg': [480, 900],
    'gallery-5.jpg': [480, 900],
    'gallery-6.jpg': [480, 900],
}

quality = 85

for src_name, target_name in mapping.items():
    src_path = images_dir / src_name
    target_path = images_dir / target_name
    if src_path.exists():
        if not target_path.exists():
            src_path.rename(target_path)
            print(f'Renamed {src_name} -> {target_name}')
        else:
            print(f'Target already exists: {target_name}')
    else:
        print(f'Missing source: {src_name}')

for img_name, widths in sizes.items():
    img_path = images_dir / img_name
    if not img_path.exists():
        print(f'Missing for resize: {img_name}')
        continue
    with Image.open(img_path) as img:
        img = img.convert('RGB')
        for width in widths:
            if img.width <= width:
                out_path = images_dir / f'{img_path.stem}-{width}.jpg'
                if not out_path.exists():
                    img.save(out_path, format='JPEG', quality=quality, optimize=True)
                    print(f'Created {out_path.name}')
                continue
            ratio = width / img.width
            height = int(img.height * ratio)
            resized = img.resize((width, height), Image.LANCZOS)
            out_path = images_dir / f'{img_path.stem}-{width}.jpg'
            resized.save(out_path, format='JPEG', quality=quality, optimize=True)
            print(f'Created {out_path.name}')
