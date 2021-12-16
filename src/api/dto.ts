export interface QueryPageDto{
    page: number,
    pageSize?: number,
    search?: string
}
export interface QueryDateSlotDto {
    startTime: string
    endTime: string
}

export interface ClientUserDto{
    avatar: string,
    'real_name': string
    mobile: string
}
export interface WorkerDto {
    'company_name': string
    'employee_id': string
    'end_date': string
    'idcard': string
    'is_active': 1
    'name': string
    'occupation_level': number
    'occupation_name': string
    'plan_name': string
    'policy_id': number
    'policy_person_id': number
    'start_date': string
}
