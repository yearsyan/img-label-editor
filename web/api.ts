export function apiBase() {
  const host = window.location.hostname
  if (process.env.ENV === 'production') {
    return ''
  }
  return `${window.location.protocol}//${host}:7889`
}

export interface DataSetItem {
  imageUrl: string
  tagsUrl: string
}

export async function getAllDataset(path: string): Promise<DataSetItem[]> {
  const resp = await fetch(`${apiBase()}/all?path=${encodeURIComponent(path)}`, {
    method: 'GET'
  })
  return resp.json()
}

export async function rewriteTextResource(url: string, content: string) {
  const resp = await fetch(`${apiBase()}/rewrite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ path: url, content })
  })
  const respJson = await resp.json()
  if (respJson.code !== 0) {
    throw new Error('unexpect code: ' + respJson)
  }
}

export async function fetchResource(url: string, flag: true): Promise<string>
export async function fetchResource(url: string, flag: false): Promise<ArrayBuffer>
export async function fetchResource(
  dataPath: string,
  text: boolean
): Promise<string | ArrayBuffer> {
  const resp = await fetch(`${apiBase()}/fetch?path=${encodeURIComponent(dataPath)}`, {
    method: 'GET'
  })
  const body = await resp.arrayBuffer()
  if (text) {
    const decoder = new TextDecoder('utf-8')
    return decoder.decode(body)
  } else {
    return body
  }
}
