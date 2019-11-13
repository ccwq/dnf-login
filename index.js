require('chromedriver'); //导入chrome浏览器 driver
const async = require("async");

var webdriver = require('selenium-webdriver'); //导入selenium 库

const startChrome = async function(opt, index){

    var chromeCapabilities = webdriver.Capabilities.chrome();
//setting chrome options to start the browser fully maximized
    var chromeOptions = {
        // 'args': ['--user-data-dir=d:/chromeCache', '--start-maximized']
        'args': ['--user-data-dir=d:/chroem-data/' + index]
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);


    // var driver = new webdriver.Builder().forBrowser("chrome").build(); //创建一个chrome 浏览器实例
    var driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build(); //创建一个chrome 浏览器实例

    // await driver.get("http://dnf.qq.com/game/");
    await driver.get("https://xui.ptlogin2.qq.com/cgi-bin/xlogin?proxy_url=http://game.qq.com/comm-htdocs/milo/proxy.html&appid=21000127&target=top&s_url=http%3A%2F%2Fdnf.qq.com%2Fgame%2F&style=20&daid=8");
    // await driver.findElement({id:`dologin`}).click();
    await driver.findElement({id:`switcher_plogin`}).click();
    await driver.findElement({id:`u`}).sendKeys(opt[0]);
    await driver.findElement({id:`p`}).sendKeys(opt[1]);
    await driver.findElement({id:`login_button`}).click();
}

//把你的账号密码贴到这里
var zhangmi = `
账号----密码
账号----密码
账号----密码
账号----密码
`


//修改分隔符
var fengefu = "---"

var data = zhangmi.trim().split("\n").map(el=>{
    return el.trim().split(fengefu)
})


async.eachOfLimit(
    data,
    5,
    async function(el, index, next){
        try {
            await startChrome(el, index);
        } catch (e) {
            console.error(e);
        }
    },
    function (err, result) {

    }
)
