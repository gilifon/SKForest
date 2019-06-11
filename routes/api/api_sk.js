const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const MongoClient = require("mongodb").MongoClient;
const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://sa:q1W2e3R4t5Y6@cluster0-1iw5l.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "skdb";



//get all sk list
router.get("/", (req, res) => {
  console.log("get all members");
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db(dbName).collection("members");
    collection
      .find({})
      .project({
        _id: 1,
        name: 1,
        name_heb: 1,
        callsign: 1,
        passaway_date: 1,
        birthday_date: 1
      })
      .toArray((err, items) => {
        res.json(items);
      });
    client.close();
    console.log("Closing client (inner)");
  });
  client.close();
  console.log("Closing client");
});

//get a page list of sk
router.get("/p/:pagesize/:pagenum", (req, res) => {
  console.log("get all members (pagination))");
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db(dbName).collection("members");
    collection
      .find({})
      .project({
        _id: 1,
        name: 1,
        name_heb: 1,
        callsign: 1,
        passaway_date: 1,
        birthday_date: 1
      })
      .skip(parseInt(req.params.pagesize) * parseInt(req.params.pagenum - 1))
      .limit(parseInt(req.params.pagesize))
      .toArray((err, items) => {
        res.json(items);
      });
    client.close();
    console.log("Closing client (inner)");
  });
  client.close();
  console.log("Closing client");
});

//get sk by callsign
router.get("/callsign/:callsign", (req, res) => {
  console.log("get members by callsign");
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("skdb").collection("members");
    collection
      .findOne({ callsign: { $regex: req.params.callsign, $options: "i" } })
      .then(p => {
        if (p) {
          res.json([p]);
        } else res.json([]);
      });
    client.close();
    console.log("Closing client (inner)");
  });
  client.close();
  console.log("Closing client");
});

//search
router.get("/:search_value", (req, res) => {
  console.log("get members by search value");
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("skdb").collection("members");
    collection
      .find({
        $or: [
          {
            name: {
              $regex: ".*" + req.params.search_value + ".*",
              $options: "i"
            }
          },
          {
            callsign: {
              $regex: ".*" + req.params.search_value + ".*",
              $options: "i"
            }
          },
          {
            passaway_date: {
              $regex: ".*" + req.params.search_value + ".*",
              $options: "i"
            }
          },
          {
            birthday_date: {
              $regex: ".*" + req.params.search_value + ".*",
              $options: "i"
            }
          }
        ]
      })
      .project({
        _id: 1,
        name: 1,
        name_heb: 1,
        callsign: 1,
        passaway_date: 1,
        birthday_date: 1
      })
      .toArray((err, items) => {
        res.json(items);
      });
    client.close();
    console.log("Closing client (inner)");
  });
  client.close();
  console.log("Closing client");
});

router.put("/", (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("skdb").collection("members");
    //collection.insertOne( { name: req.body.name, callsign: req.body.callsign, passaway_date: req.body.passaway_date } );
    collection.insertOne(req.body);
    client.close();
    console.log("Closing client (inner)");
    res.json({ done: true });
  });
  client.close();
  console.log("Closing client");
});

router.post("/mailservice", (req, res) => {
  console.log(req.body);
  let transporter = nodemailer.createTransport({
    host: "iarc.org",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "no-reply@iarc", // generated ethereal user
      pass: "qwe123!@#" // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  transporter.sendMail({
    from: '"IARC Messeging Service" <no-reply@iarc.org>', // sender address
    to: "gilifon@gmail.com", // list of receivers
    subject: "SK Forest Profile Update Request", // Subject line
    text: "Please update the following profiles:", // plain text body
    html: "<h1>4Z1KD</h1><p> change 2019 to 2099</p>" // html body
  }, (error,info)=>{
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });  
});

module.exports = router;
