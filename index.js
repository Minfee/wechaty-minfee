const { Wechaty } = require("wechaty") // Wechaty核心包
const { PuppetPadplus } = require("wechaty-puppet-padplus") // padplus协议包
const superagent = require('superagent');

const { PUPPET_PADPLUS_TOKEN, ROBOT_NAME } = require("./config") // token & robotName 脱敏源
const WechatyFriendPass = require("wechaty-friend-pass") // plugin 好友申请自动通过

const {
  QRCodeTerminal,
  EventLogger,
  ManyToManyRoomConnector,
} = require("wechaty-plugin-contrib")

// 初始化
const bot = new Wechaty({
  puppet: new PuppetPadplus({
    token: PUPPET_PADPLUS_TOKEN,
  }),
  name: ROBOT_NAME,
})

// 官方 plugin 在终端显示扫描二维码插件
bot.use(
  QRCodeTerminal({
    small: false,
  })
)

// 官方 plugin 日志输出
bot.use(EventLogger())

// plugin 自动通过好友申请
bot.use(
  WechatyFriendPass({
    keyword: [
      "Minfee",
    ],
    reply: `你好，我是机器人小助手阿巴阿巴 \n\n 阿巴巴巴\n 阿巴巴巴 \n 阿巴阿巴吧`,
    blackId: [],
  })
)

bot
  .on("error", (error) => {
    console.error(error)
  })
bot.on('message', message => {
    if (message.text() === '诗'){
        superagent
            .get('https://v2.jinrishici.com/sentence')
            .set('X-User-Token', 'eSTjM225WDiJbdPJiJlOtUMSzTELm4ES')
            .end((err, res) => {
                const resData = JSON.parse(res.text).data.content
                message.say(resData).then()
            });
    }else{
        message.say(message.text()).then()
    }
})
bot.start().then()
