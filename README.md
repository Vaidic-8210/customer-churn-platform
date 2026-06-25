# Customer Churn Prediction Platform



A full-stack Machine Learning based web application that predicts customer churn and provides business insights through dashboards, analytics, and prediction history.



## Overview



Customer churn is one of the biggest business challenges. This platform allows companies to predict whether a customer is likely to leave and monitor customer retention through an interactive dashboard.



Users can enter customer details, generate churn predictions using an ML model, save results into a PostgreSQL database, and track insights in real time.



---



## Features



### Dashboard



* Live statistics from PostgreSQL

* Total predictions count

* High-risk customer tracking

* Average churn risk score

* Recent prediction activity



### Customer Churn Prediction



* Machine Learning based prediction

* Risk score generation

* Churn classification

* Risk category detection



### Prediction History



* Stores prediction records permanently

* Search customers

* Export history as CSV



### Analytics



* Live customer analytics

* Churn vs Retained overview

* Risk distribution

* Auto-updating metrics from database



### Database Integration



* PostgreSQL integration

* Persistent storage

* Real-time dashboard updates



---



## Project Structure



```text

customer-churn-platform

│

├── frontend/

│   └── public/

│       ├── index.html

│       ├── analytics.html

│       ├── history.html

│       ├── result.html

│       │

│       ├── css/

│       │   └── styles.css

│       │

│       ├── js/

│       │   └── common.js

│       │

│       └── assets/

│

├── backend/

│   ├── controllers/

│   ├── routes/

│   ├── server.js

│   └── db.js

│

├── ml-service/

│   ├── app.py

│   ├── train_model.py

│   ├── preprocess.py

│   ├── model/

│   └── dataset/```



---



## Tech Stack



### Frontend



* HTML

* CSS

* JavaScript



### Backend



* Node.js

* Express.js



### Machine Learning



* Python

* Scikit-learn

* Pandas



### Database



* PostgreSQL



---



## Installation



### Clone Repository



```bash

git clone https://github.com/Vaidic-8210/customer-churn-platform.git

```



### Backend



```bash

cd backend

npm install

node server.js

```



### ML Service



```bash

cd ml-service

pip install -r requirements.txt

python app.py

```



### Frontend



Open:



```text

frontend/public/index.html

```



using Live Server.



---



## Future Improvements



* CSV bulk upload

* User authentication

* Deployment

* Advanced analytics

* Real-time prediction monitoring



---



## Author



**Vaidic Paliwal**



Built as a full-stack Machine Learning project for learning and portfolio development. 
