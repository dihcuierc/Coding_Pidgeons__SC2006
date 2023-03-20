import json

with open("fnb_partners.json", "r") as f:
    data = json.load(f)

# loop through the data and extract restaurant names and categories
print(len(data))    