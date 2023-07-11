/**
 * 用户信息
 *
 */

const modelName = 'User';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const userSchema = new Schema({
    userName: { // 用户名称
      type: String,
    },
    nickName: {
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
          ['userName']: { $regex: userName, $options: "i" },
          ['nickName']:
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
