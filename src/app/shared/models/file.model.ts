import { ThrowStmt } from "@angular/compiler";

export class FileUpload {
    key: string;
    name: string;
    url: string;
    file: File;
  
    constructor(file: File, key: string, url: string, name: string) {
      this.file = file;
      this.key = key;
      this.url = url;
      this.name = name;
    }
  }