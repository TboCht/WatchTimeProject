/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_TOKEN: string;
  // add more variables here if you have more
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
