from flask import Flask, url_for, render_template, request, redirect, make_response, jsonify
from flask_cors import CORS, cross_origin
import sqlite3
import time
#from playhouse.shortcuts import model_to_dict, dict_to_model

app = Flask(__name__)

#connect to boxoffice database
def con_boxoffice():
	return sqlite3.connect('../database/dbs/boxoffice.db')

# Since flask using port 5000 and React using port 3000
# We need to connect them
CORS(app)

#app.route('/boxoffice/domestic')
#Fetch top 100 boxoffice movies from database
#All movie informations are retrieve from boxOffice.db
@app.route('/boxoffice/domestic', methods=['GET'])
def box_office():
	#This is the box office page
	title = "Domestic - Fresh Potatoes"

	#Open database
	con = sqlite3.connect('../database/dbs/boxoffice.db')
	cur = con.cursor()
	#Get all movie information into rows
	movies = cur.execute('SELECT * FROM domestic ORDER BY rank').fetchall()

	con.close()
	#return render_template('boxoffice_domestic.html', title=title, movies=movies)
	return jsonify(list(movies))

#app.route('/boxoffice/worldwide')
#All movie informations are retrieve from boxOffice.db
@app.route('/boxoffice/worldwide', methods=['GET'])
def box_office_worldwide():
	#This is the box office page with worldwide record
	title = "Worldwide - Fresh Potatoes"

	con = sqlite3.connect('../database/dbs/boxoffice.db')
	cur = con.cursor()
	movies = cur.execute('SELECT * FROM worldwide ORDER BY rank').fetchall()

	#return render_template('boxoffice_worldwide.html', title=title, movies=movies)
	return jsonify(movies)

#app.route('/boxoffice/weekend')
#All movie informations are retrieve from boxOffice.db
#The weekend movies will be updated once a week
@app.route('/boxoffice/weekend', methods=['GET'])
def box_office_weekend():
	#This is the box office page with worldwide record
	title = "Worldwide - Fresh Potatoes"

	con = sqlite3.connect('../database/dbs/boxoffice.db')
	cur = con.cursor()
	movies = cur.execute('SELECT * FROM weekend ORDER BY rank').fetchall()

	#return render_template('boxoffice_weekend.html', title=title, movies=movies)
	return jsonify(movies)

#app.route('/search')
#This is the search page
#Users can search movies in the search bar
#The result will based on the movie data in movieDetail.db
@app.route('/search', methods=['POST'])
def search():
	#This is the genre page
	title = "Search - Fresh Potatoes"

	movie_name = request.get_json()['movie_name']

	movie_param = '%'+movie_name+'%'

	#Check if user input is null
	if movie_param != "%%":
		con = sqlite3.connect('../database/dbs/movieInfo.db')
		cur = con.cursor()
		search_url = 'SELECT title, fpID FROM movies WHERE title LIKE "'+movie_param+'"'
		movies = cur.execute(search_url).fetchall()
		return jsonify(movies)
	else:
		response = ''
		return jsonify(response)

#app.route('/movie/<movieID>')
#This will fetch movie detail information from database
@app.route('/movie/<movieID>', methods=['GET'])
def movie_detail(movieID):
	# Open movie detail database
	movieid = movieID

	con = sqlite3.connect('../database/dbs/movieInfo.db')
	cur = con.cursor()
	# Get all movie information
	querySentence = 'SELECT * FROM movies WHERE fpID="'+movieID+'"'
	movie = cur.execute(querySentence).fetchall()
	return jsonify(movie)

