import request from './request'
import { QueryPageDto, WorkerDto } from './dto'
// 案件列表
export function getReportList (
    params: QueryPageDto
): Promise<{ data: WorkerDto[]; last_page: number }> {
    return request.get('/report/list', {
        params
    })
}

interface addReportReqDto {
    employeeId: string
    employeePhone: string
    caseDate: string
    type: string
    address: string
    desc: string
    fileIds: string[]
    reporterPhone: string
}
export function addPeport (data: addReportReqDto): Promise<void> {
    return request.post('/report/add', data)
}

// 撤销报案
export function cancelReport (data: { reportId: string }): Promise<void> {
    return request.post('/report/cancel', data)
}

// 案件详情
export interface ReportDetailDto {
    address: string
    case_date: string
    create_time: string
    desc: string
    employee: { employee_id: number; name: string; idcard: string }
    employee_id: number
    employee_phone: string
    estimate_money: string
    final_money: string
    is_serious: number
    money_shangcan: string
    money_wugong: string
    money_yiliao: string
    policyPerson: string
    policy_person_id: number
    remark: string
    report_id: number
    reporter_phone: string
    status: string
    trace: []
    type: string
}
export function getReportDetail (params: {
    reportId: string
}): Promise<ReportDetailDto> {
    return request.get('/report/detail', {
        params
    })
}
