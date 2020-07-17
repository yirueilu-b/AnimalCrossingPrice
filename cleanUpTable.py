import pandas as pd


def clean_up_data(file_name, current_month):
    df = pd.read_csv(file_name)
    print(file_name, "read")
    df = df[df.iloc[:, current_month + 6].notna()].iloc[:, [0, 1, 2, 19, 20]]
    df.columns = ["name", "engName", "price", "location", "time"]
    df.reset_index(drop=True, inplace=True)
    df.to_csv('src/data/' + file_name)
    print('src/data/' + file_name, "saved")
    return


if __name__ == '__main__':
    print("Creating cleaned table data...")
    clean_up_data("fish.csv", 7)
    clean_up_data("insect.csv", 7)
