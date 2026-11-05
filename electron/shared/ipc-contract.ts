import { z } from 'zod';

export const ipcContract = {
  'app:getVersion': { request: z.undefined(), response: z.string() },
} as const;

export type IpcChannel = keyof typeof ipcContract;
export type IpcRequest<C extends IpcChannel> = z.infer<(typeof ipcContract)[C]['request']>;
export type IpcResponse<C extends IpcChannel> = z.infer<(typeof ipcContract)[C]['response']>;

export const isIpcChannel = (value: unknown): value is IpcChannel =>
  typeof value === 'string' && Object.hasOwn(ipcContract, value);
