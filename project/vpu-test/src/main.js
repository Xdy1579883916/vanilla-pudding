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

// 测试文件上传
async function test_file_upload() {
  const blob = await fetch("https://cbu01.alicdn.com/img/ibank/O1CN012lfu0w2A2vEHsglkb_!!2216208058146-0-cib.310x310.jpg").then(r => r.blob())
  const blob_url = URL.createObjectURL(blob)

  // https://www.amazon.com/s?k=SHOP+THE+LOOK&ref=nb_sb_noss
  const url = "https://www.amazon.com/stylesnap/upload"
  await useExt().bgt.doRequest(
    "POST",
    url,
    {
      params: {
        "stylesnapToken": "hFPBPF%2BMXgcfUXBPxmZgcO1vooMLFbnEIqH1dQYgSjC9AAAAAGanstMAAAAB"
      },
      meta: {
        content_type: "formData",
      }
    },
    {
      "explore-looks.jpg": {
        uri: blob_url,
        filename: "explore-looks.jpg"
      },
      fileFields: [
        "explore-looks.jpg",
      ],
      // or ↓
      // "explore-looks.jpg": blob_url,
      // blobFields: [
      //   "explore-looks.jpg",
      // ]
    }
  ).then(res => {
    console.log(res)
  });
}

window.test = test
window.test_file_upload = test_file_upload
