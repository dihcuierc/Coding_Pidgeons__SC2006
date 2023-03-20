import json

# read the JSON file
with open("fnb_partners.json", "r") as f:
    data = json.load(f)

# loop through the data and modify the "menu_item_endorsement" field
for obj in data:
    endorsements = []
    for endorsement in obj["menu_item_endorsement"]:
        if "and" in endorsement:
            new_endorsements = endorsement.split(" and ")
            for e in new_endorsements:
                if e.strip() not in endorsements:
                    # capitalise the first letter of the endorsement
                    e = e.strip().capitalize()
                    endorsements.append(e)
        elif endorsement.strip() not in endorsements:
            endorsements.append(endorsement.strip())
    obj["menu_item_endorsement"] = endorsements

# write the modified data to a new JSON file
with open("fnb_partners_modified.json", "w") as f:
    json.dump(data, f, indent=4)
