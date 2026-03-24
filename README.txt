TapToPlay Backend
Overview

This is the backend for the TapToPlay web app, which handles:

Storing and retrieving songs from MongoDB

Managing user data (registration, progress, favourites)

Serving song data to the frontend via a RESTful API

Seeding initial song data into the database

The backend is built with Node.js, Express, and MongoDB (via Mongoose).

Current Status

Server setup: Express server is running on http://localhost:5000

MongoDB connection: Configured with Mongoose, successfully connects to a MongoDB Atlas cluster

Routes implemented:

/songs → fetch songs from the database

/users → fetch and manage user data

Models:

Song.js – defines song schema (title, notes, metadata)

User.js – defines user schema (name, email, progress, favourites)

Seed script: seedSongs.js for inserting initial songs (needs to be run)

How to Run
1. Install dependencies

Open a terminal in the Backend folder:

npm install

This will install:

express

mongoose

cors

dotenv

2. Connect using connection string in mongo vscode terminal. User: TeamTapToPlay Password: TapToPlay

3. Start the server
node server.js

You should see:

Server running on http://localhost:5000
MongoDB connected!
4. Test the API

You can test endpoints with Postman or PowerShell:

Invoke-RestMethod -Method GET -Uri http://localhost:5000/songs

You should receive a JSON array of songs.

Next Steps / TODO

Seed the database: Run seedSongs.js to populate initial songs

Implement missing routes:

Add song creation, deletion, and update routes if needed

Add user registration, authentication, and progress tracking

Connect frontend:

Fetch real song data from /songs

Display user progress and favourites