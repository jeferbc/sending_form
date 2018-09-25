const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error", function(e){ console.error(e); });

app.use(express.urlencoded());

const schema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});
var Product = mongoose.model("Product", schema);

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products)
});

app.listen(3000, () => console.log("Listening on port 3000 ..."));
