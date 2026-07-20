from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


def export_theme(source: Path, destination: Path) -> None:
    image = Image.open(source).convert("RGB")
    target_ratio = 16 / 9
    current_ratio = image.width / image.height

    if current_ratio > target_ratio:
        width = round(image.height * target_ratio)
        left = (image.width - width) // 2
        image = image.crop((left, 0, left + width, image.height))
    else:
        height = round(image.width / target_ratio)
        top = (image.height - height) // 2
        image = image.crop((0, top, image.width, top + height))

    image.resize((1280, 720), Image.Resampling.LANCZOS).save(
        destination, "WEBP", quality=84, method=6
    )


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Prepare generated Magic Sort themes for production."
    )
    parser.add_argument("--moonlit", type=Path, required=True)
    parser.add_argument("--sunforge", type=Path, required=True)
    parser.add_argument("--frostglass", type=Path, required=True)
    parser.add_argument("--output", type=Path, default=Path("public/game/assets"))
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)

    export_theme(args.moonlit, args.output / "theme-moonlit-archives.webp")
    export_theme(args.sunforge, args.output / "theme-sunforge-sanctum.webp")
    export_theme(args.frostglass, args.output / "theme-frostglass-grotto.webp")


if __name__ == "__main__":
    main()
