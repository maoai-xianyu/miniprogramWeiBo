// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got')

cloud.init()

const AppID = "wx45e071724be25dd3";
const AppSecret = "1bd9749457767956fa1354e9945a9bd8";

const tokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + AppID + "&secret=" + AppSecret;

let checkUrl = "https://api.weixin.qq.com/wxa/msg_sec_check?access_token=";

// 云函数入口函数
exports.main = async(event, context) => {
  const msg = event.content;
  console.log("需要校验的数据  ---  " + msg);
  const responseToken = await got(tokenUrl);
  console.log(responseToken.body);
  const accessToken = JSON.parse(responseToken.body).access_token;
  console.log("accessToken --- "+accessToken);
  checkUrl = checkUrl + accessToken;
  console.log("checkUrl  --- "+checkUrl);
  const checkResponse = await got.post(checkUrl, {
    body: JSON.stringify({
      content: msg
    })
  });
  console.log("内容校验" + checkResponse.body);
  return checkResponse.body;
}