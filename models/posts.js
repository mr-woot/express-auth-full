const mongo = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongo.Schema;

const postsSchema = new Schema({
    headLine: {
        type: String,
        trim: true,
        maxlength: [140, "Too much in headline."],
        required: [true, "Are you mad? No headline."]
    },
    contentBody: {
        type: String,
        trim: true,
        maxlength: [600, "Too much in body."],
        required: [true, "You're so dumb. No body."]
    },
    bottomFooterHeadline: {
        type: String,
        trim: true,
        maxlength: [120, "Too much in bottom footer headline."],
        required: [true, "Are you sure, you're content writer? No bottom footer."]
    },
    tags: [String],
    postLink: {
        type: String,
        trim: true
    },
    source: {
        name: {
            type: String,
            trim: true
        },
        url: {
            type: String,
            trim: true
        }
    },
    image: {
        large: {
            type: String,
            trim: true
        },
        medium: {
            type: String,
            trim: true
        },
        small: {
            type: String,
            trim: true
        },
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    toBePublishedOn: {
        type: Date,
        default: null
    },
    // isDeleted: {
    //     type: Boolean,
    //     default: false
    // },
    author: {
        type: String,
        trim: true,
        default: "Deepali"
    }
}, {
    timestamps: true
});

/**
 * toJSON implementation
 */
postsSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        // ret.id = ret._id;
        // delete ret._id;
        delete ret.__v;
        return ret;
    }
};

postsSchema.plugin(mongoosePaginate);


module.exports = postsSchema;