/**
 * Created by zhangwenning on 17/6/23.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@localhost:27017/test1');
var Schema = mongoose.Schema;
var schema = new Schema({
    name: {
        type: String,
        index: true,
        unique: true // Unique index. If you specify `unique: true`
    },
    year: Number
});
var Cat = mongoose.model('Cat1', schema);

var kitty = new Cat({name: '11111', year: "222"});
//https://stackoverflow.com/questions/27354834/mongoose-unique-true-not-work#
/*Cat.on('index', function (error, doc) {
    kitty.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('meow');
        }
        process.exit();
    });
});*/

//-------更新操作----------

//Cat.findOneAndUpdate({'year': '222221'}, {'$set': {'name': '311111'}}, {new: true, upsert: true}, (err, doc) => {
//    console.log(err, doc);
//    process.exit();
//});








