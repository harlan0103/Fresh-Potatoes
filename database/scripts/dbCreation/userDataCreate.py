import sqlite3 as lite
import sys

# Create movie detail database
con = lite.connect('../dbs/userData.db')

with con:
	cur = con.cursor()
	# Create table userInfo to store username and password
	cur.execute("CREATE TABLE users (username TEXT PRIMARY KEY not null, password TEXT not null)")
	# Create movei gallery database
	cur.execute("CREATE TABLE gallery ( username TEXT NOT NULL, fpid TEXT NOT NULL, addtime TEXT, moviename TEXT, id INTEGER PRIMARY KEY AUTOINCREMENT )")
con.close()