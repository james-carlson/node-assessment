//controllers in this file
var userData = require('./userData.json')

module.exports = {
    getAllUsers: function (req, res, next) {
        let result;
        if (req.query.age) {
            //loop through userData and return age < age of query
            result = userData.filter(user => user.age <= req.query.age)
            return res.status(200).send(result)

        } else if (req.query.lastname) {
            let result = [];
            var diff = userData.filter(user => user.last_name === req.query.lastname)
                // user.lastname === req.query.lastname ? results.push(user) : ()=>{} )
            return res.status(200).send(diff)

        } else if (req.query.email) {
            result = userData.filter(user => user.email === req.query.email)
            return res.status(200).send(result)

        } else if (req.query.favorites) {
            //UGLY CODE, refactor if time
            let answer = []
            let result = userData.filter(user => {
                // has favorite in their array
                let incl = false
                return user.favorites.map(favorite => {
                        console.log(favorite);
                        if (favorite === req.query.favorites){
                            incl = true 
                            answer.push(user)
                        } else {
                            incl = false
                        }
                        console.log(incl)
                        return incl
                    })
                })
            console.log(result.length)
            return res.status(200).send(answer)
        } else {
            // no query
            return res.status(200).send(userData)
        }
    },
    getUser: function(req, res, next){
        const userId = req.params.userId
        console.log(userId);
        let result = userData.filter( user => user.id == req.params.userId)
        if (result.length < 1) {
            return res.status(404).json(null)
        } else {
            return res.status(200).send(result[0])
        }
    },
    getAdmins: function(req, res, next){
        return res.status(200).send(userData.filter(user => user.type === "admin"))
    },
    getNonAdmins: function(req, res, next){
        return res.status(200).send(userData.filter(user => user.type !== "admin"))       
    },
    getAllUsersOfType: function(req, res, next){
        return res.status(200).send(userData.filter(user => user.type === req.params.userType))
    },
    updateUserInfo: function(req, res, next){
        console.log("req.body", req.body)
        let user = userData.filter( user => user.id == req.params.userId )
        console.log("user data pre-change", user[0]);
        for (key in user[0]) {
            user[0][key] = req.body[key]
        }
        console.log("after:", user)
        return res.status(200).send(userData)
        
    },
    newUser: function(req, res, next){
        console.log("req.body", req.body)
        let user = req.body;
        let iDs = [];
        userData.map(c => iDs.push(parseInt(c.id)))
        console.log(iDs);
        let nextId = Math.max(...iDs) + 1
        console.log(nextId)
        user.id = nextId
        userData.push(user)
        return res.status(200).send(userData)
    },
    deleteUser: function(req, res, next){
        userId = req.params.userId
        console.log(userId);
        newList = userData.filter(user => console.log(user.id != userId))
        console.log(newList.length);
        userData = newList
        console.log(userData.length)
        console.log(newList.length)
        return res.status(200).send(userData)
    }
}