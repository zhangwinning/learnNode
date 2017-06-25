/**
 * Created by zhangwenning on 17/6/23.
 */
function make(Schema, mongoose) {

    var Tasks = new Schema({
        project: {
            type: String,
            unique: true,
            index: true
        },
        description: String
    });
    mongoose.model('Task', Tasks);
}
module.exports.make = make;