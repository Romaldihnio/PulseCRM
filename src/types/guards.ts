import {z} from 'zod'
export function isZodError(error:unknown): error is z.ZodError{
    return error instanceof z.ZodError
}
export function isRecord(value:unknown): value is Record<string, unknown>{
   return typeof value === 'object' && value !== null && !Array.isArray(value)
}
export function hasProperty<TKey extends string>(value:object, key:TKey):value is Record<TKey, unknown>{
    return key in value
}
export function hasErrorCode(error: unknown): error is {code:string, detail?:string}{
    return isRecord(error) && hasProperty(error, 'code') && typeof error.code === 'string'
}