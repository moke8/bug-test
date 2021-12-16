import request from './request'
// QueryDateSlotDto
import { QueryPageDto } from './dto'

// 获取被派遣单位列表
export interface InvoiceDto {
    actual_money: string
    company_name: string
    create_time: string
    id: number
    invoice_date: string
    invoice_subject: string
    remark: string
    tax_number: string
}
interface GetInvoiceDto extends QueryPageDto {
    startTime: string
    endTime: string
}
export function getInvoice (
    params: GetInvoiceDto
): Promise<{ data: InvoiceDto[]; last_page: number }> {
    return request.get('/invoice/list', params)
}

// 充值记录  /client/recharge/list

interface GetRechargeEecordListDto extends QueryPageDto {
    startTime: string
    endTime: string
    payType: string
}
export function getRechargeEecordList (
    params: GetRechargeEecordListDto
): Promise<{ data: InvoiceDto[]; last_page: number }> {
    return request.get('/recharge/list', params)
}
interface GetInvoiceInfoDto {
    company_name: string
    cut_date: string
    surplus: number
    tax_number: string
}
// 发票申请页的信息 /invoice/applyInfo
export function getInvoiceInfo (): Promise<GetInvoiceInfoDto> {
    return request.get('/invoice/applyInfo')
}

// 申请发票 invoice/apply
export function getApplyInvoice (data: {
    email: string
    mobile: string
}): Promise<[]> {
    return request.post('/invoice/apply', data)
}

// 充值账户
export interface AccountDto {
    account_id: number
    name: string
    account_name: string
    bank_name: string
    account_number: string
    tax_number: string
}
export function getPayAccount (): Promise<AccountDto> {
    return request.get('/recharge/payments')
}
