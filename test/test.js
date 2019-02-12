const fs = require('fs')
const chai = require('chai')
const chaiHttp = require('chai-http')
const promise = require('chai-as-promised')
const should = chai.should()
const path = require('path')
const server = require('../server.js')
const { token, patchJson, download, encodedThumbnail, resizeImage } = require('../controllers/helpers.js')
const { handleInvalidRequest } = require('../middleware/validator.js')

chai.use(chaiHttp)
chai.use(promise)

describe('Unit test', () => {
  it('token function works', done => {
    let username = 'shinigami'
    let password = 'shinigami'
    let jwtToken = token(username, password)
    jwtToken.should.be.an('string')
    jwtToken = token(username, null)
    should.equal(jwtToken, null)
    done()
  })

  it('patchJson function works', done => {
    let object = { foo: 'bar' }
    let patch = [{ op: 'add', path: '/baz', value: 'boo' }]
    let patchedObject = patchJson(object, patch)
    patchedObject.should.be.an('object')
    patchedObject.should.have.property('baz')
    patchedObject = patchJson(object, null)
    patchedObject.should.be.an('object')
    patchedObject.should.not.have.property('baz')
    done()
  })

  it('download function works', () => {
    let url = 'https://bit.ly/2E17Ncg'
    let downloadPath = path.join(__dirname, '../images', '/image.png')
    let thumbnailPath = path.join(__dirname, '../images', '/output.png')
    const data = download(url, downloadPath, thumbnailPath)
    return data.should.be.fulfilled
  })

  it('resizeImage function works', done => {
    let downloadPath = path.join(__dirname, '../images', '/image.png')
    let thumbnailPath = path.join(__dirname, '../images', '/output.png')
    let options = { width: 50, height: 50 }
    resizeImage(downloadPath, thumbnailPath, options)
    fs.readFile(thumbnailPath, done)
  })

  it('encodedThumbnail function works', done => {
    let imagePath = path.join(__dirname, '../images', '/test.png')
    let base64String = encodedThumbnail(imagePath)
    base64String.should.be.an('string')
    done()
  })
})

describe('Integration test', () => {
  let value = ''

  it('login route works', done => {
    let user = {
      username: 'shinigami',
      password: 'shinigami'
    }
    chai
      .request(server)
      .post('/login')
      .send(user)
      .end((req, res) => {
        res.status.should.be.equal(200)
        value = res.body.value
        value.should.be.an('string')
      })
    done()
  })

  it('login route returns 501 on invalid request', done => {
    let user = {
      password: 'shinigami'
    }
    chai
      .request(server)
      .post('/login')
      .send(user)
      .end((req, res) => {
        res.status.should.be.equal(501)
      })
    done()
  })

  it('patch route works', done => {
    let body = {
      object: { foo: 'bar' },
      patch: [{ op: 'add', path: '/baz', value: 'boo' }]
    }
    chai
      .request(server)
      .post('/patch')
      .send(body)
      .set('Authorization', `Bearer ${value}`)
      .end((req, res) => {
        res.status.should.be.equal(200)
        let value = res.body.value
        value.should.be.an('object')
      })
    done()
  })

  it('patch route returns 501 on invalid request', done => {
    let body = {
      patch: [{ op: 'add', path: '/baz', value: 'boo' }]
    }
    chai
      .request(server)
      .post('/patch')
      .send(body)
      .set('Authorization', `Bearer ${value}`)
      .end((req, res) => {
        res.status.should.be.equal(501)
      })
    done()
  })

  it('thumbnail route works', done => {
    let body = {
      url: 'https://bit.ly/2E17Ncg'
    }
    chai
      .request(server)
      .post('/thumbnail')
      .send(body)
      .set('Authorization', `Bearer ${value}`)
      .end((req, res) => {
        res.status.should.be.equal(200)
        let msg = res.body.msg
        let value = res.body.value
        msg.should.be.equal('success')
        value.should.be.an('string')
      })
    done()
  })

  it('thumbnail route returns 501 on invalid request', done => {
    let body = {}
    chai
      .request(server)
      .post('/thumbnail')
      .send(body)
      .set('Authorization', `Bearer ${value}`)
      .end((req, res) => {
        res.status.should.be.equal(501)
      })
    done()
  })
})

describe('Validator test', () => {
  let request = {
    body: {
      param: 'value'
    }
  }

  it('invalid requests are handled correctly', (done) => {
    let response = handleInvalidRequest(request, 'param')
    response.should.be.false
    response = handleInvalidRequest(request, 'parameter')
    response.should.not.be.false
    done()
  })

  it('401 response from /patch if authentication fails', done => {
    let body = {
      object: { foo: 'bar' },
      patch: [{ op: 'add', path: '/baz', value: 'boo' }]
    }
    chai
      .request(server)
      .post('/patch')
      .send(body)
      .end((req, res) => {
        res.status.should.be.equal(401)
      })
    done()
  })

  it('401 response from /thumbnail if authentication fails', done => {
    let body = {
      url: 'https://bit.ly/2E17Ncg'
    }
    chai
      .request(server)
      .post('/thumbnail')
      .send(body)
      .end((req, res) => {
        res.status.should.be.equal(401)
      })
    done()
  })
})
