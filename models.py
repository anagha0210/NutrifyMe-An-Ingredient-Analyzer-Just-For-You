from FoodRecommender import db,ma


# User Class/Model
class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100))
  email_address = db.Column(db.String(length=50), nullable=False, unique=True)
  password = db.Column(db.String(length=60), nullable=False)

  def __init__(self, name, email_address,password ):
    self.name = name
    self.email_address=email_address
    self.password=password

  def check_password_correction(self, attempted_password):
    return self.password== attempted_password

# User Schema
class UserSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'email_address', 'password')

# Init schema
user_schema = UserSchema()
users_schema = UserSchema(many=True)



# Ingredient Class/Model
class Ingredient(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100))
  # type would either be healthy or allergic
  type = db.Column(db.String(100))  

    # foreign key
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
    nullable=False)
  user = db.relationship('User',
    backref=db.backref('ingredients', lazy=True))
#   def __init__(self, name, email_address,password ):
#     self.name = name
#     self.email_address=email_address
#     self.password=password

# Product Schema
class IngredientSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name','type', 'user_id')

# Init schema
ingredient_schema = IngredientSchema()
ingredients_schema = IngredientSchema(many=True)

# Ingredient Schema
# class UserSchema(ma.Schema):
#   class Meta:
#     fields = ('id', 'name', 'email_address', 'password')

# # Init schema
# user_schema = UserSchema()
# users_schema = ProductSchema(many=True)







