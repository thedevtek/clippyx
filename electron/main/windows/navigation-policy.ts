export const isAllowedNavigation = (url: string, devOrigin?: string): boolean => {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'file:') return true;
    return devOrigin !== undefined && parsed.origin === new URL(devOrigin).origin;
  } catch {
    return false;
  }
};
