#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

"""
Block Site - Website Blocker for Chrome
Chrome Web Store: https://chrome.google.com/webstore/detail/block-site-website-blocke/eiimnmioipafcokbfikbljfdeojpcgbh/reviews?hl=en
Website: https://blocksite.co/

Process upstream extension code into a more readable and editable form
"""

# TODO: Use debundle ( https://github.com/1egoman/debundle ) and also webpack ( https://webpack.js.org )?

import json
import shutil
import logging
from pathlib import Path

def _get_logger(level=logging.DEBUG):
    logger = logging.getLogger(__package__)

    logger.setLevel(level)

    if not logger.hasHandlers():
        console_handler = logging.StreamHandler()
        console_handler.setLevel(level)

        formatter = logging.Formatter("%(asctime)s - %(levelname)s: %(message)s")
        console_handler.setFormatter(formatter)

        logger.addHandler(console_handler)
    return logger

def main():
    """Entrypoint"""

    # Common variables
    logger = _get_logger()
    script_dir = Path(__file__).absolute().parent

    # Remove unnecessary _metadata/ directory
    try:
        shutil.rmtree(str(script_dir / '_metadata'))
    except FileNotFoundError:
        logger.warning('_metadata/ already removed')

    # Prettify manifest.json
    with (script_dir / 'manifest.json').open('r+') as manifest_file:
        parsed_json = json.load(manifest_file)
        manifest_file.seek(0)
        json.dump(parsed_json, manifest_file, indent=4, sort_keys=True)
        manifest_file.truncate()

if __name__ == '__main__':
    main()
