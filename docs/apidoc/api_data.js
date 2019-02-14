define({ "api": [  {    "type": "post",    "url": "/login",    "title": "- stateless jwt login",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "msg",            "description": "<ul> <li>success message</li> </ul>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "value",            "description": "<ul> <li>jwt token</li> </ul>"          }        ]      },      "examples": [        {          "title": "Success",          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": \"success\",\n  \"value\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaW5pZ2FtaSIsImlhdCI6MTU0OTkwNjg5MSwiZXhwIjoxNTQ5OTA2OTExfQ.VRW_Lqdb8roNu6TWH3AE63I3ZF4BogYj2_uv_h1m_Kk\"\n}",          "type": "JSON"        }      ]    },    "error": {      "examples": [        {          "title": "Error",          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"msg\": \"failure\"\n}",          "type": "JSON"        }      ]    },    "version": "0.0.0",    "filename": "routes/route.js",    "group": "_Users_shinigami_Desktop_playground_test_routes_route_js",    "groupTitle": "_Users_shinigami_Desktop_playground_test_routes_route_js",    "name": "PostLogin"  },  {    "type": "post",    "url": "/patch",    "title": "- patch JSON object",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "msg",            "description": "<ul> <li>success message</li> </ul>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "value",            "description": "<ul> <li>patched JSON object</li> </ul>"          }        ]      },      "examples": [        {          "title": "Success",          "content": "   HTTP/1.1 200 OK\n {\n    \"msg\": \"success\",\n    \"value\": {\n        \"foo\": \"bar\",\n        \"baz\": \"boo\"\n    }\n}",          "type": "JSON"        }      ]    },    "error": {      "examples": [        {          "title": "Error",          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"msg\": \"failure\"\n}",          "type": "JSON"        }      ]    },    "version": "0.0.0",    "filename": "routes/route.js",    "group": "_Users_shinigami_Desktop_playground_test_routes_route_js",    "groupTitle": "_Users_shinigami_Desktop_playground_test_routes_route_js",    "name": "PostPatch"  },  {    "type": "post",    "url": "/thumbnail",    "title": "- download image from path",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "msg",            "description": "<ul> <li>success message</li> </ul>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "value",            "description": "<ul> <li>base64 encoded thumbnail</li> </ul>"          }        ]      },      "examples": [        {          "title": "Success",          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": \"success\",\n  \"value\": \"<base64 encoding>\"\n}",          "type": "JSON"        }      ]    },    "error": {      "examples": [        {          "title": "Error",          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"msg\": \"failure\"\n}",          "type": "JSON"        }      ]    },    "version": "0.0.0",    "filename": "routes/route.js",    "group": "_Users_shinigami_Desktop_playground_test_routes_route_js",    "groupTitle": "_Users_shinigami_Desktop_playground_test_routes_route_js",    "name": "PostThumbnail"  }] });
