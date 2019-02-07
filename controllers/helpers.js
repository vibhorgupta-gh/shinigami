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

let patch = (req, res, next ) => {
  let object = req.body.object
  let patch = req.body.patch
  res.json(object)
}

let thumbnail = (req, res, next) => {
  let url = req.body.url
  res.json(url)
}

let logout = (req, res, next) => {
  if (req.user) {
    localStorage.removeItem('token')
    console.log('User logged out')
  }
}

module.exports = {
  login: login,
  patch: patch,
  thumbnail: thumbnail,
  logout: logout
}