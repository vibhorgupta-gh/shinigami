## Shinigami
A stateless microservice built with Node.js

#### Functionalities
 - Login stateless users
 - Patch JSON objects
 - Download images and return 50x50 thumbnails

 #### APIs

  - `/login`
    - method: `POST`
    - request body:
      ```
      {
      	username: <your-username>,
      	password: <your-password>
      }
      ```
    - response object:
      ```
      {
          msg: "success",
          value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaW5pZ2FtaSIsImlhdCI6MTU0OTk1NzE4NCwiZXhwIjoxNTQ5OTU3MjA0fQ.187znPAxy6mrfqXqWiKINWxAobsWNMWjSP2mBBUlGs8"
      }
      ```

  - `/patch`
    - method: `POST`
    - request body:
      ```
      {
      	object: {"foo": "bar"},
      	patch: [{"op": "add", "path": "/baz", "value": "boo"}]
      }

      ```
    - response object:
      ```
      {
          msg: "success",
          value: {
              "foo": "bar",
              "baz": "boo"
          }
      }
      ```

  - `/thumbnail`
    - method: `POST`
    - request body:
      ```
      {
          url: <url-to-image>
      }

      ```
    - response object:
      ```
      {
          msg: "success",
          value: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78"
      }
      ```

  #### Usage

  -  For utilising the `/login` endpoint, you need to send content headers like so:
      ```
      Content-Type: application/json
      ```
  -  For utilising the `/patch` and `/thumbnail` endpoint, you need to send content headers and the authorization header. The token value is that obtained from the response object of the `/login` endpoint, like so:
      ```
      Content-Type: application/json
      Authorization: Bearer <your-jwt-token>
      ```

  #### Installation and Setup

  - To install the dependencies, navigate to project root and run `npm install`.

  - To run the server, run `npm run start`

  #### Testing

  - The application is fully unit tested and integration tested. To run tests, run `npm run test`.

  - Ensure that you do not already have a process running on port `4000` of your localhost. If you do, kill that process using `kill -9 <pid>`.

  - To generate a code coverage report, run `npm run test:report`. This project uses [nyc]() for codecov. Nyc is a beautiful package recommended by `istanbul` itself.

  - To run syntax and linting tests, run `npm run lint`. This project uses `eslint` for linting standards.


