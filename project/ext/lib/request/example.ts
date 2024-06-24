let backgroundToolService: any

// 测试 get 请求
async function test_get() {
    return backgroundToolService.doRequest("GET", "https://www.alibaba.com/product-detail/2022-New-wholesale-sweet-love-roses_1600382993364.html")
}

// 测试 post 请求
async function test_post() {
    const url = "https://profile.alibaba.com/selection/ajax/product_detail_ajax.do"
    return backgroundToolService.doRequest(
        "POST",
        url,
        {},
        {
            productId: "1600382993364",
            countryCode: "all",
        },
    )
}

// 测试 post 请求, +跨域配置 + diyHeaders
async function test_post_by_cors() {
    const url = "https://profile.alibaba.com/selection/ajax/product_detail_ajax.do"
    return backgroundToolService.doRequest(
        "POST",
        url,
        {
            params: {
                t: Date.now(),
            },
            meta: {
              cors: JSON.stringify({
                    monitorUrl: url,
                    originValue: "https://profile.alibaba.com",
                    refererValue: "https://profile.alibaba.com/profile/detail_buyer_select.htm",
                    diyHeaders: [
                        {
                            header: "Sec-Ch-Ua",
                            operation: "set",
                            value: "vanilla pudding\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24",
                        },
                        {header: "Sec-Ch-Ua-Mobile", operation: "set", value: "?0"},
                        {header: "Sec-Ch-Ua-Platform", operation: "set", value: "Windows"},
                        {header: "bx-v", operation: "set", value: "2.5.6"},
                    ],
                }),
            }
        },
        {
            productId: "1600382993364",
            countryCode: "all",
        },
    )
}

async function test_meta() {
    const url = "https://profile.alibaba.com/selection/ajax/product_detail_ajax.do"
    return backgroundToolService.doRequest(
        "POST",
        url,
        {
            params: {
                productId: "1600382993364",
                countryCode: "all",
            },
            meta: {
                content_type: "json",
                response_type: "charset_encode"
            }
        },
    )
}
