const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error", function(e){ console.error(e); });

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

const schema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});
var Product = mongoose.model("Product", schema);

app.get('/products', async (req, res) => {
  console.log(req)
  const products = await Product.find();
  res.json(products)
});

app.post('/products', async (req, res) => {
  console.log(req)
  const product = await Product.create(req.body);
  res.status(201).json(product)
});
app.listen(3000, () => console.log("Listening on port 3000 ..."));
