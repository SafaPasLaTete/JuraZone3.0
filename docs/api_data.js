define({ "api": [  {    "type": "delete",    "url": "/themes/:id",    "title": "Delete a theme",    "name": "DeleteTheme",    "group": "Theme",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>id of the theme</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "Success",            "description": ""          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "\nSuccess",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/themes.js",    "groupTitle": "Theme"  },  {    "type": "get",    "url": "/theme/:id/nbrmessages",    "title": "Get all the messages of the theme",    "name": "GetAllMessageOfTheTheme",    "group": "Theme",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object[]",            "optional": false,            "field": "get",            "description": "<p>all the messages of the theme</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "\n\n[\n {\n     \"_id\": \"5bd71d35bfa4413f1bf573de\",\n     \"messagesCount\": 1\n }\n ]",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/themes.js",    "groupTitle": "Theme"  },  {    "type": "get",    "url": "/theme/:id/messages",    "title": "Get all the messages of the theme",    "name": "GetMessagesofthetheme",    "group": "Theme",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object[]",            "optional": false,            "field": "get",            "description": "<p>all the messages of the theme</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "\n\n[\n {\n     \"posLatitude\": 0,\n     \"posLongitude\": 0,\n     \"author\": \"5bd6ff7017f0773164f5b247\",\n     \"theme\": \"5bd71d35bfa4413f1bf573de\",\n     \"contenu\": \"Julien me fait peur!!!\",\n     \"position\": \"coucou\",\n     \"createdAt\": \"2018-10-29T15:19:44.304Z\",\n     \"id\": \"5bd725103ec2d43fda32a93f\"\n }\n ]",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/themes.js",    "groupTitle": "Theme"  },  {    "type": "get",    "url": "/themes",    "title": "Get all the themes",    "name": "GetThemes",    "group": "Theme",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>name of the Theme</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "image",            "description": "<p>image of the Theme</p>"          },          {            "group": "Parameter",            "type": "createdAt",            "optional": false,            "field": "createdAt",            "description": "<p>creation of the theme</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object[]",            "optional": false,            "field": "themes",            "description": ""          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "\n{\n    \"page\": 1,\n    \"pageSize\": 100,\n    \"total\": 3,\n    \"data\": [\n        {\n            \"createdAt\": \"2018-11-05T15:43:35.563Z\",\n            \"_id\": \"5bd6c3106d8f4938ee495579\",\n            \"name\": \"cinema\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5bd6d2d29f82be3a40b1feec\",\n            \"name\": \"sfgds\",\n            \"createdAt\": \"2018-10-29T09:28:50.447Z\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5bd71d35bfa4413f1bf573de\",\n            \"name\": \"series\",\n            \"createdAt\": \"2018-10-29T14:46:13.206Z\",\n            \"__v\": 0\n        }\n    ]\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/themes.js",    "groupTitle": "Theme"  },  {    "type": "get",    "url": "/:name",    "title": "Get a specific theme",    "name": "GetThemes",    "group": "Theme",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>name of a theme</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "theme",            "description": "<p>a specific theme in API</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "\n[\n {\n     \"createdAt\": \"2018-11-05T15:56:23.272Z\",\n     \"_id\": \"5bd6c3106d8f4938ee495579\",\n     \"name\": \"cinema\",\n     \"__v\": 0\n }\n ]",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/themes.js",    "groupTitle": "Theme"  },  {    "type": "post",    "url": "/themes",    "title": "Create a new theme",    "name": "PostTheme",    "group": "Theme",    "parameter": {      "fields": {        "Request body": [          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>name of the new theme</p>"          },          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "photo",            "description": "<p>photo of the new theme</p>"          }        ],        "Parameter": [          {            "group": "Parameter",            "type": "createdAt",            "optional": false,            "field": "createdAt",            "description": "<p>creation of the theme</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "theme",            "description": "<p>a new theme</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "\n{\n    \"_id\": \"5be070626c0eba32542f6698\",\n    \"name\": \"sport\",\n    \"createdAt\": \"2018-11-05T16:31:30.701Z\",\n    \"__v\": 0\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/themes.js",    "groupTitle": "Theme"  }] });
