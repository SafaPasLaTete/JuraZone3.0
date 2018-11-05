define({ "api": [
  {
    "type": "post",
    "url": "/messages",
    "title": "Create a new message",
    "name": "CreateMessage",
    "group": "Messages",
    "description": "<p>function to create a new message</p>",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Message",
            "description": "<p>the message that will be saved</p>"
          }
        ]
      }
    },
    "filename": "routes/messages.js",
    "groupTitle": "Messages",
    "parameter": {
      "fields": {
        "Body response": [
          {
            "group": "Body response",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of the message</p>"
          },
          {
            "group": "Body response",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>date of the creation (automatic)</p>"
          }
        ],
        "Body request": [
          {
            "group": "Body request",
            "type": "String",
            "optional": false,
            "field": "contenu",
            "description": "<p>Content of the message</p>"
          },
          {
            "group": "Body request",
            "type": "Number",
            "optional": false,
            "field": "posLatitude",
            "description": "<p>latitude of where the message was posted</p>"
          },
          {
            "group": "Body request",
            "type": "Number",
            "optional": false,
            "field": "posLongitude",
            "description": "<p>longitude of where the message was posted</p>"
          },
          {
            "group": "Body request",
            "type": "ObjectId",
            "optional": false,
            "field": "author",
            "description": "<p>author of the message (auto from the auth)</p>"
          },
          {
            "group": "Body request",
            "type": "ObjectId",
            "optional": false,
            "field": "theme",
            "description": "<p>theme of the message</p>"
          }
        ]
      }
    }
  },
  {
    "type": "delete",
    "url": "/messages",
    "title": "Delete a new message",
    "name": "DeleteMessage",
    "group": "Messages",
    "description": "<p>function to delete a new message</p>",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Sucess",
            "description": "<p>le message a été supprimé</p>"
          }
        ]
      }
    },
    "filename": "routes/messages.js",
    "groupTitle": "Messages",
    "parameter": {
      "fields": {
        "Body response": [
          {
            "group": "Body response",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of the message</p>"
          },
          {
            "group": "Body response",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>date of the creation (automatic)</p>"
          }
        ],
        "Body request": [
          {
            "group": "Body request",
            "type": "String",
            "optional": false,
            "field": "contenu",
            "description": "<p>Content of the message</p>"
          },
          {
            "group": "Body request",
            "type": "Number",
            "optional": false,
            "field": "posLatitude",
            "description": "<p>latitude of where the message was posted</p>"
          },
          {
            "group": "Body request",
            "type": "Number",
            "optional": false,
            "field": "posLongitude",
            "description": "<p>longitude of where the message was posted</p>"
          },
          {
            "group": "Body request",
            "type": "ObjectId",
            "optional": false,
            "field": "author",
            "description": "<p>author of the message (auto from the auth)</p>"
          },
          {
            "group": "Body request",
            "type": "ObjectId",
            "optional": false,
            "field": "theme",
            "description": "<p>theme of the message</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/messages",
    "title": "Get all the messages",
    "name": "GetMessages",
    "group": "Messages",
    "description": "<p>function to get all the messages (independant from theme)</p>",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Message",
            "description": "<p>the message that will be updated</p>"
          }
        ]
      }
    },
    "filename": "routes/messages.js",
    "groupTitle": "Messages",
    "parameter": {
      "fields": {
        "Body response": [
          {
            "group": "Body response",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of the message</p>"
          },
          {
            "group": "Body response",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>date of the creation (automatic)</p>"
          }
        ],
        "Body request": [
          {
            "group": "Body request",
            "type": "String",
            "optional": false,
            "field": "contenu",
            "description": "<p>Content of the message</p>"
          },
          {
            "group": "Body request",
            "type": "Number",
            "optional": false,
            "field": "posLatitude",
            "description": "<p>latitude of where the message was posted</p>"
          },
          {
            "group": "Body request",
            "type": "Number",
            "optional": false,
            "field": "posLongitude",
            "description": "<p>longitude of where the message was posted</p>"
          },
          {
            "group": "Body request",
            "type": "ObjectId",
            "optional": false,
            "field": "author",
            "description": "<p>author of the message (auto from the auth)</p>"
          },
          {
            "group": "Body request",
            "type": "ObjectId",
            "optional": false,
            "field": "theme",
            "description": "<p>theme of the message</p>"
          }
        ]
      }
    }
  }
] });
