import {useExt} from "@vanilla-pudding/message";

const bgt = useExt().bgt;

window.test = {
  async hello() {
    const hello = await bgt.hello("你好")
    console.log("hello", hello)
  },
  async extLocalStore() {
    await bgt.extLocalStore.set("name", "张三", 1)
    const local_name = await bgt.extLocalStore.get("name")
    console.log("extLocalStore", local_name)
  },
  async extNamedStore() {
    const namespace = "test"
    await bgt.extNamedStore.set(namespace, "name", "张三", 1)
    const name = await bgt.extNamedStore.get(namespace, "name")

    console.log("extNamedStore", name)
  },
  async doRequest() {
    await bgt.doRequest(
      "GET",
      "https://www.alibaba.com/trade/search?tab=supplier&SearchText=dress",
    ).then(res => {
      console.log("doRequest", res)
    })
  },
}
