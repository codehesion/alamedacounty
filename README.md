# Alameda County Analysis
## Installation

### Requirements
You should have [node.js](https://nodejs.org) and [git](https://git-scm.com/) installed on your system.


### Clone Project
In your terminal/console clone the project by entering the following command:
```
git clone https://github.com/codehesion/alamedacounty.git
```

### Create Config File
The creation of a configuration file is necessary as the sensitive details such as database username, password and URI are stored in environment variables.  
Create the following file in /config/env.js :
``` JavaScript
// Database Configuration
process.env['DB_USERNAME'] = "<your db username>";
process.env['DB_PASSWORD'] = "<your db password>";
process.env['DB_URI'] = "<your db URI>";
```

### Run From Terminal/Console
Change directory to the project, install and launch:
```
cd alamedacounty
npm install
clear && node server
```

### Open In Browser
Open your browser and type in:
```
localhost:3000
```


