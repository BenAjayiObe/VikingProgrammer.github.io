import pandas as pd
import numpy as np


# Data taken from:
# www.rio2016.com
# https://www.worlddata.info/downloads/
# http://www.enchantedlearning.com/geography/continents/Extremes.shtml

olympicData = pd.read_csv("../data/cleaned_olympic_Data.csv", sep="\t")

olympicData["Continent_Sum"] = olympicData.groupby(["Continent"])["Total"].transform("sum")
olympicData["Continent_Gold_Sum"] = olympicData.groupby(["Continent"])["Gold"].transform("sum")
olympicData["Continent_Silver_Sum"] = olympicData.groupby(["Continent"])["Silver"].transform("sum")
olympicData["Continent_Bronze_Sum"] = olympicData.groupby(["Continent"])["Bronze"].transform("sum")

print "Total"
print np.array(olympicData.groupby(["Continent","Continent_Sum"]).groups.keys())
print ""

print "Gold"
print np.array(olympicData.groupby(["Continent","Continent_Gold_Sum"]).groups.keys())
print ""

print "Silver"
print np.array(olympicData.groupby(["Continent","Continent_Silver_Sum"]).groups.keys())
print ""

print "Bronze"
print np.array(olympicData.groupby(["Continent","Continent_Bronze_Sum"]).groups.keys())
print ""