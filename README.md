# officehours

To build this app:

1. Fork and clone the repo!

2. Install Node.js 
  https://nodejs.org/

3. Open Terminal/iTerm and cd into the directory

4. Run the command "npm install"
  (npm is bundled with node and io.js)

5. Thats it!

Example Inputs and Outputs:

node tutor.js David_Model 1000 1500
  Added tutor David_Model available 10:00am to 3:00pm

node reserve.js Sam David_Model 1200 1300
  Scheduled Sam with David_Model from 12:00pm to 1:00pm

node reserve.js Moriarty David_Model 1500 1600
  David_Model is not available at the requested time

node reserve.js Moriarty David_Model 1130 1230
  David_Model already has a student during that time

node reserve.js Moriarty David_Model 1230 1245
  Tutoring sessions must be for at least half an hour

node reserve.js Zack David_Model 1000 1100
Scheduled Zack with David_Model from 10:00am to 11:00am

node schedule.js David_Model
  10:00am to 11:00am with Zack
  12:00pm to 1:00pm with Sam

node student.js Zack
  10:00am to 11:00am with David_Model
