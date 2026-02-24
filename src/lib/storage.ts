// lib/storage.ts
class StorageService {
  private isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  set<T>(key: string, value: T): void {
    if (!this.isBrowser()) return;

    try {
      const json = JSON.stringify(value);
      localStorage.setItem(key, json);
    } catch (err) {
      console.error("Storage serialization error:", err);
      console.log("Value causing issue:", value);
    }
  }

  get<T>(key: string): T | null {
    if (!this.isBrowser()) return null;

    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  remove(key: string): void {
    if (!this.isBrowser()) return;
    localStorage.removeItem(key);
  }

  clear(): void {
    if (!this.isBrowser()) return;
    localStorage.clear();
  }
}

export const storage = new StorageService();
