import { Action, IndexedDBArticle } from "./type";

export class DB implements Action<IndexedDBArticle> {
  private db: IDBDatabase | null = null;

  constructor(private room: string) {
    this.open();
  }
  public read = (): Promise<IndexedDBArticle[]> => {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject([]);

      const transaction = this.db.transaction([this.room]);
      const objectStore = transaction.objectStore(this.room);
      const request = objectStore.getAll();
      request.onerror = () => {
        return resolve([]);
      };

      request.onsuccess = () => {
        if (request.result) {
          return resolve(request.result);
        } else {
          return resolve([]);
        }
      };
    });
  };

  create = (data: IndexedDBArticle): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject(false);

      const objectStore = this.db
        .transaction([this.room], "readwrite")
        .objectStore(this.room);

      const request = objectStore.put(data);

      request.onsuccess = () => {
        return resolve(true);
      };

      request.onerror = () => {
        return reject(false);
      };
    });
  };

  delete = (id: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject(false);

      const request = this.db
        .transaction([this.room], "readwrite")
        .objectStore(this.room)
        .delete(id);

      request.onsuccess = () => {
        return resolve(true);
      };

      request.onerror = () => {
        return reject(false);
      };
    });
  };

  private open = () => {
    const req: IDBOpenDBRequest = indexedDB.open("article", 10);
    req.onerror = () => console.error("db open fail");

    req.onsuccess = () => {
      if (!req) {
        return;
      }
      this.db = req.result;
    };
    req.onupgradeneeded = (event: any) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(this.room)) {
        db.createObjectStore(this.room, {
          keyPath: "ID",
          autoIncrement: true,
        });
      }
    };
  };
}

export const scrapArticleDB = new DB("article");
