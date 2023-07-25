# 使用官方 Node.js 镜像作为基础镜像
FROM node:16

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json（或者 yarn.lock）到工作目录
COPY package*.json ./
# 安装项目的依赖项
RUN npm install
# 安装 MongoDB
RUN apt-get update && \
    apt-get install -y mongodb
# 将项目文件复制到工作目录
COPY . .

# 暴露项目运行的端口号（根据你的项目需要）
EXPOSE 3000

# 启动项目
CMD [ "npm", "start" ]