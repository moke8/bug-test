import request from './request'
import { ClientUserDto } from './dto'
// 团队动态
export interface TeamMessageDto{
    clientUser: ClientUserDto
    'client_user_id': string
    content: string
    'create_time': string
    id: number
    source: string
}
export function getTeamMessage (): Promise<TeamMessageDto[]> {
    return request.get('/client.log/list')
}
