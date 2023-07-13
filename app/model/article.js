/**
 * 用户信息
 *
 */

const modelName = 'Article';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const userSchema = new Schema({
    articleTitle: { 
      type: String,
    },
    articleDes: {
      type: String,
    },
    articleContent: {
      type: String,
    },
  }, {
    timestamps: {
      createdAt: 'createTime',
      updatedAt: 'updateTime',
    },
  });

  userSchema.statics.list = async ({ userName = '', nickName = '' }, sortData, skipData, limitData) => {
    return mongoose.model(modelName).aggregate([
      {
        $match: {
          ['articleTitle']: { $regex: userName, $options: "i" },
          ['articleDes']:
            { $regex: nickName, $options: "i" },
          ['articleContent']:
            { $regex: nickName, $options: "i" }
        }
      },
      {
        $sort: sortData
      },
      {
        $skip: skipData
      },
      {
        $limit: limitData
      }
    ]);
  };

  return mongoose.model(modelName, userSchema);
};
