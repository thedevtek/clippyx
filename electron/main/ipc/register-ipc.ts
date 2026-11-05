import {
  ipcContract,
  type IpcChannel,
  type IpcRequest,
  type IpcResponse,
} from '../../shared/ipc-contract';

export interface IpcMainLike {
  handle(channel: string, listener: (event: unknown, ...args: unknown[]) => unknown): void;
}

export type IpcHandlers = {
  [C in IpcChannel]: (payload: IpcRequest<C>) => IpcResponse<C> | Promise<IpcResponse<C>>;
};

export const registerIpc = (ipcMain: IpcMainLike, handlers: IpcHandlers): void => {
  for (const channel of Object.keys(ipcContract) as IpcChannel[]) {
    const { request, response } = ipcContract[channel];
    const handler = handlers[channel] as (payload: unknown) => unknown;

    ipcMain.handle(channel, async (_event, ...args) => {
      const payload = request.parse(args[0]);
      return response.parse(await handler(payload));
    });
  }
};
