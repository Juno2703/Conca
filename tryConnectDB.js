
const { MongoClient, ServerApiVersion } = require('mongodb');

const accUN = "user202210";
const accPW = "g51leZHfXqsJKH4f";
const dnsServer = "cluster0.azn5qeo.mongodb.net";
const dbName = "Shop_2022_10";

const uri = "mongodb+srv://"
+ accUN + ":" + accPW
+ "@" + dnsServer + "/" + dbName + "?retryWrites=true&w=majority";

const client = new MongoClient(uri, 
    { useNewUrlParser: true, 
        useUnifiedTopology: true, 
        serverApi: ServerApiVersion.v1 
    });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log(err);
  client.close();
});

console.log("... thay gi chua ?! ");
