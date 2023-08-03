const Controller = require('egg').Controller;
const Mongoose = require('mongoose');
class Config extends Controller {

  async getConfig() {
    const { ctx, app } = this;

    try {
      
      const configData = await app.model.Countdata.find({});
      const result = configData.reduce((acc, item) => {
        acc[item.title] = item.content;
        return acc;
      }, {});

      ctx.body = ctx.helper.jsonResult.success(result);
    } catch (err) {
      ctx.body = ctx.helper.jsonResult.error(err, 2);
    }
  }


}

module.exports = Config;
