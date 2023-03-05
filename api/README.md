List APIs
=========

These is the short hand examples of the list API.  Read the JSON spec for
details.

# Common Fields
* `owner`: Everything has an owner.  Everything is prefixed by an owner.

# Owners

## (CreateOwner)
```
POST /owners/{id}
{
   "id": "[id]",
   "name": "[name]",
   "email": "[email]
}

200 OK
```

# Lists

## (CreateList) Create List
```
POST /lists/{owner}/{id}
{
   "id": "[id]"
}

200 OK
```

## (GetList) Get List
```
GET /lists/{owner}/{id}

{
   "owner": "[owner]",
   "id": "[id]",
   "elements": [
      { "id": "[id]", "value": "[value]" },
      ...
   ]
}
```

## (DeleteList) Delete List
```
DELETE /lists/{owner}/{id}

200 OK
```

## (ListLists) List Lists
```
GET /lists/{owner}

{
   "owner": "[owner]",
   "lists": [
      { "id": "[id]" },
      ...
   ]
}
```

## (CloneList) Clone an existing list
```
POST /lists/{owner}/{id}
{
   "newOwner": "[owner]",
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

List element data should mostly be accessed via Views (deep gets).

## (CreateElement) Creates a new Element
* At End (default)
* At an Index
* After Element (by id)
* Before Element (by id)
```
POST /elements/{owner}/{list}
{
   "data": "[data]"
   "index": "[index]" #int, optional
   "after": "[element_id]", #optional
   "before": "[element_id]", #optional
}

{
   "owner": "[owner_id]",
   "list": "[list_id]",
   "id": "[id]",
   "data": "[data]",
   "previous": "[element_id]", #can be null
   "next": "[element_id]", #can be null
}
```

## (GetElement) Get an Element
```
GET /elements/{owner}/{list}/{id}

{
   "owner": "[owner_id]",
   "list": "[list_id]",
   "id": "[id]",
   "data": "[data]"
}
```

## (UpdateElement) Update List Element Data
```
PUT /elements/{owner}/{list}/{id}
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
POST /elements/{owner}/{list}/{id}
{
   "index": "[index]" #int, optional
   "after": "[element_id]", #optional
   "before": "[element_id]", #optional
   "newOwner": "[owner]", #optional, must also have new list id
   "newListId": "[list_id]", #optional, must also have new owner
}

200 OK
```

## (DeleteElement) Remove an element from a list
```
DELETE /elements/{owner}/{list}/{id}

200 OK
```

# Views

Views contain a list of references to Lists.  A List can be included in many
Views.

## (CreateView) Create a View
```
POST /views/{owner}/{id}
{
   "id": "[id]"
   "description": "[description]" #optional
   "lists": [
      {
         "owner": "[owner]", #optional, assumed same as path owner if omitted
         "list_id": "[list_id]"
      },
      ...
   ]
}

{
   "owner": "[owner]",
   "id": "[id]",
   "description": "[description]"
   "lists": [
      {
         "owner": "[owner]", #optional, assumed same as path owner if omitted
         "list_id": "[list_id]"
      },
      ...
   ]
}
```

## (GetView) Get a View
```
GET /views/{owner}/{id}

{
   "owner": "[owner]",
   "id": "[id]",
   "description": "[description]"
   "lists": [
      {
         "owner": "[owner]", #optional, assumed same as path owner if omitted
         "list_id": "[list_id]"
      },
      ...
   ]
}
```

## (DeleteView) Delete a View
```
DELETE /views/{owner}/{id}

200 OK
```

## (AddListToView) Add a List to a View
* At End (default)
* At an Index
* After List (by id)
* Before List (by id)

## (RemoveListFromView) Remove a list from a View

## (MoveListInView) Move a List in a View
* At End (default)
* At an Index
* After List (by id)
* Before List (by id)

## (CloneView) Clones a View
