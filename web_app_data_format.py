import json

## File name of file to be re-formatted
inFileName = 'data_for_web_app.json'

## File name of the new file to be generated and saved
outFileName = 'data_for_web_app_no_list.json'

# load file
with open(inFileName, 'r') as f:
    dat = json.load(f)

# for each data set in the file
for i in range(len(dat)):

	# for each attribute or bit of data
    for k in dat[i].keys():

    	# if data is a list and has only one thing
        if len(dat[i][k])==1 and type(dat[i][k])==list:

        	# get rid of the list and make it the one thing
            dat[i][k] = dat[i][k][0]


## Save new json
with open(outFileName, 'w') as f:
    json.dump(dat, f)