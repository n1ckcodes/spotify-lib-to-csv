# Spotify Lib To CSV

Quick script for backing up a spotify library. Output will create a JSON and CSV file of users spotify library with the following properties: song name, artist, date added to library.

This script requires setting up authorization code flow to obtain an access / refresh token for Spotify API access.

You can use the following repo https://github.com/n1ckcodes/web-api-auth-examples for examples on how to obtain a token.

After obtaining a token you will need to create a .env file and assign the token to the environment variable SPOTIFY_ACCESS_TOKEN.