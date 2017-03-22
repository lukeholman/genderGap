import json

inFileName = 'data_for_web_app_unparsed.json'

outFileName = 'data_for_web_app_no_list_no_dup_disc.json'

with open(inFileName, 'r') as f:
    dat = json.load(f)

for i in range(len(dat)):
    for k in dat[i].keys():
        if len(dat[i][k]) == 1 and type(dat[i][k])==list:
            dat[i][k] = dat[i][k][0]

with open(outFileName, 'w') as f:
    json.dump(dat, f)
