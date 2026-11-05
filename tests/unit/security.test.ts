import { describe, expect, it } from 'vitest';
import { buildCsp } from '../../electron/shared/csp';
import { createSecureWebPreferences } from '../../electron/main/windows/secure-web-preferences';
import { isAllowedNavigation } from '../../electron/main/windows/navigation-policy';

describe('createSecureWebPreferences', () => {
  it('enforces process isolation and sandboxing', () => {
    const prefs = createSecureWebPreferences('C:\\app\\preload.cjs');

    expect(prefs).toMatchObject({
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      preload: 'C:\\app\\preload.cjs',
    });
  });
});

const scriptDirective = (csp: string): string | undefined =>
  csp.split('; ').find((directive) => directive.startsWith('script-src'));

describe('buildCsp', () => {
  it('forbids inline and eval scripts in production', () => {
    const csp = buildCsp({ isDev: false });

    expect(csp).toContain("default-src 'self'");
    expect(scriptDirective(csp)).toBe("script-src 'self'");
    expect(csp).not.toContain('unsafe-eval');
    expect(csp).toContain("object-src 'none'");
  });

  it('only relaxes the script policy in development', () => {
    expect(scriptDirective(buildCsp({ isDev: true }))).toContain("'unsafe-inline'");
  });
});

describe('isAllowedNavigation', () => {
  it.each([
    ['file:///C:/app/out/renderer/index.html', undefined, true],
    ['https://example.com', undefined, false],
    ['http://localhost:5173/', 'http://localhost:5173', true],
    ['http://localhost:5173/page', 'http://localhost:5173', true],
    ['http://localhost:9999/', 'http://localhost:5173', false],
    ['not a url', undefined, false],
  ])('given %s with dev origin %s returns %s', (url, devOrigin, expected) => {
    expect(isAllowedNavigation(url, devOrigin)).toBe(expected);
  });
});
