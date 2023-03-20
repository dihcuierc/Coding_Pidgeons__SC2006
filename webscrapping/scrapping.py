from selenium import webdriver
import time
import json

url = "https://hpb.gov.sg/healthy-living/food-beverage/healthier-dining-programme/list-of-healthier-dining-partners"
driver = webdriver.Chrome()  # change this to the location of your webdriver

driver.get(url)
time.sleep(3)  # wait for the page to load

# execute the JavaScript code to get the JSON data
data = driver.execute_script("""
    var data = null;
    $.ajax({
        async: false,
        url: '/docs/default-source/default-document-library/hdp-fnbPartners.txt',
        success: function(response) {
            data = JSON.parse(response);
        }
    });
    return data;
""")

driver.quit()  # close the browser

# export data to json
with open("fnb_partners.json", "w") as f:
    json.dump(data, f, indent=4)

# loop through the data and extract restaurant names and categories
# for item in data:
#     name = item["Name"].strip()
#     category = item["Category"].strip()
#     print(name, "-", category)

