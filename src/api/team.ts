import request from './request'
import { QueryPageDto } from './dto'

// 获取团队成员列表
export interface TeamPeopleDto {
    avatar: string
    client_id: number
    client_user_id: number
    is_super: number
    last_login_time: number
    mobile: string
    project_id: number
    real_name: string
}
export function getTeamPeople (
    params: QueryPageDto
): Promise<{ data: TeamPeopleDto[]; last_page: number }> {
    return request.get('/client.user/list', params)
}

export function addTeamPeople (data: {
    realName: string
    mobile: string
}): Promise<void> {
    return request.post('/client.user/add', data)
}

export function editTeamPeople (data: {
    realName: string
    mobile: string
    clientUserId: number
}): Promise<void> {
    return request.post('/client.user/edit', data)
}

export function deleteTeamPeople (data: {
    clientUserId: number
}): Promise<void> {
    return request.post('/client.user/delete', data)
}
