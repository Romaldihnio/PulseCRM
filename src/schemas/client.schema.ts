
import {z} from 'zod'
export const createClientSchema = z.object({
    name: z.string('Имя должно быть строкой').min(3, 'Имя минимум 3 символа').max(255, 'Имя не длиннее 255 символов'),
    company: z.string('Имя компании должно быть строкой').min(3, 'Имя минимум компании 3 символа').max(255, 'Имя компании не длиннее 255 символов'),
    email: z.email('Некорректный email'),
    phone: z.string('Телефон должен быть строкой').min(5, 'Телефон минимум 5 символов').max(32, 'Телефон не длиннее 32 символов'),
    status: z.enum(["lead" , "active" , "lost"], {message: 'Статус клиентка указан неверно'}),
    clientId: z.uuid('ClientId должен быть uuid'),
    managerId: z.uuid('ManagerId должен быть uuid')
})
export type createClientInput = z.infer<typeof createClientSchema>
