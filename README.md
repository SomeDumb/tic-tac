# tic-tac

This project is a tic-tac-toe game that uses django for backend and React for frontend. 
It uses websocket to allow real-time game between two players.

To run this project go to main folder and install python dependencies.

```sh
cd tic-tac
pip install -r requirements.txt
```

Then migrate and run backend. 

```python
python manage.py migrate
python manage.py runserver
```

Now then the server is working you can go to frontend folder and install react dependencyes via

```sh
cd tic-tac-toe/frontend/
npm install
```
