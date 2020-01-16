# Inspire

Inspire is a quote generator that allows you to pin your favorite quotes.

## Prerequisites

+  [VS Code](https:https://code.visualstudio.com/)
+  [Node.js](https://nodejs.org/en/)
+  [MongoDB](https://www.mongodb.com/)

## Installing

+ Setup database
	+ Open a Command Interpreter with Administrative privileges and run:
		> cd C:\Program Files\MongoDB\Server\4.2\bin
	+ Start the service
		> net start MongoDB
	+ Run MongoDB shell
		> mongo
	+ Create a database
		> use users
	+ Create a collection
		> db.createCollection('users')
	+ Connect to database
		+ Open config/keys.js
		+ Set mongoURI to 'mongodb://127.0.0.1/users'

+ Install dependencies
	+ Open a Command Interpreter with Administrative privileges and run:
		> cd path\to\inspire-master
	+ Install Node.js programs
		> npm i

## Deployment

+ Start the server
	> nodemon app.js

You now have a local copy running on http://127.0.0.1/