// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got')
const rp = require('request-promise')

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
  const token = JSON.parse(responseToken.body);
  const accessToken = token.access_token;
  console.log("accessToken --- " + accessToken);

  const checkResponse = await rp.post({
    method: 'POST',
    uri: checkUrl + accessToken,
    body: {
      content: msg
    },
    json: true // Automatically stringifies the body to JSON
  });
  console.log("内容校验--------");
  console.log(checkResponse);
  console.log("内容校验--------");

  // checkResponse.then(function(body) {
  //   console.log(body);
  // }).catch(function(err) {
  //   console.log(err);
  // });
  return checkResponse.body;
}