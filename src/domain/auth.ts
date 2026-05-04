export type UserRole = 'researcher' | 'clinician' | 'reviewer' | 'admin';

export type AppUser = {
  id: string;
  displayName: string;
  role: UserRole;
};

const STORAGE_KEY = 'carotisai-user';

const DEFAULT_USER: AppUser = {
  id: 'local-01',
  displayName: 'Lokaler Nutzer',
  role: 'researcher',
};

export function loadUser(): AppUser {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppUser;
      if (parsed.id && parsed.displayName && parsed.role) return parsed;
    }
  } catch {
    // ignorieren
  }
  return DEFAULT_USER;
}

export function saveUser(user: AppUser): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {
    // ignorieren
  }
}

export const ROLES: { value: UserRole; label: string }[] = [
  { value: 'researcher', label: 'Forscher·in' },
  { value: 'clinician', label: 'Kliniker·in' },
  { value: 'reviewer', label: 'Reviewer·in' },
  { value: 'admin', label: 'Admin' },
];
