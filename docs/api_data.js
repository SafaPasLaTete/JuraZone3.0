define({ "api": [
  {
    "type": "post",
    "url": "/users/signup",
    "title": "Create a user",
    "name": "CreateUser",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Registers a new user.</p>",
    "examples": [
      {
        "title": "Example",
        "content": "POST /users/signup HTTP/1.1\nContent-Type: application/json\n\n{\n  \"pseudo\": \"Test4\",\n  \"password\": \"motdepasse\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "201 Created",
          "content": "HTTP/1.1 201 Created\nContent-Type: application/json\nLocation: https://comem-webserv-2018-2019-c.herokuapp.com/\n\n{\n  \"_id\": \"5bd9d5104036f23c64408196\",\n  \"pseudo\": \"Test4\",\n  \"password\": \"$2b$10$5z03Ps7wwSI7Eoq.Xd6Xku5g.9cPd0DFmfWCr0NfG2gfTBiyKPxmG\",\n  \"creationAt\": \"2018-10-31 16:15:12.417\"\n  \"modificationAt\": \"2018-10-31 16:15:12.421\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Body response": [
          {
            "group": "Body response",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>A unique identifier</p>"
          },
          {
            "group": "Body response",
            "type": "String",
            "optional": false,
            "field": "pseudo",
            "description": "<p>The pseudo of the user</p>"
          },
          {
            "group": "Body response",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The password of the user</p>"
          },
          {
            "group": "Body response",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>The date at which the user was registered with default value Date.now</p>"
          },
          {
            "group": "Body response",
            "type": "Date",
            "optional": false,
            "field": "modificationAt",
            "description": "<p>The date at which the user was modified</p>"
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "User",
    "parameter": {
      "fields": {
        "Body request": [
          {
            "group": "Body request",
            "type": "String",
            "size": "/^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/",
            "optional": false,
            "field": "pseudo",
            "description": "<p>The pseudo of the user</p>"
          },
          {
            "group": "Body request",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The password of the user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "422/Unprocessable",
            "description": "<p>entity Datas are not correct</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "422 Unprocessable entity",
          "content": "HTTP/1.1 422 Unprocessable entity\nContent-Type: application/json\n\n{\n  \"message\": \"Datas not correct\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/users/:_id",
    "title": "Delete a user",
    "name": "DeleteUser",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Delete a user.</p>",
    "examples": [
      {
        "title": "Example",
        "content": "DELETE /users/1 HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User",
    "parameter": {
      "fields": {
        "URL path parameters": [
          {
            "group": "URL path parameters",
            "type": "Number",
            "optional": false,
            "field": "userid",
            "description": "<p>The unique identifier of the user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "422/Unprocessable",
            "description": "<p>entity Datas are not correct</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "403/Forbidden",
            "description": "<p>Datas are not find</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "422 Unprocessable entity",
          "content": "HTTP/1.1 422 Unprocessable entity\nContent-Type: text/plain",
          "type": "json"
        },
        {
          "title": "403 Forbidden Datas",
          "content": "HTTP/1.1 403 Unprocessable entity\nContent-Type: text/plain",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/users/signup",
    "title": "Login a user",
    "name": "LoginUser",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Login a user.</p>",
    "examples": [
      {
        "title": "Example",
        "content": "POST /users/signup HTTP/1.1\nContent-Type: application/json\n\n{\n  \"pseudo\": \"Test4\",\n  \"password\": \"motdepasse\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "202 Accepted",
          "content": "HTTP/1.1 202 Accepted\nContent-Type: application/json\nLocation: https://comem-webserv-2018-2019-c.herokuapp.com/\n\n{\n  \"_id\": \"5bd9d5104036f23c64408196\",\n  \"pseudo\": \"Test4\",\n  \"password\": \"$2b$10$5z03Ps7wwSI7Eoq.Xd6Xku5g.9cPd0DFmfWCr0NfG2gfTBiyKPxmG\",\n  \"creationAt\": \"2018-10-31 16:15:12.417\"\n  \"modificationAt\": \"2018-10-31 16:15:12.421\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Body response": [
          {
            "group": "Body response",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>A unique identifier</p>"
          },
          {
            "group": "Body response",
            "type": "String",
            "optional": false,
            "field": "pseudo",
            "description": "<p>The pseudo of the user</p>"
          },
          {
            "group": "Body response",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The password of the user</p>"
          },
          {
            "group": "Body response",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>The date at which the user was registered with default value Date.now</p>"
          },
          {
            "group": "Body response",
            "type": "Date",
            "optional": false,
            "field": "modificationAt",
            "description": "<p>The date at which the user was modified</p>"
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "User",
    "parameter": {
      "fields": {
        "Body request": [
          {
            "group": "Body request",
            "type": "String",
            "size": "/^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/",
            "optional": false,
            "field": "pseudo",
            "description": "<p>The pseudo of the user</p>"
          },
          {
            "group": "Body request",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The password of the user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "422/Unprocessable",
            "description": "<p>entity Datas are not correct</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p>Pseudo or password is missing</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "422 Unprocessable entity",
          "content": "HTTP/1.1 422 Unprocessable entity\nContent-Type: application/json\n\n{\n  \"message\": \"Datas not correct\"\n}",
          "type": "json"
        },
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\nContent-Type: application/json\n\n{\n  \"message\": \"Auth failed\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/users",
    "title": "List users",
    "name": "RetrieveUsers",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Retrieves a list of users sorted by userid.</p>",
    "examples": [
      {
        "title": "Example",
        "content": "GET /users HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\nLocation: https://comem-webserv-2018-2019-c.herokuapp.com/\n\n[\n  {\n    \"_id\": \"5bd72278b3357a0990ec5599\",\n    \"pseudo\": \"Test3\",\n    \"password\": \"$2b$10$nndUQLvYOC2qXzohIP3foO80uyzSGqUKRvc2CmPeuTsDvgeNKhzZG\",\n    \"creationAt\": \"2018-10-29 15:08:40.659\",\n    \"modificationAt\": \"2018-10-29 15:08:40.664\"\n  },\n  {\n    \"_id\": \"5bd9d5104036f23c64408196\",\n    \"pseudo\": \"Test4\",\n    \"password\": \"$2b$10$5z03Ps7wwSI7Eoq.Xd6Xku5g.9cPd0DFmfWCr0NfG2gfTBiyKPxmG\",\n    \"creationAt\": \"2018-10-31 16:15:12.417\",\n    \"modificationAt\": \"2018-10-31 16:15:12.421\"\n  }\n]",
          "type": "json"
        }
      ],
      "fields": {
        "Body response": [
          {
            "group": "Body response",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>A unique identifier</p>"
          },
          {
            "group": "Body response",
            "type": "String",
            "optional": false,
            "field": "pseudo",
            "description": "<p>The pseudo of the user</p>"
          },
          {
            "group": "Body response",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The password of the user</p>"
          },
          {
            "group": "Body response",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>The date at which the user was registered with default value Date.now</p>"
          },
          {
            "group": "Body response",
            "type": "Date",
            "optional": false,
            "field": "modificationAt",
            "description": "<p>The date at which the user was modified</p>"
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/users/_id",
    "title": "Update a user",
    "name": "UpdateUser",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Updates user's data</p>",
    "examples": [
      {
        "title": "Example",
        "content": "PATCH /users/1 HTTP/1.1\nContent-Type: application/json\n\n{\n  \"pseudo\": \"Test4\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  \"_id\": \"5bd9d5104036f23c64408196\",\n  \"pseudo\": \"Test4\",\n  \"password\": \"$2b$10$5z03Ps7wwSI7Eoq.Xd6Xku5g.9cPd0DFmfWCr0NfG2gfTBiyKPxmG\",\n  \"creationAt\": \"2018-10-31 16:15:12.417\"\n  \"modificationAt\": \"2018-10-31 16:15:12.421\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Body response": [
          {
            "group": "Body response",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>A unique identifier</p>"
          },
          {
            "group": "Body response",
            "type": "String",
            "optional": false,
            "field": "pseudo",
            "description": "<p>The pseudo of the user</p>"
          },
          {
            "group": "Body response",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The password of the user</p>"
          },
          {
            "group": "Body response",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>The date at which the user was registered with default value Date.now</p>"
          },
          {
            "group": "Body response",
            "type": "Date",
            "optional": false,
            "field": "modificationAt",
            "description": "<p>The date at which the user was modified</p>"
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "User",
    "parameter": {
      "fields": {
        "URL path parameters": [
          {
            "group": "URL path parameters",
            "type": "Number",
            "optional": false,
            "field": "userid",
            "description": "<p>The unique identifier of the user</p>"
          }
        ],
        "Body request": [
          {
            "group": "Body request",
            "type": "String",
            "size": "/^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/",
            "optional": false,
            "field": "pseudo",
            "description": "<p>The pseudo of the user</p>"
          },
          {
            "group": "Body request",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The password of the user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "422/Unprocessable",
            "description": "<p>entity Datas are not correct</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "403/Forbidden",
            "description": "<p>Datas are not find</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "422 Unprocessable entity",
          "content": "HTTP/1.1 422 Unprocessable entity\nContent-Type: text/plain",
          "type": "json"
        },
        {
          "title": "403 Forbidden Datas",
          "content": "HTTP/1.1 403 Unprocessable entity\nContent-Type: text/plain",
          "type": "json"
        },
        {
          "title": "422 Unprocessable entity",
          "content": "HTTP/1.1 422 Unprocessable entity\nContent-Type: application/json\n\n{\n  \"message\": \"Datas not correct\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
