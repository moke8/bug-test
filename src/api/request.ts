import global from '@/utils/global'
import { loading, hideLoading, toast, wait } from '@/utils/util'

interface config {
    notLoading?: boolean
    headers?: { [key: string]: string }
}

class Request {
    baseUrl = ''
    returnAll = false
    requestNum = 0
    platform = ''

    constructor (url: string) {
        this.baseUrl = url // 基础url
        this.platform = global.platform
    }

    request (
        url: string,
        data: any,
        config: config,
        method: 'GET' | 'POST' | 'PUT'
    ): Promise<any> {
        const object = {
            url,
            header: config?.headers ?? {},
            data,
            method
        }
        // 对loading处理
        if (!config.notLoading) {
            if (this.requestNum === 0) {
                loading()
            }
            this.requestNum += 1
        }

        // url无https头则视为使用baseUrl
        if (!/^https:\/\//.test(url)) {
            object.url = this.baseUrl + url
        }

        // header处理
        object.header.platform = this.platform
        object.header['access-token'] = global.token

        // 开始执行
        return new Promise((resolve, reject) => {
            uni.request({
                ...object,
                success: async res => {
                    const result = res.data as AnyObject
                    if (
                        result.statusCode > 300 ||
                        result.statusCode < 200 ||
                        result.data.code > 300 ||
                        result.data.code < 200
                    ) {
                        hideLoading()
                        await wait(100)
                        toast(result.data.msg ? result.data.msg : '请求错误')
                        reject(result.data)
                    } else {
                        resolve(result.data)
                    }
                },
                async fail (err) {
                    const error = err as AnyObject
                    hideLoading()
                    await wait(100)
                    toast(
                        error.data
                            ? error.data.error
                            : '网络错误，请检查网络后重试'
                    )
                    reject(err)
                },
                complete: () => {
                    if (!config.notLoading) {
                        if (this.requestNum === 1) {
                            hideLoading()
                        }
                        this.requestNum -= 1
                    }
                }
            })
        })
    }

    // post请求
    post (url: string, data: AnyObject = {}, config: config = {}) {
        return this.request(url, data, config, 'POST')
    }

    // get请求
    get (url: string, data: AnyObject = {}, config: config = {}) {
        return this.request(url, data, config, 'GET')
    }

    // put请求
    put (url: string, data: AnyObject = {}, config: config = {}) {
        return this.request(url, data, config, 'PUT')
    }
}

// 初始化基础请求接口
export default new Request(global.baseUrl)

// 导出基本类
// exports.Request = Request
