## It

# Airbuddy

## So, what is airbuddy?

Airbuddy is full-stack app (front-end: reactjs and scss, back-end: node-js and for databases and simple endpoint logging I had used mongodb)

## FAQ

Q: How does it communicate?
A: Back-end works as a middle-man or middleware between Weather API and ReactJS. It logs traffic, responds with a asked data and requests data to the Foreca Weather API.


## Requirements

 - You need to get api-key of "Foreca" can be done via rapidapi.com.
 - You need to import the key inside of .env file. (API_KEY="THERESHOULDGOYOURVALUE");
 - You as well need nodejs to run.


## How to start?

1: Clone this repo

2:
```npm install```
3:
```npm start```


You aswell have to change Weather/index.jsx and Results/indes.jsx axios requests urls to localhost ones

from :
```https://kipras.me/location/search/${query}```
to :
```http://localhost:3000/location/search/${query}```
