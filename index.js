const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors = require("cors");
const uuid = require('uuid');

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
      type: String,
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

 app.post("/postProduct", async(req, res) =>  {
    const id = uuid.v4();
    // await console.log(req.body);
    let productRequest = req.body
    productRequest.productId = id
    const newProduct = new Product(
        productRequest
 );
    await newProduct.save();
    res.json(req.body);
});

app.put('/putProduct/:id', async(req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json(product);
});

app.delete("/deleteProduct/:id", async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ success: true });
  });

app.listen(3000, function(){
    console.log("Server started on 3000");
})