#Run with terminal to create domesticBoxOfficeData.db
import sqlite3 as lite
import sys

#create a new box office database contains 'domestic', 'worldwide' and 'weekend' tables
con = lite.connect('../dbs/boxOffice.db')

with con:
	cur = con.cursor()
	#create table
	cur.execute("CREATE TABLE domestic (id INTEGER PRIMARY KEY AUTOINCREMENT, rank INTEGER, title TEXT UNIQUE NOT NULL, lifetimegross TEXT, studio TEXT, year INTEGER, onshow BOOLEAN)")	
	cur.execute("CREATE TABLE worldwide (id INTEGER PRIMARY KEY AUTOINCREMENT, rank INTEGER, title TEXT UNIQUE NOT NULL, lifetimegross TEXT, domesticgross TEXT, domesticpercent TEXT, overseagross TEXT, overseapercent TEXT, studio TEXT, year INTEGER, onshow BOOLEAN)")
	cur.execute("CREATE TABLE weekend (id INTEGER PRIMARY KEY AUTOINCREMENT, rank INTEGER, title TEXT UNIQUE NOT NULL, weekendgross TEXT, totalgross TEXT, studio TEXT, new BOOLEAN)")
con.close()