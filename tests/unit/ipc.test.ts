import { describe, expect, it, vi } from 'vitest';
import { isIpcChannel } from '../../electron/shared/ipc-contract';
import { registerIpc, type IpcMainLike } from '../../electron/main/ipc/register-ipc';

type Listener = (event: unknown, ...args: unknown[]) => unknown;

const createFakeIpcMain = () => {
  const listeners = new Map<string, Listener>();
  const ipcMain: IpcMainLike = { handle: (channel, listener) => void listeners.set(channel, listener) };
  return { ipcMain, listeners };
};

describe('isIpcChannel', () => {
  it.each([
    ['app:getVersion', true],
    ['app:unknown', false],
    ['toString', false],
    [42, false],
  ])('given %j returns %s', (input, expected) => {
    expect(isIpcChannel(input)).toBe(expected);
  });
});

describe('registerIpc', () => {
  it('registers only channels declared in the contract', () => {
    const { ipcMain, listeners } = createFakeIpcMain();

    registerIpc(ipcMain, { 'app:getVersion': () => '1.0.0' });

    expect([...listeners.keys()]).toEqual(['app:getVersion']);
  });

  it('returns the handler result when the payload and response are valid', async () => {
    const { ipcMain, listeners } = createFakeIpcMain();
    registerIpc(ipcMain, { 'app:getVersion': () => '1.2.3' });

    const result = await listeners.get('app:getVersion')?.({});

    expect(result).toBe('1.2.3');
  });

  it('rejects an unexpected payload without calling the handler', async () => {
    const { ipcMain, listeners } = createFakeIpcMain();
    const handler = vi.fn(() => '1.0.0');
    registerIpc(ipcMain, { 'app:getVersion': handler });

    await expect(listeners.get('app:getVersion')?.({}, { injected: true })).rejects.toThrow();
    expect(handler).not.toHaveBeenCalled();
  });

  it('rejects a handler response that violates the contract', async () => {
    const { ipcMain, listeners } = createFakeIpcMain();
    registerIpc(ipcMain, { 'app:getVersion': () => 123 as unknown as string });

    await expect(listeners.get('app:getVersion')?.({})).rejects.toThrow();
  });
});
