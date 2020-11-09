const puppeteer = require("puppeteer");
const axios = require("axios");
const schedule = require('node-schedule');
const autoSignIn = async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('http://114.115.249.154/login');

    await page.waitForSelector('input[name="username"]')
    await page.waitForSelector('input[name="password"]')

    await page.type('input[name="username"]', '王侠')
    await page.type('input[name="password"]', '13619840984')

    await page.click('#btnSubmit')

    await page.waitForTimeout(2000)

    let frame = await page.frames().find(frame => frame.url() === 'http://114.115.249.154/system/main')



    await frame.waitForSelector('#toolbar .btn-success')

    await frame.click('#toolbar .btn-success')
    await page.waitForTimeout(2000)

    await frame.click('.layui-layer-btn0')

    await page.on('response', async (res) => {

        if (res.url().indexOf('/add') > 0) {
            let body = await res.json()
            let { code, msg } = body
            await axios({
                method: "GET",
                url: "https://sc.ftqq.com/SCU109875T32b15a96973d3de12db617560e79d7155f3bd76b9082a.send",
                params: {
                    text: msg
                }
            })
        }

    })
    await page.waitForTimeout(5000)
    await browser.close();
}
const scheduleCronstyle = () => {
    //每分钟的第30秒定时执行一次:
    schedule.scheduleJob('0 0 8 * * *', () => {
        autoSignIn()
    });
}
scheduleCronstyle();
