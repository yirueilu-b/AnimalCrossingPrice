import pandas as pd

df = pd.read_csv("originalPriceTable.csv")
df = df.dropna()
print(df)

