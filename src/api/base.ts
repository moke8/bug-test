import request from './request'

// 获取用户基本信息
export interface GetUserInfoResDto {
    roles: {
        isSuper: number
        permissions: []
    }
    userInfo: {
        avatar: string
        client_user_id: number
        is_super: number
        last_login_time: number
        mobile: string
        real_name: string
    }
}
export function getUserInfo (): Promise<GetUserInfoResDto> {
    return request.get('/client.user/info')
}

// 公司名称自动完成
export function companyNameAuto (params: { search: string }): Promise<string[]> {
    return request.get('/company/autoComplete', params)
}

// 获取可切换公司列表
export function getUserCompanyList (): Promise<
    { client_name: string; client_user_id: number }[]
    > {
    return request.get('/client.user/switchList')
}
// 切换公司获取TOKEN
export function getUserToken (data: {
    clientUserId: number
}): Promise<{ token: string }> {
    return request.post('/client.user/doSwitch', data)
}
// 获取用户所在公司信息
export interface UserCompanyInfo {
    name: string
    project: {
        mp_qrcode: string
    }
    balance: number
}
export function getUserCompany (): Promise<{ clientInfo: UserCompanyInfo }> {
    return request.post('/client/info')
}
