// index.js
// where your node app starts

// https://github.com/syke9p3/timestamp-microservice

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});


const isInvalidDate = (dateParam) => {
  const date = new Date(dateParam);
  return date.toUTCString() === "Invalid Date"
}

const isUnix = (date) => {
  return new Date(+date).toUTCString() !== "Invalid Date"
}

app.get("/api/:date", function (req, res) {
  const dateParam = req.params.date;
  console.log(req.params.date);

  if (isInvalidDate(dateParam)) {
    if (isUnix(dateParam)) {

      console.log(new Date(+dateParam).getTime())

      return res.json({
        "unix": new Date(+dateParam).getTime(),
        "utc": new Date(+dateParam).toUTCString(),
      })
    }

    return res.json({
      "error": "Invalid Date"
    })

  }

  return res.json({
    "unix": new Date(dateParam).getTime(),
    "utc": new Date(dateParam).toUTCString(),
  })


});

app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  })
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
