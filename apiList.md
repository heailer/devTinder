# devTinder api routes

## Auth router

- POST/signUp
- POST/logIn
- POST/logOut

## profileRouter

- GET/profile/view
- PATCH/profile/edit
- PATCH/profile/password

## connectionRequestRouter

- POST/request/send/:status/:userId
- POST/request/review/:status/:requestId

## userRouter

- GET/user/connections
- GET/user/pendingRequests
- GET/user/feed

status - ignore,intrested,accepted rejected
