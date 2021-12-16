import request from './request'

// 导出月度账单
export function exportMonthBill (params:{month:string}): Promise<string> {
    return request.get('/policy/exportBill', {
        params: params
    })
}
