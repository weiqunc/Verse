#!/usr/bin/env python3
"""Rebuild Verse's optional card previews. Requires Pillow; originals stay intact."""
from pathlib import Path
import hashlib
import json
import os
import re
import tempfile
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
VALID_IMAGE = re.compile(r'images/[A-Za-z0-9_.()-]+\.(?:jpe?g|png|gif|webp)', re.I)


def atomic_write(target, payload):
    fd, name = tempfile.mkstemp(prefix=target.name + '.', suffix='.tmp', dir=target.parent)
    try:
        with os.fdopen(fd, 'wb') as stream:
            stream.write(payload)
        os.chmod(name, target.stat().st_mode & 0o777 if target.exists() else 0o644)
        os.replace(name, target)
    finally:
        Path(name).unlink(missing_ok=True)


def main():
    library = json.loads((ROOT / 'data.json').read_text(encoding='utf-8'))
    sources = {'images/gray.jpg'}
    for kind in ('songs', 'poems', 'classical', 'favorites'):
        for row in library.get(kind, []):
            value = row.get('image')
            if isinstance(value, str) and VALID_IMAGE.fullmatch(value):
                sources.add(value)
    frontend = ROOT / 'main.js'
    if frontend.is_symlink():
        raise ValueError('main.js must be a regular file')
    source = frontend.read_text(encoding='utf-8')
    marker = 'const coverPreviews = '
    start = source.index(marker) + len(marker)
    _, length = json.JSONDecoder().raw_decode(source[start:])
    if source[start + length] != ';':
        raise ValueError('Cannot locate the coverPreviews mapping safely')
    preview_dir = ROOT / 'images' / 'previews'
    if preview_dir.is_symlink():
        raise ValueError('images/previews must be a regular directory')
    preview_dir.mkdir(exist_ok=True)
    mapping = {}
    for relative in sorted(sources):
        original = ROOT / relative
        if original.is_symlink() or not original.is_file():
            print('Skipping missing or linked image:', relative)
            continue
        digest = hashlib.sha256(original.read_bytes()).hexdigest()
        target = preview_dir / (digest + '.webp')
        if target.is_symlink():
            raise ValueError('Preview target must be a regular file')
        if not target.exists():
            with Image.open(original) as photo:
                # Animated formats use their first frame for cards; details retain the original.
                thumb = ImageOps.exif_transpose(photo).convert('RGBA' if 'A' in photo.getbands() else 'RGB')
                thumb.thumbnail((168, 168), Image.Resampling.LANCZOS)
                fd, temporary = tempfile.mkstemp(suffix='.webp', dir=preview_dir)
                os.close(fd)
                try:
                    thumb.save(temporary, 'WEBP', quality=80, method=6)
                    os.chmod(temporary, 0o644)
                    os.replace(temporary, target)
                finally:
                    Path(temporary).unlink(missing_ok=True)
        mapping[relative] = target.relative_to(ROOT).as_posix()
    updated = source[:start] + json.dumps(mapping, ensure_ascii=False, indent=2) + source[start + length:]
    atomic_write(frontend, updated.encode('utf-8'))
    print(f'Rebuilt {len(mapping)} cover mappings; original images and data.json unchanged.')


if __name__ == '__main__':
    main()
