import pandas as pd


def clean_up_data(file_name, current_month):
    df = pd.read_csv(file_name)
    print(file_name, "read")
    df = df[df.iloc[:, current_month + 6].notna()].iloc[:, [0, 1, 2, 19, 20]]
    df.columns = ["中文名稱", "英文名稱", "一般售價", "出現地點", "出現時間"]
    df.reset_index(drop=True, inplace=True)
    df.to_csv('public/data/' + file_name)
    print('public/data/' + file_name, "saved")
    return


if __name__ == '__main__':
    print("Creating cleaned table data...")
    clean_up_data("fish.csv", 7)
    clean_up_data("insect.csv", 7)
