import request from './request'
import { QueryPageDto, WorkerDto } from './dto'

// 获取用户基本信息
interface QueryWorkersDTO extends QueryPageDto {
    onlyActive: string
}
export function getWorkers (
    params: QueryWorkersDTO
): Promise<{ data: WorkerDto[]; last_page: number }> {
    return request.get('/employee/list', params)
}

export interface WorkerRecordDto {
    company_name: string
    create_time: string
    end_date: string
    occupation_level: number
    occupation_name: string
    plan: string
    start_date: string
}

interface GetWorkersDetailDto {
    employee_id: number
    idcard: string
    is_active: number
    name: string
    records: WorkerRecordDto[]
}
// 弹出列表 data: WorkerDto[], last_page: number
export function getWorkersDetail (params: {
    employeeId: string
}): Promise<GetWorkersDetailDto> {
    return request.get('/employee/detail', params)
}
