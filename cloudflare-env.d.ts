interface Fetcher { fetch(request: Request): Promise<Response>; }
interface D1PreparedStatement { bind(...values: unknown[]): D1PreparedStatement; run(): Promise<unknown>; first<T=unknown>(): Promise<T|null>; all<T=Record<string,unknown>>(): Promise<{results:T[]}>; }
interface D1Database { prepare(sql:string):D1PreparedStatement; batch<T=unknown>(statements:D1PreparedStatement[]):Promise<T[]>; }
declare module "cloudflare:workers" { export const env:{DB:D1Database}; }
