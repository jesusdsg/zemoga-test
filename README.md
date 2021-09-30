# zemoga-test
Tech Test for Zemoga

Hi Guys! This time I have simplified the code a bit more, I have also implemented the connection to the backend through mongoDB.
Using Python, flask and CORS to set API requests.
The folder contains two main folders backend and frontend.

Backend:
Inside the Backend is the environment and methods for server-side execution with the python programming language.

Frontend: 
Inside frontend they are all in reactjs, also attached the backup json.

The instructions to run the server are simple:
Download and install the flask, together with cors if you don't have it with the command inside the backend folder: "pip install flask flask-PyMongo flask-cors"

Then inside the terminal (still in the backend folder) ". \ Venv \ Scripts \ activate.bat" to access the virtual environment.

Finally we will execute the app.py to start the connection with the database. "python src/app.py"

It should be clarified that it is necessary to have the mondoDB and the collection initialized within the database, however, I have attached a backup of mine, so that it is easier to import it, it is in the db folder.

In the same way I have generated routes to register collections, if necessary "http://localhost:5000/people" (http://localhost:5000 is the default port for mongoDB) To insert a new collection.

Finally, it would only be necessary to start the "npm start" inside the frontend folder
