import pandas as pd
from pandas import DataFrame
import numpy as np
import math
# Data Source: https://data.humdata.org/dataset/2015-unhcr-refugees-statistics-by-coo-coa/resource/278278d5-ba6c-45eb-b34d-c0b8cbdbe223
# #year,#adm1+code,#adm1+code,#affected+code,#affected,#affected
raw_data = DataFrame.from_csv("../data/unhcr_refugees_2015.csv", sep=",",index_col=False, header=0)
raw_data["end year total"] = pd.to_numeric([np.nan if x=="*" else x for x in raw_data["end year total"]])
raw_data["begin year total"] = pd.to_numeric([np.nan if x=="*" else x for x in raw_data["begin year total"]])
raw_data = raw_data.dropna()

raw_data["total movement"] = raw_data["end year total"] - raw_data["begin year total"]
raw_data["Percent Change"] = (raw_data["end year total"]/raw_data["begin year total"])*100
raw_data["Percent Change"] = [math.floor(x) for x in raw_data["Percent Change"]]
raw_data["Percent Change"] = raw_data["Percent Change"].fillna(0)
raw_data["Percent Change"] = raw_data["Percent Change"].replace('inf',0)

raw_data.to_csv("../data/clean_refugee_2015.csv",sep=",")

all_countries = []

all_countries = list(raw_data["country of asylum"].unique()) + list(raw_data["country of origin"].unique())
print len(all_countries)
all_countries = set(all_countries)
all_countries = list(all_countries)
print sorted(all_countries)