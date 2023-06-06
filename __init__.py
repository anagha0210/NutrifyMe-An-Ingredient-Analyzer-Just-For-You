from flask import Flask
from flask_sqlalchemy import SQLAlchemy
#from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_marshmallow import Marshmallow 
import os

# from flask_login import LoginManager

app = Flask(__name__)
CORS(app)
# setting database connection 
basedir = os.path.abspath(os.path.dirname(__file__))
# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Init db

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///twitter.db'
# app.config['SECRET_KEY'] = 'ec9439cfc6c796ae2029594d'
db = SQLAlchemy(app)

# Init ma
ma = Marshmallow(app)

# login_manager = LoginManager(app)
# login_manager.login_view = "login_page"
# login_manager.login_message_category = "info"
from FoodRecommender import routes