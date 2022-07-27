from shutil import rmtree
import sys

csv_name = sys.argv[1]

rmtree(f"./src/temp/{csv_name}")