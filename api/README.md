List APIs
=========

These is the short hand examples of the list API.  Read the JSON spec for
details.

# TODO
1. `etag` / `if-match`.

# Common Fields
* `user`: Everything has a user.  Everything is prefixed by a user.

# Users

User ids are globally unique.  Choose wisely.

## (CreateOrUpdateUser) Create / Update a User.
```
PUT /20230311/users/{id}
{
   "id": "[id]",
   "name": "[name]",
   "email": "[email]
}

200 OK
```

# Lists

List Ids are unique for a user and are specified by the user.  They cannot be
changed, so choose wisely.  Or clone and delete.

## (CreateOrUpdateList) Create or Update List
```
PUT /20230311/lists/{user}/{id}
{
   "id": "[id]",
   "data": "[data]
}

200 OK
```

## (GetList) Get List
TODO: Pagination?
```
GET /20230311/lists/{user}/{id}

200 OK
{
   "user": "[user]",
   "id": "[id]",
   "data": "[data]",
   "elements": [
      { "id": "[id]", "value": "[value]" },
      ...
   ]
}
```

## (DeleteList) Delete List
```
DELETE /20230311/lists/{user}/{id}

200 OK
```

## (ListLists) List Lists
```
GET /20230311/lists/{user}

200 OK
{
   "user": "[user]",
   "lists": [
      { "id": "[id]" },
      ...
   ]
}
```

## (CloneList) Clone an existing list
```
POST /20230311/lists/{user}/{id}/actions/clone
{
   "newUser": "[user]", #optional
   "newId": "[id]",
}

200 OK
```

## (ListACL) Modify List ACLs
_Note: Need to come back to this.  For now, everything is just going to be
open._

# List Elements

Elements never exist independently of a list.  They only exist in one list at a
time.  They are created and managed in the context of an "owning" list.  Moving
an element from one list to another changes element ownership.

Element Ids are created by the system.

List element data should mostly be accessed via Views (deep gets).

## (CreateElement) Creates a new Element
* At End (default)
* At an Index
* After Element (by id)
* Before Element (by id)

Be sure you include a retry token for idempotency.
```
x-retry-token: [string]

POST /20230311/elements/{user}/{list}
{
   "data": "[data]"
   "index": "[index]" #int, optional
   "after": "[elementId]", #optional
   "before": "[elementId]", #optional
}

200 OK
{
   "user": "[userId]",
   "list": "[listId]",
   "id": "[id]",
   "data": "[data]",
   "previous": "[elementId]", #can be null
   "next": "[elementId]", #can be null
}
```

## (GetElement) Get an Element
```
GET /20230311/elements/{user}/{list}/{id}

200 OK
{
   "user": "[userId]",
   "list": "[listId]",
   "id": "[id]",
   "data": "[data]"
}
```

## (UpdateElement) Update List Element Data
```
PUT /20230311/elements/{user}/{list}/{id}
{
   "data": "[data]"
}

200 OK
```

## (MoveElement) Move an existing element
* At End (default)
* At an Index
* After Element (by id)
* Before Element (by id)
* List is optional
```
POST /20230311/elements/{user}/{list}/{id}/actions/move
{
   "index": "[index]" #int, optional
   "after": "[elementId]", #optional
   "before": "[elementId]", #optional
   "newUser": "[user]", #optional, must also have new list id
   "newListId": "[listId]", #optional, must also have new user
}

200 OK
```

## (DeleteElement) Remove an element from a list
```
DELETE /20230311/elements/{user}/{list}/{id}

200 OK
```

# Views

Views contain a list of references to Lists.  A List can be included in many
Views.  View Ids are unique per user and aren't changeable.  Choose wisely.
Or clone and delete.

## (CreateOrUpdateView) Create / Update a View
```
PUT /20230311/views/{user}/{id}
{
   "id": "[id]"
   "description": "[description]" #optional
   "lists": [
      {
         "user": "[user]", #optional, assumed same as path user if omitted
         "listId": "[listId]"
      },
      ...
   ]
}

200 OK
{
   "user": "[user]",
   "id": "[id]",
   "description": "[description]"
   "lists": [
      {
         "user": "[user]", #optional, assumed same as path user if omitted
         "listId": "[listId]"
      },
      ...
   ]
}
```

## (GetView) Get a View
```
GET /20230311/views/{user}/{id}

200 OK
{
   "user": "[user]",
   "id": "[id]",
   "description": "[description]"
   "lists": [
      {
         "user": "[user]", #optional, assumed same as path user if omitted
         "listId": "[listId]"
      },
      ...
   ]
}
```

## (DeleteView) Delete a View
```
DELETE /20230311/views/{user}/{id}

200 OK
```

## (AddListToView) Add a List to a View
* At End (default)
* At an Index
* After List (by id)
* Before List (by id)
```
PUT /20230311/views/{user}/{id}/lists/{listId}
{
   "index": "[index]" #int, optional
   "after": "[listId]", #optional
   "before": "[listId]" #optional
}

200 OK
```

## (RemoveListFromView) Remove a list from a View
```
DELETE /20230311/views/{user}/{id}/lists/{listId}

200 OK
```

## (MoveListInView) Move a List in a View
* At End (default)
* At an Index
* After List (by id)
* Before List (by id)
```
POST /20230311/views/{user}/{id}/lists/{listId}/actions/move
{
   "index": "[index]" #int, optional
   "after": "[listId]", #optional
   "before": "[listId]" #optional
}

200 OK
```

## (CloneView) Clones a View
```
POST /20230311/views/{user}/{id}/actions/clone
{
   "newUser": "[user]", #optional
   "newId": "[id]",
}

200 OK
```
