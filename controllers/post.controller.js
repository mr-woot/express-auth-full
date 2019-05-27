module.exports = () => {
    const models = require("../models");
    /**
     * Create post controller
     * @param {Object} postBody
     */
    const createPost = (postBody) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await models.Posts.create(postBody);
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Update post controller
     * @param {String} id
     * @param {Object} postBody
     */
    const updatePost = (id, postBody) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await models.Posts.update({
                    _id: id
                }, postBody);
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Delete post controller
     * @param {String} id
     */
    const deletePost = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await models.Posts.findOneAndDelete({
                    _id: id
                });
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Get post controller
     * @param {String} id Optional
     */
    const getPosts = (page) => {
        return new Promise(async (resolve, reject) => {
            try {
                page = page < 0 ? 0 : page;
                let response = await models.Posts.paginate({}, {
                    page,
                    offset: page * 10,
                    limit: 10,
                    sort: {
                        updatedAt: -1
                    }
                });
                response.docs = response.docs.filter((item) => {
                    return !item.isDeleted;
                })
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }

    return {
        createPost,
        deletePost,
        updatePost,
        getPosts
    };
};