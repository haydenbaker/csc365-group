#!/usr/bin/env python3

import pandas as pd, csv, time, random

def main():

    tbefore = time.time()

    flights_df = pd.read_csv("../data/flights.csv")
    flights_df = flights_df.set_index("Fid")

    header = ["Sid", "Fid", "Class", "Location", "Taken"]
    classes = ["FIRST", "BUSINESS", "ECONOMY"]
    locations = ["WINDOW", "MIDDLE", "AISLE"]
    seats = []

    for fid in flights_df.index.values:
        seat_range = ((fid - 1) * 50) + 1
        for sid in range(seat_range, seat_range + 50):
            taken = random.choice([1, 1, 1, 1, 0])
            taken *= time.strptime(flights_df.loc[fid, 'FlightDate'], "%Y-%m-%d %X") < time.gmtime(tbefore + 39600)

            seats.append([sid, fid, random.choice(classes), random.choice(locations), taken])

    seats_df = pd.DataFrame(columns=header, data=seats)
    
    with open("sql/seats.sql", "w") as f:
        write_header(f, "Seat", seats_df.columns.values.tolist())
        write_values(f, seats_df.to_csv(header=False, index=False, quotechar='"', quoting=csv.QUOTE_NONNUMERIC).strip('\n').split('\n'))

    print("Finished parsing + writing in {:.2f} seconds".format(time.time() - tbefore))

def write_header(f, tbl_name, cols):
    f.write("INSERT INTO {}\n".format(tbl_name))
    f.write("\t({})\n".format(",".join(cols)))
    f.write("VALUES\n")

def write_values(f, vals, strcol=[]):
    vals_fmt = ["\t({})".format(val) for val in vals]
    vals_fmt = ",\n".join(vals_fmt) + ';'
    f.write(vals_fmt)

if __name__ == "__main__":
    main()
