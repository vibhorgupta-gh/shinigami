import { apply_patch } from 'jsonpatch'
import jwt from 'jsonwebtoken'

let login = (req, res) => {
  let { username, password } = req.body
  if (username && password) {
    let opts = {}
    opts.expiresIn = 10;
    let token = jwt.sign({ username }, 'secret', opts);
    return res.status(200).json({token: token, msg: 'success'})
  }
  return res.status(401).json({ msg: 'failed' })
}

let patch = (req, res) => {
  let object = req.body.object
  let patch = req.body.patch
  if (object && patch) {
    let patchedObject = apply_patch(object, patch)
    return res.status(200).json({result: patchedObject, msg: 'success'})
  }
  return res.status(401).json({ msg: 'failed' })
}

let thumbnail = (req, res) => {
  let url = req.body.url
  res.json(url)
}

module.exports = {
  login: login,
  patch: patch,
  thumbnail: thumbnail
}