const fs = require('fs');
const path = require('path');
// const zlib = require('zlib'); // 文件压缩
// const sharp = require('sharp'); // 图像压缩
const Controller = require('egg').Controller;
const sendToWormhole = require('stream-wormhole');
const Jimp = require('jimp');
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
      let useSharp = true
      // 使用图片压缩
      const result = await new Promise((resolve, reject) => {
        if (useSharp) {
          // const chunks = []; // sharp方式

          // stream.on('data', (chunk) => {
          //   chunks.push(chunk);
          // });
          // stream.on('end', () => {
          //   const buffer = Buffer.concat(chunks);
          //   sharp(buffer)
          //     .resize(800)
          //     .toFile(filePath, (err) => {
          //       if (err) {
          //         reject(err);
          //       } else {
          //         console.log('图片处理完成！');
          //         resolve(filePath);
          //       }
          //     });
          // });

          // stream.on('error', (err) => {
          //   reject(err);
          // });
          const chunks = []; // jimp方式

          stream.on('data', (chunk) => {
            chunks.push(chunk);
          });
          stream.on('end', () => {
            const buffer = Buffer.concat(chunks);
            Jimp.read(buffer)
              .then(image => {
                // 调整图像大小并保存到文件
                return image.resize(600, Jimp.AUTO).quality(80).writeAsync(filePath);
              })
              .then(() => {
                console.log('图片处理完成！');
                resolve(filePath);
              })
              .catch(err => {
                reject(err);
              });
          });

          stream.on('error', (err) => {
            reject(err);
          });
        } else {
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
        }
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
