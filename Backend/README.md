## Instructions:
------------

MongoDB must be `mongodb://localhost:27017/`
MongoDB base Walmart must be 'walmart'
So, the connection will go to `mongodb://localhost:27017/walmart`

Otherwise, before execute ´node server.js´ , the file server.js should be modify to the corresponding MongoDB URL.

## Code to Modify:
----------------------
```vim
+ mongoose.connect("mongodb://localhost:27017/walmart", { useNewUrlParser:true });
+ var db = mongoose.connection;
```
----------------------

Finally, execute `node server.js` the server will run on http://localhost:8080
