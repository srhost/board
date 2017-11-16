// models.Post

var mongoose = require('mongoose');

// schema
var postSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        body: { type: String },
        createdAt: { type: Date, default:Date.now },
        updatedAt: { type: Date }
    }, 
    {
        toObject: { virtuals: true }
    }
);

// virtuals
postSchema.virtual('createdDate').get(function() {
    return getDate(this.createdAt);
});

postSchema.virtual('createdTime').get(function() {
    return getTime(this.createdAt);
});

postSchema.virtual('updatedDate').get(function() {
    return getDate(this.updatedAt);
});

postSchema.virtual('updatedTime').get(function() {
    return getTime(this.updatedAt);
});

// function
function getDate(dateObject) {
    if(dateObject instanceof Date)
    {
        return dateObject.getFullYear() + "-" + get2digits(dateObject.getMonth() + 1) + '-' + get2digits(dateObject.getDate());
    }
};

function getTime(dateObj) {
    if(dateObject instanceof Date)
    {
        return get2digits(dateObj.getHours()) + ':' + get2digits(dateObj.getMinutes()) + ':' + get2digits(dateObj.getSeconds());
    }
};

function get2digits(num) {
    return ('0' + num).slice(-2);
};