import Fastify from 'fastify'
import FastifyStatic from '@fastify/static'
import path from 'path'
import fs from 'fs/promises'
import cors from '@fastify/cors'

const fastify = Fastify({logger: false})
fastify.register(FastifyStatic, {
  root: path.join(__dirname, 'web'),
  prefix: '/'
})

fastify.register(cors, { 
  origin: "*",
  methods: ['GET', 'PUT', 'POST']
})

const matchReg = /\.(png|jpe?g|webp)$/i
fastify.get('/all', async function (request){
  const url = new URL(`${request.protocol}://${request.hostname}${request.url}`)
  const rootPath = url.searchParams.get('path')
  if (rootPath == null) {
    return {}
  }
  const dirs = await fs.readdir(rootPath)
  const imgs = dirs.filter((itemPath: string) => matchReg.test(itemPath))
  return imgs.map((item: string) => ({
    imageUrl: path.join(rootPath ,item),
    tagsUrl: path.join(rootPath, item.replace(matchReg, '.txt'))
  }))
})

fastify.get('/fetch', async function (request, reply) {
  const url = new URL(`${request.protocol}://${request.hostname}${request.url}`)
  const filePath = url.searchParams.get('path')
  if (filePath  == null) {
    return {}
  }
  const data = await fs.readFile(filePath)
  if (filePath.endsWith('.txt')) {
    reply.header('content-type', 'text/plain')
  } else if (filePath.endsWith('.png')) {
    reply.header('content-type', 'image/png')
  } else if (filePath.endsWith('.jpg')) {
    reply.header('content-type', 'image/jpeg')
  } else if (filePath.endsWith('.webp')) {
    reply.header('content-type', 'image/webp')
  }
  return data
})

fastify.post('/rewrite', async function (request)  {
  const body = request.body as {path: string, content: string}
  await fs.writeFile(body.path, body.content)
  return {code: 0}
})

const start = async () => {
  try {
    console.log('server will start at port: 7889')
    await fastify.listen({ port: 7889 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()