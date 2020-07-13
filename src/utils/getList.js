const path = ({ resolve } = require("path"));
const { readdir } = require("fs").promises;
const exampleDir = path.join(__dirname, "../examples");
const List = {};

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

module.exports = (async () => {
  for await (const file of getFiles(exampleDir)) {
    const filePath = file.split(`${exampleDir}/`)[1].split("/");
    const fileName = filePath[1].split(".js")[0];

    Array.isArray(List[filePath[0]])
      ? List[filePath[0]].push(fileName)
      : (List[filePath[0]] = [fileName]);
  }
  return List;
})();
