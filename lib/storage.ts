import { SetupData } from './financialEngine';

export type SavedIAResult = {
  id: string;
  page: string;
  title: string;
  content: string;
  createdAt: string;
};

export type Snapshot = {
  id: string;
  month: string;
  revenue: number;
  costs: number;
  profit: number;
};

const KEYS = {
  setup: 'cs_setup_v1',
  ia: 'cs_ia_v1',
  snapshots: 'cs_snapshots_v1',
  darkMode: 'cs_darkmode_v1'
};

const canUseStorage = () => typeof window !== 'undefined';

function safeGet<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const storage = {
  getSetup: (): SetupData | null => safeGet<SetupData | null>(KEYS.setup, null),
  setSetup: (value: SetupData) => canUseStorage() && localStorage.setItem(KEYS.setup, JSON.stringify(value)),

  getIAResults: (page: string) => safeGet<SavedIAResult[]>(KEYS.ia, []).filter((r) => r.page === page),
  saveIAResult: (result: SavedIAResult) => {
    const all = safeGet<SavedIAResult[]>(KEYS.ia, []);
    localStorage.setItem(KEYS.ia, JSON.stringify([result, ...all]));
  },
  deleteIAResult: (id: string) => {
    const all = safeGet<SavedIAResult[]>(KEYS.ia, []);
    localStorage.setItem(KEYS.ia, JSON.stringify(all.filter((r) => r.id !== id)));
  },

  getSnapshots: () => safeGet<Snapshot[]>(KEYS.snapshots, []),
  saveSnapshot: (snapshot: Snapshot) => {
    const all = safeGet<Snapshot[]>(KEYS.snapshots, []);
    localStorage.setItem(KEYS.snapshots, JSON.stringify([snapshot, ...all]));
  },
  deleteSnapshot: (id: string) => {
    const all = safeGet<Snapshot[]>(KEYS.snapshots, []);
    localStorage.setItem(KEYS.snapshots, JSON.stringify(all.filter((s) => s.id !== id)));
  },

  getDarkMode: () => safeGet<boolean>(KEYS.darkMode, false),
  setDarkMode: (enabled: boolean) => canUseStorage() && localStorage.setItem(KEYS.darkMode, JSON.stringify(enabled))
};
