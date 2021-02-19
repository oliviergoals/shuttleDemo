const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
var visionRouter = require("./routes/vision");

//Load route files here
//Default index file, can be removed
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//const meta = mongoose.createConnection(mongoURIMeta, {useNewUrlParser: true})
// const logs = mongoose.createConnection(mongoURILogs,{useNewUrlParser: true}).then(() => console.log('MongoDB Log Connected...'))
// .catch(err => console.log);

//Use routes here
app.use('/vision', visionRouter);
const port = process.env.PORT || 8080;


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

