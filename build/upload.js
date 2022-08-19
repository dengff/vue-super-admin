/*
 * @Descripttion:
 * @version:
 * @Author: caoweizheng
 * @Date: 2021-03-22 15:43:41
 * @LastEditors: caoweizheng
 * @LastEditTime: 2021-04-26 10:06:41
 */
const client = require('scp2');
const ora = require('ora');
const path = require('path');

const filePath = path.resolve(__dirname + '/../dist/');
const params = process.argv.splice(2);
const env = params[0];

if (env == 'prod') {
  var outPath = '/home/resin2/deploy/prod.git/font.git';
} else {
  var outPath = '/home/nginx/html';
}
console.log(outPath, 'outPath');
const config = {
  host: '10.7.11.228',
  username: 'root',
  password: 'ad2iNjia0342',
  path: outPath,
};

console.log('上传的文件' + filePath + '\n' + '目标目录' + outPath + '\n');

var upload = ora('正在上传服务器');
upload.start();

client.scp(filePath, config, function(err) {
  if (err) {
    console.log(err);
    upload.fail();
  } else {
    upload.succeed();
  }
  console.log('更新时间: ' + new Date());
  upload.stop();
});
