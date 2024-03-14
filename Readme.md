Project Overview:

This project aims to create a simple AWS S3-like service using Node.js and Express.js and MongoDB as the Database. The service allows users to perform basic operations such as creating buckets, uploading objects to buckets, listing objects in buckets, and deleting objects from buckets. It also provides user authentication using JWT tokens.

Getting Started:

To get started with this project, follow these steps:

1. Clone the Repository:
https://github.com/dheerajpdrj/aws_s3_machinetask.git

2. Install Dependencies:
cd aws-s3-like-service
npm install

3. Set Up MongoDB:
Install MongoDB on your local machine if you haven't already.
Create a MongoDB database named aws-service.

4. Start the Server:
npm start







                                                API DOCUMENTATION


                                               Authentication Endpoints
                          -------------------------------------------------------

1. Register User
   Endpoint: POST /auth/register
   Description: Registers a new user.
   Request Body: {
   "username": "example_user",
   "password": "example_password"
   }
   Response:
   200 OK: User registered successfully.
   400 Bad Request: If the username already exists.
   500 Internal Server Error: If an unexpected error occurs.

Sample Usage:
POST http://localhost:3000/auth/register \
 -H "Content-Type: application/json" \
 -d '{"username": "example_user", "password": "example_password"}'

2. Login User
   Endpoint: POST /auth/login
   Description: Logs in an existing user.
   Request Body:
   {
   "username": "example_user",
   "password": "example_password"
   }

Response:
200 OK: Login successful. Returns JWT token.
401 Unauthorized: If authentication fails.
500 Internal Server Error: If an unexpected error occurs.

Sample Usage:
POST http://localhost:3000/auth/login \
 -H "Content-Type: application/json" \
 -d '{"username": "example_user", "password": "example_password"}'



                                               Bucket Endpoints
                          -------------------------------------------------------

1. Create Bucket
   Endpoint: POST /buckets/create
   Description: Creates a new bucket.
   Request Headers:
   Authorization: Bearer [JWT Token]

Request Body:
{
"name": "example_bucket"
}
Response:
201 Created: Bucket created successfully.
400 Bad Request: If the bucket name already exists.
401 Unauthorized: If authentication fails.
500 Internal Server Error: If an unexpected error occurs.

Sample Usage:
POST http://localhost:3000/buckets/create \
 -H "Authorization: Bearer [JWT Token]" \
 -H "Content-Type: application/json" \
 -d '{"name": "example_bucket"}'

2.  List Buckets
    Endpoint: GET /buckets/list
    Description: Lists all buckets owned by the authenticated user.

    Request Headers:
    Authorization: Bearer [JWT Token]

    Response:
    200 OK: Returns an array of bucket objects.
    401 Unauthorized: If authentication fails.
    500 Internal Server Error: If an unexpected error occurs.

    Sample Usage:
    GET http://localhost:3000/buckets/list \
     -H "Authorization: Bearer [JWT Token]"

                                                   Object Endpoints
                              -------------------------------------------------------

1.  Upload Object
    Endpoint: POST /objects/:bucketId
    Description: Uploads objects to a specified bucket.

    Request Headers:
    Authorization: Bearer [JWT Token]
    Request Body: (Multipart Form Data)
    Files: Object files to be uploaded

    Response:
    201 Created: Objects uploaded successfully.
    401 Unauthorized: If authentication fails.
    404 Not Found: If the specified bucket does not exist.
    500 Internal Server Error: If an unexpected error occurs.

    Sample Usage:
    POST http://localhost:3000/objects/:bucketId \
     -H "Authorization: Bearer [JWT Token]" \
     -F "files=@/path/to/file1.txt" \
     -F "files=@/path/to/file2.txt"

1.  List Objects
    Endpoint: GET /objects/:bucketId
    Description: Lists all objects in a specified bucket.
    Request Headers:
    Authorization: Bearer [JWT Token]
    Response:
    200 OK: Returns an array of object metadata.
    401 Unauthorized: If authentication fails.
    404 Not Found: If the specified bucket does not exist.
    500 Internal Server Error: If an unexpected error occurs.
    Sample Usage:
    GET http://localhost:3000/objects/:bucketId \
     -H "Authorization: Bearer [JWT Token]"

1.  Get Object
    Endpoint: GET /objects/:bucketId/:objectId
    Description: Retrieves details of a specific object in a bucket.
    Request Headers:
    Authorization: Bearer [JWT Token]

Response:
200 OK: Returns the object metadata.
401 Unauthorized: If authentication fails.
404 Not Found: If the specified bucket or object does not exist.
500 Internal Server Error: If an unexpected error occurs.

Sample Usage:
GET http://localhost:3000/objects/:bucketId/:objectId \
 -H "Authorization: Bearer [JWT Token]"



4. Delete Object
   Endpoint: DELETE /objects/:bucketId/:objectId
   Description: Deletes a specific object from a bucket.

Request Headers:
Authorization: Bearer [JWT Token]

Response:
200 OK: Object deleted successfully.
401 Unauthorized: If authentication fails.
404 Not Found: If the specified bucket or object does not exist.
500 Internal Server Error: If an unexpected error occurs.

Sample Usage:
DELETE http://localhost:3000/objects/:bucketId/:objectId \
 -H "Authorization: Bearer [JWT Token]"
