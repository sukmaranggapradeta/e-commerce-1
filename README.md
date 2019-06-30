# E-Commerce-v2

### http://coffeeme.sukmaranggapradeta.com

### Register :

```sh
URL: http://coffeeme-server.sukmaranggapradeta.com/register
METHOD : POST
AUTHENTICATE: NO
AUTHORIZE: NO
REQUEST Data Input / req.body:
    {
        name: logan
        email: logan@gmail.com
        password: logan
    }
Response Status : 201 Created
    {
        "_id": "5d18dcefe23f381763a509a4",
        "name": "logan",
        "email": "logan@gmail.com",
        "password": "$2a$10$clcQ7SG.TPICBqYNGbdz5OV3iY.d8JsSXsb6TslXH0Edov3JOt6gi",
        "role": "customer",
        "__v": 0
    }
-----------------------------------------------------------------
IF Error
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
---------------------------------------------------------------
If email format wrong
Response Status : 400 Bad Request
    {
        "message": "User validation failed: email: Invalid format email"
    }
---------------------------------------------------------------
If email duplikat
Response Status : 400 Bad Request
    {
        "message": "User validation failed: email: Email is already registered"
    }
--------------------------------------------------------------
If name, email or password empty
Response Status : 400 Bad Request
{
    "message": "User validation failed: name: Name is required, email: Email is required, password: Password is required"
}
```


### Login :

```sh
URL: http://coffeeme-server.sukmaranggapradeta.com/login
METHOD : POST
AUTHENTICATE: NO
AUTHORIZE: NO
REQUEST Data Input / req.body:
    {
        email: logan@mail.com
        password: logan
    }
Response Status : 200 OK
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMThkY2VmZTIzZjM4MTc2M2E1MDlhNCIsImVtYWlsIjoibG9nYW5AZ21haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNTYxOTEwNjM4LCJleHAiOjE1NjE5OTcwMzh9.7EGuzhJXd2fu7C0_jVquBoscSFUDAUS9aY2OFpue68Q",
        "id": "5d18dcefe23f381763a509a4",
        "name": "logan",
        "email": "logan@gmail.com",
        "role": "customer"
    }
----------------------------------------------------------------
If Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
---------------------------------------------------------------
If email or password wrong:
Response Status : 400 Bad Request
   {
        "message": "email/password wrong!"
    }
```

### Create Product :

```sh
URL: http://coffeeme-server.sukmaranggapradeta.com/products
METHOD : POST
AUTHENTICATE: YES
AUTHORIZE ADMIN: YES
REQUEST: 
    DATA: 
    {
        name: "ES KOPI POKAT",
        description: "Expresso dan Alpukat ditambah es krim cokelat",
        price: 28000,
        image_url: <image_url>,
        stock: 100
    }
    HEADERS: 
    {
        token: <token from login>
    }
-----------------------------------------------------------------
Response Status : 201 Created
    {
        "_id": "5cd767ebaaa5a74b2da055fc",
        name: "ES KOPI POKAT",
        description: "Expresso dan Alpukat ditambah es krim cokelat",
        price: 28000,
        image_url: <image_url>,
        stock: 100
    }
-----------------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF Not Login or Token Wrong:
Response Status : 401
    {
        "message": "Unauthenticated user"
    }
-----------------------------------------------------------------
IF Not admin
Response Status : 401 Unauthorized
    {
        "message": "You dont have access"
    }
-----------------------------------------------------------------
IF data empty:
Response Status : 400 Bad Request
{
    "Product validation failed: 
        name: name is required, 
        description: description is required, 
        price: price is required, 
        image_url: image_url is required,
        stock: stock is required"
}
```

### Get Products :

```sh
URL: http://coffeeme-server.sukmaranggapradeta.com/products
METHOD : GET
AUTHENTICATE: YES
AUTHORIZE: NO
HEADERS: 
{
    token: <token from login>  
}

Response Status : 200 OK
[
    {
        "_id": "5cd767ebaaa5a74b2da055fc",
        name: "ES KOPI POKAT",
        description: "Expresso dan Alpukat ditambah es krim cokelat",
        price: 28000,
        image_url: <image_url>,
        stock: 100
    },
    {...}, {...}
]
-----------------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF Not Login or Token Wrong:
Response Status : 401
    {
        "message": "Unauthenticated user"
    }
```

### Update Product :

```sh
URL: http://coffeeme-server.sukmaranggapradeta.com/products/:productID
Example: http://coffeeme-server.sukmaranggapradeta.com/products/5d0662198b95571482f7230a
AUTHENTICATE: YES
AUTHORIZE ADMIN: YES
METHOD : PUT
HEADERS: 
{
    token: <token from login>  
}
DATA: 
{
    <field>: <value>
}
Response Status : 200 OK
----------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF No Token or Token Wrong:
Response Status : 401
    {
        "message": "Unauthenticated user"
    }
-----------------------------------------------------------------
IF not the admin:
Response Status : 401 Unauthorize
    {
        "message": "You dont have access"
    }
```

### Delete Product :

```sh
URL: http://coffeeme-server.sukmaranggapradeta.com/products/:productID
EXAMPLE: http://coffeeme-server.sukmaranggapradeta.com/products/5d0662198b95571482f7230a
AUTHENTICATE: YES
AUTHORIZE ADMIN: YES
METHOD : DELETE
HEADERS: 
{
    token: <token form login>   
}

Response Status : 200 OK
{
    <deleted data>
}
-----------------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF Token empty or wrong:
Response Status : 401 Unauthenticated
    {
        "message": "Unauthenticated user"
    }
-----------------------------------------------------------------
IF not the admin:
Response Status : 401 Unauthorize
    {
        "message": "You dont have access"
    }
```


