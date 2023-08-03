
/**
 * 常量配置
 *
 */

const modelName = 'Countdata';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const countDataSchema = new Schema({
    title: { type: String },
    content: { type: String },
  });

  return mongoose.model(modelName, countDataSchema);
};
