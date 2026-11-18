
import {z} from 'zod'
export const createDealSchema = z.object({
    title: z.string('Название сделки должно быть строкой').min(3, 'Название минимум 3 символа').max(255, 'Навзвание не длиннее 255 символов'),
    budget: z.number('Бюджет должен быть числом').positive('Бюджет не может быть отрицательным'),
    stage: z.enum(["NEW" , "CONTACT" , "PROPOSAL", "NEGOTIATION" , "WON" , "LOST"], {message: 'Этап сделки указан неверно'}),
    clientId: z.uuid('ClientId должен быть uuid'),
    managerId: z.uuid('ManagerId должен быть uuid')
})
export type createDealInput = z.infer<typeof createDealSchema>