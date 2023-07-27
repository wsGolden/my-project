
/**
 * 文件上传
 *
 */

const modelName = 'File';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const FileSchema = new Schema({
    name: { type: String },
    path: { type: String },
  });

  return mongoose.model(modelName, FileSchema);
};
