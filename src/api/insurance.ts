import { QueryDateSlotDto, QueryPageDto, ClientUserDto, WorkerDto } from './dto'
import request from './request'

// 获取保险方案列表
export interface InsuranceOpenDto {
    policy_id: number
    plan_id: number
    start_date: string
    end_date: string | null
    can_today: number
    active_person_count: number
    template: 'normal' | 'warning' | 'disable'
    mark: string
    plan: {
        plan_id: number
        logo_image_id: number
        type: string
        name: string
        color: string
        logo: string
    }
}
export function getInsuranceOpenData (): Promise<InsuranceOpenDto[]> {
    return request.get('/policy/list')
}

// 保费趋势
export function getInsuranceTrend (): Promise<{
    month: string[]
    premium: string[]
}> {
    return request.get('/statistics.data/monthPremium')
}

// 获取加减保记录
interface GetInsuranceRecordDto extends QueryPageDto, QueryDateSlotDto {
    policyId: string
    type?: string
}
export interface InsuranceRecordDto {
    clientUser: ClientUserDto
    client_user_id: number
    create_time: string
    end_date: string
    order_id: number
    pay_money: string
    pay_status: number
    pay_type: number
    policy: {
        policy_id: number
        plan_id: number
        start_date: string
        end_date: string
        can_today: number
    }
    policy_id: number
    source: string
    start_date: string
    status: string
    type: string
}
export function getInsuranceRecord (
    params: GetInsuranceRecordDto
): Promise<{ data: InsuranceRecordDto[]; last_page: number }> {
    return request.get('/order/list', params)
}

// 保单详情
export interface InsuranceDetailDto {
    active_person_count: number
    can_today: number
    currentMonthPremium: number
    current_month_premium: number
    end_date: string
    person_count: number
    plan: {
        plan_id: number
        logo_image_id: number
        logo: string
        type: string
        name: string
        color: string
    }
    plan_id: number
    policy_id: number
    start_date: string
}
export function getInsuranceDetail (params: {
    policyId: string
}): Promise<InsuranceDetailDto> {
    return request.get('/policy/detail', params)
}

// 被派遣单位数据统计
export function getCompanyPieStatistics (params: {
    policyId: string
    onlyActive: string
}): Promise<{ name: string; count: number }[]> {
    return request.get('/statistics.data/companyPie', params)
}

// 被派遣单位数据统计
export function getOccupationPieStatistics (params: {
    policyId: string
    onlyActive: string
}): Promise<{ name: string; count: number }[]> {
    return request.get('/statistics.data/occupationPie', params)
}

// 可开通的方案列表
export interface PlanDto {
    can_today: number
    color: string
    desc: string
    feature: [{ title: string; desc: string }[]]
    is_hot: 0 | 1
    logo: string
    name: string
    plan_id: number
    price: string
    price4: string
    type: string
}
export function getPlanList (params: { type: string }): Promise<PlanDto[]> {
    return request.get('/plan/list', params)
}

// 开通新方案
export function openPlan (data: { planId: string }): Promise<void> {
    return request.post('/policy/add', data)
}

// 加减保员工数据
export interface InsuranceAddWorkerDto {
    name: string
    idcard: string
    company_name?: string
    company_id?: number | null
    occupation_name?: string
    occupation_id?: number | null
}
interface InsuranceAddSubtractReqDto {
    policyId: string
    startDate: string
    persons: InsuranceAddWorkerDto[]
}
// 减保
export function InsuranceSubtract (
    data: InsuranceAddSubtractReqDto
): Promise<void> {
    return request.post('/order/off', data)
}

// 加保
export function InsuranceAdd (data: InsuranceAddSubtractReqDto): Promise<void> {
    return request.post('/order/add', data)
}

// 获取保险员工列表
export function getInsurancePersonList (
    params: any
): Promise<{ data: WorkerDto[]; last_page: number }> {
    return request.get('/policy.person/list', {
        params
    })
}
