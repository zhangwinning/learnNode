/**
 * Created by zhangwenning on 17/6/23.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@localhost:27017/test1');


var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

require('./task.js').make(Schema, mongoose);
var Task = mongoose.model('Task');
var newTask = new Task({
    project: 'Starting new project'
    , description: 'New project in node'
});
newTask.save(function(err) {
    if (err) console.log('Error on saving');
});

mongoose.disconnect();