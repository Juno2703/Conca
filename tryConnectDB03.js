
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

client.connect( (err, db) => {
  
    if (err) {
        console.log("Error: ", err);
        process.exit(0);
    }

    let data = { id: 6789, name: "Tu Aka" };
  
    db.db("Shop_2022_10").collection("customers").insert(data, 
        (err2, results) => {
            if (err2) {
                console.log("Error: ", err2);
            } else {
                console.log("Inserted DATA !!!");
                db.close();
            }
            process.exit(1);
        }
    );
  

});


