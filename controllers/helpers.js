let login = (req, res, next) => {
  let user = req.body
  if (user.hasOwnProperty('username') && user.hasOwnProperty('password')) {
    let token = jwt.sign(user, secret)
    token = JSON.stringify(token)
    localStorage.setItem('token', token)
    res.json(token)
    console.log('User logged in')
  }
}

let logout = (req, res, next) => {
  if (req.user) {
    localStorage.removeItem('token')
    console.log('User logged out')
  }
}

module.exports = {
  login: login,
  logout: logout
}