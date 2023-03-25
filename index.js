const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.set("view engine", "ejs")

mongoose.connect("mongodb://localhost:27017/BCGov", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});



const productSchema = new mongoose.Schema({
    productId: {
      type: Number,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    productOwnerName: {
      type: String,
      required: true
    },
    developers: {
      type: [String],
      required: true
    },
    scrumMasterName: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    methodology: {
      type: String,
      required: true
    }
  });


  

const Product = mongoose.model("Product", productSchema);

app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });

app.get("/", function(req, res, next){
    res.sendFile(__dirname + "/index.html");
})

app.get("/get", async(req, res) => {
    const items = await Product.find({});
    res.json(items);
 })


app.listen(3000, function(){
    console.log("Server started on 3000");
})