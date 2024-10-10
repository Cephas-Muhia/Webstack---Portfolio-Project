#!/bin/bash

# Remove :Zone.Identifier files
find . -name "*:Zone.Identifier" -type f -delete

# Remove .jpg.jpg duplicates
find . -name "*.jpg.jpg" -type f -exec rm -f {} \;

