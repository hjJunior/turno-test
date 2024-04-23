/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN_PUBLIC: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
