const bcrypt = require(`bcryptjs`)
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
    const existing = bcrypt.compareSync(password, users[i].passwordHash)
        if (users[i].username === username && existing) {
          res.status(200).send(users[i])
          console.log(`Log in Successful`)
          return
        }
      }
      res.status(400).send("User not found.")
      
    },
    register: (req, res) => {
        console.log('Registering User')
        const {username, email, firstName, lastName, password} = req.body
        
        let salt = bcrypt.genSaltSync(5)
        
        const passwordHash =  bcrypt.hashSync(password, salt)
        
        const newUser =  {
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName,
          passwordHash: passwordHash,
         
        }
        
        users.push(newUser)
        console.log(users)
        // users.push(req.body)
        // console.log(req.body)
        let userDelete = {...newUser}
        delete userDelete.passwordHash
        res.status(200).send(userDelete)
    }
}