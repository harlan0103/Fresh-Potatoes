#Create movie information and comment table
import sqlite3 as lite
import sys

con = lite.connect('../dbs/movieInfo.db')

with con:
	cur = con.cursor()
	#fpid: user comment, uid: user, comment: comment content
	cur.execute("CREATE TABLE movies (id INTEGER PRIMARY KEY AUTOINCREMENT, fpID TEXT UNIQUE, title TEXT UNIQUE, year INTEGER, production TEXT, director TEXT, imdbID TEXT, metascore TEXT, imdbrating TEXT, rottenrating TEXT, plot TEXT, length TEXT, genre TEXT, country TEXT, rated TEXT, language TEXT)")
	cur.execute('CREATE TABLE comments (fpid TEXT PRIMARY KEY, uid TEXT, comment TEXT)')
	
con.close()