# timestamp-microservice
FreeCodeCamp

Custom nodemon script 
  "kpnodemon": "npm run kill-port && nodemon index.js",
  "kill-port": "lsof -i tcp:3000 | awk 'NR!=1 {print $2}' | xargs kill -9 || true"
