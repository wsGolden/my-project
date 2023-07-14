const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const sendToWormhole = require('stream-wormhole');

const { v4: uuidv4, v1: uuidv1 } = require('uuid');

class FileController extends Controller {
  async upload() {
    const ctx = this.ctx;
    const { app } = this
    const imageId = ctx.request.query?.imageId || uuidv1() // 新增时创建uuid
    try {
      const stream = await ctx.getFileStream();
      const filename = `${imageId}.${stream.filename.split('.')[1]}`;
      const filePath = path.join(this.config.upload.dir, filename);

      if (!fs.existsSync(this.config.upload.dir)) {
        fs.mkdirSync(this.config.upload.dir);
      }
      const result = await new Promise((resolve, reject) => {
        // 创建文件写入流
        const remoteFileStrem = fs.createWriteStream(filePath)
        // 以管道方式写入流
        stream.pipe(remoteFileStrem)

        let errFlag
        // 监听error事件
        remoteFileStrem.on('error', err => {
          errFlag = true
          // 停止写入
          sendToWormhole(stream)
          remoteFileStrem.destroy()
          reject(err)
        })

        // 监听写入完成事件
        remoteFileStrem.on('finish', () => {
          if (errFlag) return
          resolve(filename)
        })
      })
      if (result) {
        const File = this.ctx.model.File;
        const fileData = {
          name: filename,
          path: filePath,
        };
        await File.create(fileData);
        ctx.body = ctx.helper.jsonResult.success(filename);

      }

    

    } catch (error) {
      console.error(error);
      ctx.body = 'An error occurred during file upload';

    }

  }
  async show() {
    const { ctx } = this;
    const filename = ctx.params.filename;
    const filePath = path.join(`public/upload`, filename);
    try {
      const fileStat = await fs.promises.stat(filePath); // 检查文件是否存在
      if (fileStat.isFile()) {
        ctx.response.set('content-type', 'image/png'); // 根据实际的文件类型设置 content-type
        ctx.body = fs.createReadStream(filePath);
      } else {
        ctx.status = 404;
        ctx.body = 'File Not Found';
      }
    } catch (err) {
      ctx.status = 404;
      ctx.body = 'File Not Found';
    }
  }
}

module.exports = FileController;
