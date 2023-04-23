import 'dotenv/config'
import z from 'zod'


const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
    PORT: z.coerce.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false){
    console.error('Variaveis de ambiente incorretas!', _env.error.format())
    throw new Error('variaveis de ambiente incorretas!')
}

export const env = _env.data