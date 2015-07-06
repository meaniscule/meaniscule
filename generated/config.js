// Replace the values below with your own configuration
var config = {
  "development": {
    "database": {
      "name": "default-dev",
      "hostName": "localhost",
      "port": "27017"
    },
    "server": {
      "port": "3000"
    }
  },
  "production": {
    "database": {
      "name": "default-production",
      "hostName": "localhost",
      "port": "27017"
    },
    "server": {
      "port": "3000"
    }
  }
}
module.exports = config[process.env.NODE_ENV || 'development'];
