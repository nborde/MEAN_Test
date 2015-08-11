var Schema = mongoose.Schema;
// http://pixelhandler.com/posts/develop-a-restful-api-using-nodejs-with-express-and-mongoose

var Product = new Schema({
    title: {type: String, required:true},
    description: {type: String},
    style: {type: String},
    modified: {type: Date, default: Date.now()},
    category: {type: String},
    brand: {type: String}
});

var ProductModel = mongoose.model('Product',Product);