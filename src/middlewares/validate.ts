import type {z} from "zod";
import { type RequestHandler, type Request, response } from "express";
import { wrapErrorResponse, wrapSuccessResponse, type FieldIssue } from "../types/api.js";
import { request } from "node:http";
export function formatIssues(error:z.ZodError):FieldIssue[]{
    return error.issues.map((issue) => ({
        field:issue.path.length > 0 ? issue.path.map(String).join('.') : '(тело запроса)',
        message: issue.message
    }))
}
export function validateBody<TBody>(schema: z.ZodType<TBody, unknown>):RequestHandler<Request['params'], unknown, TBody>{
     return (request, res, next) => {
        const result = schema.safeParse(request.body)
        if(!result.success){
            res.status(400).json(wrapErrorResponse("Ошибка валидации: данные запроса не прошли проверку схемы", 
                {code: 'Validation error', issues: formatIssues(result.error)}
            ))
            return;
        }
        request.body = result.data
        next()
     }
}