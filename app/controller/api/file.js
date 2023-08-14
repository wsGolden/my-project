const fs = require('fs');
const path = require('path');
// const zlib = require('zlib'); // 文件压缩
// const sharp = require('sharp'); // 图像压缩
const Jimp = require('jimp');  // 图像压缩
const Controller = require('egg').Controller;
const sendToWormhole = require('stream-wormhole');
const { v4: uuidv4, v1: uuidv1 } = require('uuid');

class FileController extends Controller {
  async upload() {
    const ctx = this.ctx;
    const imageId = ctx.request.query?.imageId || uuidv1() // 新增时创建uuid
    try {
      const stream = await ctx.getFileStream();
      const filename = `${imageId}.${stream.filename.split('.')[1]}`;
      const filePath = path.join(this.config.upload.dir, filename);
      if (!fs.existsSync(this.config.upload.dir)) {
        fs.mkdirSync(this.config.upload.dir);
      }
      let compress = true
      // 使用图片压缩
      const result = await new Promise((resolve, reject) => {
        if (compress) {
          const chunks = []; // jimp方式

          stream.on('data', (chunk) => {
            chunks.push(chunk);
          });
          stream.on('end', async () => {
            const buffer = Buffer.concat(chunks);
            //   sharp(buffer) // sharp方式
            //     .resize(800)
            //     .toFile(filePath, (err) => {
            //       if (err) {
            //         reject(err);
            //       } else {
            //         console.log('图片处理完成！');
            //         resolve(filePath);
            //       }
            //     });
            try {
              const image = await Jimp.read(buffer)
              await image.resize(600, Jimp.AUTO).quality(80).writeAsync(filePath);
              resolve(filePath)
            } catch (jimpErr) {
              // console.error('Jimp处理失败:', jimpErr);

              try {
                // Jimp处理失败，将未压缩的图片数据写入文件
                await fs.promises.writeFile(filePath, buffer);
                console.log('未压缩的图片写入完成！');
                resolve(filePath);
              } catch (writeErr) {
                console.error('写入未压缩图片失败:', writeErr);
                reject(writeErr);
              }
            }
          });

          stream.on('error', (err) => {
            reject(err);
          });
        } else {
          // 不使用压缩
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
          remoteFileStrem.on('finish', (info) => {
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
  async uploadImage() {
    const ctx = this.ctx;
    const imageId = ctx.request.query?.imageId || uuidv1() // 新增时创建uuid
    try {
      const stream = await ctx.getFileStream();
      const filename = `${imageId}.${stream.filename.split('.')[1]}`;
      const filePath = path.join(this.config.upload.dir, filename);
      if (!fs.existsSync(this.config.upload.dir)) {
        fs.mkdirSync(this.config.upload.dir);
      }
      let compress = true
      // 使用图片压缩
      const result = await new Promise((resolve, reject) => {
        if (compress) {
          const chunks = []; // jimp方式

          stream.on('data', (chunk) => {
            chunks.push(chunk);
          });
          stream.on('end', async () => {
            const buffer = Buffer.concat(chunks);
            try {
              const image = await Jimp.read(buffer)
              await image.resize(600, Jimp.AUTO).quality(80).writeAsync(filePath);
              resolve(filePath)
            } catch (jimpErr) {
              // console.error('Jimp处理失败:', jimpErr);

              try {
                // Jimp处理失败，将未压缩的图片数据写入文件
                await fs.promises.writeFile(filePath, buffer);
                console.log('未压缩的图片写入完成！');
                resolve(filePath);
              } catch (writeErr) {
                console.error('写入未压缩图片失败:', writeErr);
                reject(writeErr);
              }
            }
          });

          stream.on('error', (err) => {
            reject(err);
          });
        } else {
          // 不使用压缩
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
          remoteFileStrem.on('finish', (info) => {
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
        ctx.body = {
          errno: 0, // 注意：值是数字，不能是字符串
          data: {
              "url": filename, // 图片 src ，必须
              "alt": filename, // 图片描述文字，非必须
              "href": filePath // 图片的链接，非必须
          }
        }
        // ctx.body = ctx.helper.jsonResult.success(filename);
      }
    } catch (error) {
      console.error(error);
      ctx.body = {
        errno: 1, // 只要不等于 0 就行
        message: "上传失败"
      }
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
