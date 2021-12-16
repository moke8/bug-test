import request from './request'
import { QueryPageDto } from './dto'

// 获取被派遣单位列表
export interface DispatchDto {
    company_id: number
    create_time: string
    industry_id: number
    industry_name: string
    name: string
    occupation: { occupation_id: number; name: string; level: number }[]
    remark: string
    status: string
    video: string
}
interface GetDispatchReqDto extends QueryPageDto {
    status?: '10' | '20'
}
export function getDispatch (
    params: GetDispatchReqDto
): Promise<{ data: DispatchDto[]; last_page: number }> {
    return request.get('/company/list', params)
}

// 删除或取消派遣 company/delete
export function dispatchDelete (data: {
    companyId: string | number
}): Promise<[]> {
    return request.post('/company/delete', data)
}

// 添加被派遣单位
export function dispatchAdd (data: {
    name: string
    fileIds: string[]
}): Promise<[]> {
    return request.post('/company/add', data)
}
