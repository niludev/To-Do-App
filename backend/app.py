from config import app
from models import db
from flask_migrate import Migrate
import routes

with app.app_context():
    print("running migrations")
    migrate = Migrate(app, db)

    print("listing registered routes:")
    for route in app.url_map.iter_rules():
        print("- [{method}]: {endpoint}\t{route}".format(
            method=route.methods,
            route=route.rule,
            endpoint=route.endpoint
        ))

if __name__ == '__main__':
    app.run(debug=True)