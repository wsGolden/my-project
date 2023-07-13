const Controller = require('egg').Controller;

class UploadController extends Controller {

  async upload() {
    console.log(142142)

    const { ctx, app } = this;
    // ctx.logger.info('请求头参数：', ctx.request.header);
    // ctx.logger.info('请求体参数：', ctx.request.body);
    // 文件不存在则报错
    const stream = await ctx.getFileStream();

    // ctx.logger.info('发送数据', stream);
    // const file = ctx.request.file; // 获取上传的文件
    // const imageId = uuid.v4(); // 生成唯一的imageId
    // const filePath = `/path/to/your/folder/${imageId}.${file.filename.split('.').pop()}`; // 设置保存路径和文件名
    console.log(stream, 1212)

    try {
      await fs.promises.copyFile(file.filepath, filePath);
      console.log(imageId, 312)

      ctx.body = ctx.helper.jsonResult.success(imageId);
    } catch (err) {
      ctx.body = ctx.helper.jsonResult.error(err, 2);
    }
  }

}

module.exports = UploadController;