#app.route('/comment/<movieID>')
#This will fetch movie comments from database
@app.route('/comment/<movieID>', methods=['GET', 'POST'])
def movie_comment(movieID):
	if request.method == 'GET':
		mcon = sqlite3.connect('../database/dbs/movieInfo.db')
		mcur = mcon.cursor()
		mquery = 'SELECT * FROM comments WHERE fpID="'+movieID+'"' + 'ORDER BY time DESC'
		comments = mcur.execute(mquery).fetchall()
		mcon.close()
		return jsonify(comments)
	# Here is post
	else:
		comment = request.get_json()['comment']
		user = request.get_json()['user']
		commentdate = time.strftime("%Y-%m-%d")

		icon = sqlite3.connect('../database/dbs/movieInfo.db')
		icur = icon.cursor()

		icur.execute('INSERT INTO comments VALUES (?,?,?,?)',(movieID, user, comment, commentdate))
		icon.commit()
		icon.close()
		return jsonify(200)

#This will insert new username record into database
@app.route('/signup', methods=['POST'])
def signup():
	#This is the sign up page 
	if request.method == 'POST':
		#global username
		username = request.get_json()['username']
		password = request.get_json()['password']
		insert = insertUser(username, password)
		if insert == 'true':
			# Create a new username and password
			return jsonify(status=200, username=username, password=password)
		else:
			# Username exist
			return jsonify(status=400, message="Username Exist")

def insertUser(username,password):
	con = sqlite3.connect("../database/dbs/userData.db")
	cur = con.cursor()
	try:
		cur.execute("INSERT INTO users (username,password) VALUES (?,?)", (username,password))
		con.commit()
		print("register successfully!")
		insert = 'true'
	except:
		print("exist username")
		insert = 'false'
	con.close()
	return insert

#This try to login with username and password
@app.route('/login', methods=['POST', 'GET'])
def login():
	username = request.get_json()['username']
	password = request.get_json()['password']
	with sqlite3.connect("../database/dbs/userData.db") as db:
		cursor = db.cursor()
	find_user = ("SELECT * FROM users WHERE username = ? AND password = ?")
	cursor.execute(find_user, [(username), (password)])
	results = cursor.fetchall()
	if len(results) == 0:
		# If no result get, menas wrong password or wrong username
		return jsonify(status=400, message="Invalid Username or Wrong Password")
	else:
		# Otherwise return username
		return jsonify(status=200, username=results[0][0])

#'GET' will fetch user wathced list
#'POST' will insert a new record to the list
@app.route('/list/<userId>', methods=['POST','GET'])	
def movie_watched(userId):
	username = userId
	# If try to get watched list
	if request.method == 'GET':
		con = sqlite3.connect('../database/dbs/userData.db')
		cur = con.cursor()
		# Get all movie information
		querySentence = 'SELECT * FROM gallery WHERE username="'+username+'"'
		list_record = cur.execute(querySentence).fetchall()
		return jsonify(data=list_record)

	# If user try to add a new movie to list
	if request.method == 'POST':
		movieId = request.get_json()['movieId']
		watchdate = time.strftime("%Y-%m-%d")
		con = sqlite3.connect('../database/dbs/userData.db')
		mcon = sqlite3.connect('../database/dbs/movieInfo.db')
		cur = con.cursor()
		mcur = mcon.cursor()
		# First get the movie name
		querySentence = 'SELECT title FROM movies WHERE fpID = "' + movieId + '"'
		movieName = mcur.execute(querySentence).fetchall()[0][0]
		print(movieName)
		try: 
			cur.execute('INSERT INTO gallery VALUES (?,?,?,?,null)',(username, movieId, watchdate, movieName))
			con.commit()
			con.close()
			return jsonify(status=200)
		except:
			return jsonify(status=400)

# POST param with username and movieid and check if user watched movie
@app.route('/gallery', methods=['POST'])
def check_gallery():
	username = request.get_json()['username']
	movieId = request.get_json()['movieId']
	con = sqlite3.connect('../database/dbs/userData.db')
	cur = con.cursor()
	querySentence = 'SELECT * FROM gallery WHERE username=? AND fpid=?'
	cur.execute(querySentence, [(username), (movieId)])
	result = cur.fetchall()
	# If has record, then is watched
	if len(result) != 0:
		return jsonify(status=200)
	else:
		return jsonify(status=400)


if __name__ == '__main__':
	#app.run()
	app.run(debug = True)

