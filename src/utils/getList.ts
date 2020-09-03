import path from "path";
import fs from "fs";

const { readdir } = require("fs").promises;
const exampleDir = path.join(__dirname, "../examples");

interface IList {
  [key: string]: Array<string>;
}

class List {
  lists: IList;
  fullDirPath: Array<string>;

  constructor() {
    this.lists = {};
    this.fullDirPath = [];
  }

  getFiles(dir: string) {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    for (const dirent of dirents) {
      const res = path.resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        this.getFiles(res);
      } else {
        this.fullDirPath.push(res);
      }
    }
  }

  getLists() {
    for (const file of this.fullDirPath) {
      const [, currentPath] = file.split(`${exampleDir}/`);
      const [filePath, fileOriginalName] = currentPath.split("/");
      const [fileName] = fileOriginalName.split(".js");

      Array.isArray(this.lists[filePath])
        ? this.lists[filePath].push(fileName)
        : (this.lists[filePath] = [fileName]);
    }
  }
}

const list = new List();
list.getFiles(exampleDir);
list.getLists();

export default list.lists;
