const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../server.js')
const { token, patchJson, download } = require('../controllers/helpers.js')

chai.use(chaiHttp)

describe('Unit tests', () => {

  it('token function works', done => {
    let username = 'shinigami'
    let password = 'shinigami'
    const jwtToken = token(username, password)
    jwtToken.should.be.an('string')
    done()
  })

  it('patchJson function works', done => {
    let object = {foo: 'bar'}
    let patch = [{op: 'add', path: '/baz', value: 'boo'}]
    const patchedObject = patchJson(object, patch)
    patchedObject.should.be.an('object')
    patchedObject.should.have.property('baz')
    done()
  })

  it('download function works', async() => {
    let url = 'https://bit.ly/2E17Ncg'
    let downloadPath = __dirname + '/image.png'
    const data = await download(url, downloadPath)
    data.should.be.an('object')
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

  it('patch route works', done => {
    let body = {
      object: {foo: 'bar'},
      patch: [{op: 'add', path: '/baz', value: 'boo'}]
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
        msg.should.be.equal('success')
      })
      done()
  })

})