### Get Carts :

```sh
URL: http://coffeeme-server.sukmaranggapradeta.com/products
METHOD : GET
AUTHENTICATE: YES
AUTHORIZE: YES
HEADERS: 
{
    token: <token from login>  
}

Response Status : 200 OK
[
    {<data cart>},
    {...}, {...}
]
-----------------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF Not Login or Token Wrong:
Response Status : 401
    {
        "message": "Unauthenticated user"
    }
```


### Create Carts :

```sh
URL: http://coffeeme-server.sukmaranggapradeta.com/products
METHOD : POST
AUTHENTICATE: YES
AUTHORIZE: NO
HEADERS: 
    {
        token: <token from login>  
    }
DATA BODY: 
    {
        <productID>,
        <quantity>,
        <customerID>
    }
Response Status : 201 OK
[
    {<data cart>},
    {...}, {...}
]
-----------------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF Not Login or Token Wrong:
Response Status : 401
    {
        "message": "Unauthenticated user"
    }
```


### Update Cart :

```sh
URL: http://coffeeme-server.sukmaranggapradeta.com/carts/:cartID
Example: http://coffeeme-server.sukmaranggapradeta.com/carts/5d0662198b95571482f7230a
AUTHENTICATE: YES
AUTHORIZE : YES
METHOD : PUT
HEADERS: 
{
    token: <token from login>  
}
DATA: 
{
    <field>: <value>
}
Response Status : 200 OK
----------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF No Token or Token Wrong:
Response Status : 401
    {
        "message": "Unauthenticated user"
    }
-----------------------------------------------------------------
IF not the owner:
Response Status : 401 Unauthorize
    {
        "message": "You dont have access"
    }
```


### Delete Cart :

```sh
URL: http://coffeeme-server.sukmaranggapradeta.com/carts/:cartID
EXAMPLE: http://coffeeme-server.sukmaranggapradeta.com/carts/5d0662198b95571482f7230a
AUTHENTICATE: YES
AUTHORIZE: YES
METHOD : DELETE
HEADERS: 
{
    token: <token form login>   
}

Response Status : 200 OK
{
    <deleted data>
}
-----------------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF Token empty or wrong:
Response Status : 401 Unauthenticated
    {
        "message": "Unauthenticated user"
    }
-----------------------------------------------------------------
IF not the owner:
Response Status : 401 Unauthorize
    {
        "message": "You dont have access"
    }
```


### Get All Transaction :

```sh
URL: http://coffeeme-server.sukmaranggapradeta.com/transactions
METHOD : GET
AUTHENTICATE: YES
AUTHORIZE: NO
HEADERS: 
{
    token: <token from login>  
}

Response Status : 200 OK
[
    {<data transaction>},
    {...}, {...}
]
-----------------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF Not Login or Token Wrong:
Response Status : 401
    {
        "message": "Unauthenticated user"
    }
```


### Get My Transaction :

```sh
URL: http://coffeeme-server.sukmaranggapradeta.com/transactions/:customerID
METHOD : GET
AUTHENTICATE: YES
AUTHORIZE: NO
HEADERS: 
{
    token: <token from login>  
}

Response Status : 200 OK
[
    {<data transaction>},
    {...}, {...}
]
-----------------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF Not Login or Token Wrong:
Response Status : 401
    {
        "message": "Unauthenticated user"
    }
```

### Create Transaction :

```sh
URL: http://coffeeme-server.sukmaranggapradeta.com/transactions
METHOD : POST
AUTHENTICATE: YES
AUTHORIZE: NO
HEADERS: 
    {
        token: <token from login>  
    }
DATA BODY: 
    {
        <cartItem>,
        <customerID>,
        <total>,
        <status>,
        <address>,
        <phone>
    }
Response Status : 201 OK
[
    {<data transaction>},
    {...}, {...}
]
-----------------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF Not Login or Token Wrong:
Response Status : 401
    {
        "message": "Unauthenticated user"
    }
```


### Update Status Transaction from admin  :

```sh
URL: http://coffeeme-server.sukmaranggapradeta.com/transactions/admin/:transactionID
Example: http://coffeeme-server.sukmaranggapradeta.com/transactions/admin/5d0662198b95571482f7230a
AUTHENTICATE: YES
AUTHORIZE ADMIN: YES
METHOD : PUT
HEADERS: 
{
    token: <token from login>  
}
DATA: 
{
    status: 'PESANAN DIKIRIM'
}
Response Status : 200 OK
----------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF No Token or Token Wrong:
Response Status : 401
    {
        "message": "Unauthenticated user"
    }
-----------------------------------------------------------------
IF not admin:
Response Status : 401 Unauthorize
    {
        "message": "You dont have access"
    }
```

### Update Status Transaction from customer  :

```sh
URL: http://coffeeme-server.sukmaranggapradeta.com/transactions/customer/:transactionID
Example: http://coffeeme-server.sukmaranggapradeta.com/transactions/customer/5d0662198b95571482f7230a
AUTHENTICATE: YES
AUTHORIZE CUSTOMER: YES
METHOD : PUT
HEADERS: 
{
    token: <token from login>  
}
DATA: 
{
    status: 'PESANAN SELESAI'
}
Response Status : 200 OK
----------------------------------------------------------
IF Error:
Response Status : 500
    {
        "message": "Internal Server Error!"
    }
-----------------------------------------------------------------
IF No Token or Token Wrong:
Response Status : 401
    {
        "message": "Unauthenticated user"
    }
-----------------------------------------------------------------
IF not the owner:
Response Status : 401 Unauthorize
    {
        "message": "You dont have access"
    }
```
