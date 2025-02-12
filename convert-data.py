import csv

# Define the conversion dictionary
conversion_dict = {
    '--': '#CECECE',
    'Viola 1': '#E7C448',
    'Viola 2': '#7BA657',
    'Viola 3': '#5683C3',
    'Viola 4': '#634FA3',
    'Viola 5': '#FF4D00'
}

# Read the sections.csv file
with open('sections.csv', mode='r', newline='') as infile:
    reader = csv.reader(infile)
    data = [row for row in reader]

# Convert the data
converted_data = []
for row in data:
    converted_row = [conversion_dict.get(item, item) for item in row]
    converted_data.append(converted_row)

# Write the converted data to colors.csv
with open('colors.csv', mode='w', newline='') as outfile:
    writer = csv.writer(outfile)
    writer.writerows(converted_data)

print("Conversion complete. 'colors.csv' has been generated.")