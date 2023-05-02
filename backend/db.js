const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://FoodPanda:XfcBAQX4d0WEd86T@cluster0.klyxuv6.mongodb.net/foodPandaMERN?retryWrites=true&w=majority';
const mongoURI = "mongodb://FoodPanda:XfcBAQX4d0WEd86T@ac-qbskntr-shard-00-00.klyxuv6.mongodb.net:27017,ac-qbskntr-shard-00-01.klyxuv6.mongodb.net:27017,ac-qbskntr-shard-00-02.klyxuv6.mongodb.net:27017/foodPandaMERN?ssl=true&replicaSet=atlas-1ztpxf-shard-0&authSource=admin&retryWrites=true&w=majority"
const mongoDB = async ()=>{
    await mongoose.connect(mongoURI,{useNewUrlParser: true},async (err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            // we are fetching categories inside the food items so as to have  multiple
            //  scope of call for the data data can refer both food_items and food_category
            fetched_data.find({}).toArray(async function(err, data){
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function(err,catData){
                    if(err) console.log(err);
                    else{
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })
            })
        }
    });
}


module.exports = mongoDB;




