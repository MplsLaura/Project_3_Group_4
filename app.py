#import dependencies

import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from flask import Flask, jsonify
#from flask_cors import CORS, cross_origin

#Database setup
engine = create_engine("sqlite:///Weather.db")

#reflect database and tables
Base=automap_base()
Base.prepare(autoload_with=engine)

inspector = inspect(engine)
print(inspector.get_table_names())
print(Base.classes.keys())
#Save references to tables
AnnualWinter = Base.classes.AnnualWeather




#Flask Setup
app = Flask(__name__)
CORS(app, support_credentials=True) 
#Flask Routes

@app.route("/")
def Home():
    return(
        f"Available API Routes:</br>"
        f"/api/v1.0/AnnualizedWeather</br>"
    )

@app.route("/api/v1.0/AnnualizedWeather")
def Winter():
    #create session
    session = Session(engine)    
    #query the data
    data = session.query(AnnualWinter.Season,AnnualWinter.AvgMaxTemp,AnnualWinter.AvgMinTemp,\
            AnnualWinter.TotalPrecip,AnnualWinter.TotalSnowfall,AnnualWinter.Total_Days_6in_Base,\
            AnnualWinter.MaxRolling5Year,AnnualWinter.MinRolling5Year).all()
    session.close()
    #Create empy list, then a for loop with an empty dict.  Append data to dictionary
    winter_data =[]
    for Season,AvgMaxTemp,AvgMinTemp,TotalPrecip,TotalSnowfall,Total_Days_6in_Bas,MaxRolling5Year,MinRolling5Year in data:
        winter_dict = {}
        winter_dict['Season'] = Season
        winter_dict['Avg Max Temp'] = AvgMaxTemp
        winter_data.append(winter_dict)
    return jsonify(winter_data)

    
if __name__ == '__main__':
    app.run(debug=True)