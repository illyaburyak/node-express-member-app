const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const members = require('./memebrs.js');

const app = express();

// HandleBars Middleware
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Home page Route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Member App',
    members,
  });
});

// Set static folder
// .use() -> we use when wanna include middleware.
app.use(express.static(path.join(__dirname, 'public')));

// members API routes
// put our route here, and we dont need it in another file
app.use('/api/members', require('./routes/api/members.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
