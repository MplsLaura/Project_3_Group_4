# Project_3_Group_4
Climate change in the Twin Cities

We were interested in determining how climate change has affected Minnesota winters with regards to outdoor activities. These changes are acutely felt in Minnesota where winter activities (e.g., ice fishing, skiing, sledding, etc.) are an important of our culture and lifestyle. Due to these changes, these activities are at risk.

We used weather data from Kaggle that ranged from 1871 – 2020. We appended the data with data through April 9, 2023 from the Minnesota Department of Resources. Data includes min/max temperature, precipitation, snow, and current snow depth for the Twin Cities area, Minnesota.

Data cleaning: 
Filtered to include data only after 1900 (for completeness)
Changed “trace amounts” to 0

Data transformation: 
Added a season column in order to summarize data by Dec-Feb winter season
Created variable for snow cover

We used Python and Jupyter Notebook to prepare the data for the SQLite database. Then we used Javascript, HTML and CSS to create the data visualizations with Plotly js and Chart js.
