import sys
import os

import pandas as pd
from matplotlib import pyplot as plt

csv_path = sys.argv[1]
csv_name = sys.argv[2]

types = [
  "bar",
  "line",
  "pie"
]

df = pd.DataFrame(pd.read_csv(csv_path)) 

# Open Folders
os.makedirs(f"./src/temp/{csv_name}")
os.makedirs(f"./src/temp/{csv_name}/bar")
os.makedirs(f"./src/temp/{csv_name}/line")
os.makedirs(f"./src/temp/{csv_name}/pie")


for i in types:
  for j in df:  
    match i:
      case "bar":
        try:
          df[j].fillna(0)
          plot = df[j].head(n=15).plot(kind='bar')
          fig = plot.get_figure();
          fig.savefig(f"./src/temp/{csv_name}/bar/bar-chart-{j}.png")
        except:
          print("Error ocurred")
      case "line":
        try:
          plot = df.head(n=5).groupby(j).size().plot(kind='line')
          fig = plot.get_figure();
          fig.savefig(f"./src/temp/{csv_name}/line/line-chart-{j}.png")
        except:
          print("Error ocurred")
      case "pie":
        try:
          plot = df.head(n=15).groupby(j).size().plot(kind='pie', ylabel='')
          fig = plot.get_figure();
          fig.savefig(f"./src/temp/{csv_name}/pie/pie-chart-{j}.png")
        except:
          print("Error ocurred")