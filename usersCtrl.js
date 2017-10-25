//controllers in this file
var userData = require('./userData.json')

module.exports = {
    getAllUsers: function (req, res, next) {
        let result;
        if (req.query.age) {
            //loop through userData and return age < age of query
            result = userData.filter(user => user.age < req.query.age)

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
    }
}