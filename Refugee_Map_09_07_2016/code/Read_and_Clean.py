import pandas as pd
from pandas import DataFrame
import numpy as np
import math
# Data Source: https://data.humdata.org/dataset/2015-unhcr-refugees-statistics-by-coo-coa/resource/278278d5-ba6c-45eb-b34d-c0b8cbdbe223
# #year,#adm1+code,#adm1+code,#affected+code,#affected,#affected
if(0):
	raw_data = DataFrame.from_csv("../data/unhcr_refugees_2015.csv", sep=",",index_col=False, header=0)
	raw_data["End_Year_Total"] = pd.to_numeric([np.nan if x=="*" else x for x in raw_data["End_Year_Total"]])
	raw_data["Begin_Year_Total"] = pd.to_numeric([np.nan if x=="*" else x for x in raw_data["Begin_Year_Total"]])
	raw_data = raw_data.dropna()

	raw_data["Total_Movement"] = raw_data["End_Year_Total"] - raw_data["Begin_Year_Total"]

	#raw_data["Percent Change"] = (raw_data["end year total"]/raw_data["begin year total"])*100
	# raw_data["Percent Change"] = [math.floor(x) for x in raw_data["Percent Change"]]
	# raw_data["Percent Change"] = raw_data["Percent Change"].fillna(0)
	# raw_data["Percent Change"] = raw_data["Percent Change"].replace('inf',0)

	all_countries = []

	all_countries = list(raw_data["Country_Of_Asylum"].unique()) + list(raw_data["Country_Of_Origin"].unique())
	all_countries = set(all_countries)
	all_countries = list(all_countries)

	raw_data = DataFrame.from_csv("../data/clean_refugee_2015.csv",sep=",",index_col=False,header=0)
	alpha3_data = DataFrame.from_csv("../data/ALPHA3_codes.csv", sep="\t",index_col=False, header=0)
	# raw_data = raw_data.drop(raw_data.columns[[0]], axis=1)

	# for index, row in raw_data.iterrows():
	# 	for alpha_index, alpha_row in alpha3_data.iterrows():
	# 		if row[2]==alpha_row[0]:
	# 			raw_data.set_value(index,"country of origin",alpha_row[1])
	# 			break
	# print raw_data
	alpha3_data = alpha3_data.drop_duplicates(subset="Code")
	c = alpha3_data.groupby(["Country"]).cumcount()
	c = c.replace(0,'').astype(str)
	alpha3_data["Country"] += "**"+c
	alpha3_data = alpha3_data.dropna()
	ids = alpha3_data["Code"]
	print alpha3_data[ids.isin(ids[ids.duplicated()])].sort_values(by="Code")

	raw_data.loc[raw_data.Country_Of_Asylum.isin(alpha3_data.Code), 'Country_Of_Asylum'] = \
	raw_data['Country_Of_Asylum'].map(alpha3_data.set_index('Code').ix[:, 'Country'])

	raw_data.loc[raw_data.Country_Of_Origin.isin(alpha3_data.Code), 'Country_Of_Origin'] = \
	raw_data['Country_Of_Origin'].map(alpha3_data.set_index('Code').ix[:, 'Country'])

	raw_data.to_csv("../data/clean_refugee_2015.csv",sep=",", index=False)

	data = DataFrame.from_csv("../data/name_corrected_refugee_2015.csv",sep=",",index_col=False,header=0)

	for index, row in data.iterrows():
		if "*" in row["Country_Of_Asylum"]:
			i = row["Country_Of_Asylum"].index("*")
			data.set_value(index,"Country_Of_Asylum",row["Country_Of_Asylum"][:i])
		if "*" in row["Country_Of_Origin"]:
			i = row["Country_Of_Origin"].index("*")
			data.set_value(index,"Country_Of_Origin",row["Country_Of_Origin"][:i])

	print data
	data.to_csv("../data/cleaned_name_corrected_refugee_2015.csv",sep=",", index=False)

data = DataFrame.from_csv("../data/cleaned_name_corrected_refugee_2015.csv",sep=",",index_col=False,header=0)

Origin = data.Country_Of_Origin.unique().tolist()
Asylum = data.Country_Of_Asylum.unique().tolist()

Origin_Indexed = range(len(Origin))
Asylum_Indexed = range(len(Asylum))

w = 2
h = len(data.index)
Matrix = [[0 for x in range(w)] for y in range(h)]

data["Country_Of_Asylum_Indexed"] = 0
data["Country_Of_Origin_Indexed"] = 0

# for index, row in data.iterrows():
# 	data.set_value(index,"Country_Of_Origin_Indexed",Origin.index(row["Country_Of_Origin"])+1)
# 	data.set_value(index,"Country_Of_Asylum_Indexed",Asylum.index(row["Country_Of_Asylum"])+1)

# i = 0
# for row in Matrix:
# 	row[0] = data.iloc[i]["Country_Of_Origin_Indexed"]
# 	row[1] = data.iloc[i]["Country_Of_Asylum_Indexed"]
# 	i+=1

print "Origin_Indexed\n\n"
print Origin_Indexed

print "Aslyum_Indexed\n\n"
print Asylum_Indexed

