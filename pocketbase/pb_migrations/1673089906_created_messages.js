migrate((db) => {
  const collection = new Collection({
    "id": "knrpqedfpni79mp",
    "created": "2023-01-07 11:11:46.311Z",
    "updated": "2023-01-07 11:11:46.311Z",
    "name": "messages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "skap3gii",
        "name": "text",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 160,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "haklgz5m",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "user = @request.auth.id",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("knrpqedfpni79mp");

  return dao.deleteCollection(collection);
})
