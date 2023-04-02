interface ImportMetaEnv {
  VITE_APP_TITLE: string
  MODE: 'development' | 'production' | 'test'
  PROD: boolean
  DEV: boolean
  [key: string]: string | boolean | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
