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
app.get('/api/users/:userId', control.getUser)
app.get('/api/admins', control.getAdmins)
app.get('/api/nonadmins', control.getNonAdmins)
app.get('/api/user_type/:userType', control.getAllUsersOfType)
app.put('/api/users/:userId', control.updateUserInfo)
app.post('/api/users', control.newUser)
app.delete('/api/users/:userId', control.deleteUser)


