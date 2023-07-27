/**
 * 短文
 *
 */

const modelName = 'Article';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const articleSchema = new Schema({
    articleTitle: { 
      type: String,
    },
    articleDes: {
      type: String,
    },
    articleContent: {
      type: String,
    },
    articlePicId: {
      type: String,
    },
  }, {
    timestamps: {
      createdAt: 'createTime',
      updatedAt: 'updateTime',
    },
  });

  articleSchema.statics.list = async ({ articleTitle = '', articleDes = '', articleContent = '' }, sortData, skipData, limitData) => {
    return mongoose.model(modelName).aggregate([
      {
        $match: {
          ['articleTitle']: { $regex: articleTitle, $options: "i" },
          ['articleDes']:
            { $regex: articleDes, $options: "i" },
          ['articleContent']:
            { $regex: articleContent, $options: "i" }
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

  return mongoose.model(modelName, articleSchema);
};
