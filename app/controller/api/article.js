const Controller = require('egg').Controller;
const Mongoose = require('mongoose');
class CrudListController extends Controller {

  async list() {
    const { ctx, app } = this;
    const { body } = ctx.request;
    const { curPage = 1, pageSize = 10, ...query } = body;

    try {
      const sortData = { createTime: -1 };
      const skipData = (curPage - 1) * Number(pageSize);
      const limitData = Number(pageSize);
      // 用于计数分页
      const findData = await app.model.Article.find({});
      const totalRows = findData.length || 0;
      const articleList = await app.model.Article.list(query, sortData, skipData, limitData);

      const result = {
        curPage,
        dataList: articleList,
        totalRows,
      };
      ctx.body = ctx.helper.jsonResult.success(result);
    } catch (err) {
      ctx.body = ctx.helper.jsonResult.error(err, 2);
    }
  }

  async add() {
    const { ctx, app } = this;
    const {
      articleTitle,
    } = ctx.request.body;
    try {
      const findData = await app.model.Article.find({ articleTitle });
      if (findData.length) {
        ctx.body = ctx.helper.jsonResult.error(new Error('当前姓名已存在'), 5000);
        return
      }
      const result = new app.model.Article({ ...ctx.request.body });

      const articleInfo = await result.save();
      ctx.body = ctx.helper.jsonResult.success(articleInfo);
    } catch (err) {

      ctx.body = ctx.helper.jsonResult.error(err, 5000);
    }

  }

  async remove() {
    const { ctx, app } = this;
    const {
      _id
    } = ctx.request.body;
    try {
      const result = await app.model.Article.remove({
        _id
      });
      ctx.body = ctx.helper.jsonResult.success(result);
    } catch (err) {

      ctx.body = ctx.helper.jsonResult.error(err, 5000);
    }

  }
  async detail() {
    const { ctx, app } = this;
    const {
      _id
    } = ctx.request.body;
    try {
      const result = await app.model.Article.findOne({ _id });
      ctx.body = ctx.helper.jsonResult.success(result);
    } catch (err) {
      ctx.body = ctx.helper.jsonResult.error(err, 2);
    }

  }
  async update() {
    const { ctx, app } = this;
    const {
      _id,
      articleTitle,
      articleDes,
      articleContent,
      articlePicId
    } = ctx.request.body;
    try {
      const findData = await app.model.Article.findOne({ articleTitle });
      if (findData && (findData._id).toString() !== _id.toString()) {
        ctx.body = ctx.helper.jsonResult.error(new Error('当前用户已存在'), 2);
        return
      }
      const result = await app.model.Article.findOneAndUpdate(
        {
          _id
        },
        {
          articleTitle,
          articleDes,
          articleContent,
          articlePicId
        },
        {
          upsert: true
        }
      );
      ctx.body = ctx.helper.jsonResult.success(result);
    } catch (err) {

      ctx.body = ctx.helper.jsonResult.error(err, 2);
    }
  }
}

module.exports = CrudListController;
