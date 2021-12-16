import request from './request'

// 获取用户基本信息
export interface BasicDataDto {
    notice: {
        title: string
        content: string
    },
    person:{
        active: number
        monthCompare: number
    },
    service: {
        avatar: string
        mobile: string
        name: string
    },
    wallet: {
        balance: number
        warning: string
    }
}
export function getBasicData (): Promise<BasicDataDto> {
    return request.get('/home/data')
}
export interface CommonlyFileDto{
    name: string
    type: string
    url: string
}
export function getCommonlyFile (): Promise<CommonlyFileDto[]> {
    return request.get('/home/files')
}
