const express = require('express'),
      bodyParser = require('body-parser')
    //   cors = require('cors');

const app = express();
const control = require('./usersCtrl');

app.use(bodyParser.json());

var port = 3000

app.listen(port, function() {
    console.log('running on ' + port)
})

app.get('/api/users', control.getAllUsers)
// app.get('/api/users/:userId', )
// app.get('/api/admins', )
// app.get('/api/nonadmins', )
// app.get('/api/user_type/:userType', )
// app.put('/api/users/:userId', )
// app.post('/api/users', )
// app.delete('/api/users/:userId')


