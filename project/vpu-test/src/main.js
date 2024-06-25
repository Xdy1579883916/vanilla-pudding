import {useExt} from "@vanilla-pudding/message";

async function test() {
    const bgt = useExt().bgt;

    const hello = await bgt.hello("你好")
    console.log("hello", hello)

    await bgt.extLocalStore.set("name", "张三", 1)
    const local_name = await bgt.extLocalStore.get("name")
    console.log("local_name", local_name)

    await bgt.extNamedStore.set("dxb", "name", "张三", 1)
    const name = await bgt.extNamedStore.get("dxb", "name")

    console.log("extNamedStore", name)

    // console.log(await bgt.ruleDNRTool.get())
    await bgt.doRequest(
        "GET",
        "https://www.alibaba.com/product-detail/2022-New-wholesale-sweet-love-roses_1600382993364.html",
    ).then(res => {
        console.log("doRequest", res)
    })
}

window.test = test
