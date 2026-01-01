const readFile = (path) => {
  const data = Deno.readTextFile(path);
  return data;
};

const resolveFileContent = async () => {
  const files = (await readFile("./files/file_order")).split("\n");
  const tasks = [];
  try {
    for (let index = 0; index < files.length; index++) {
      const totalFiles = files[index].split(",");
      if (totalFiles.length > 1) {
        Promise.all(totalFiles.map((file) => readFile(file)))
          .then((x) => {
            tasks.push(x);
          });
      } else {
        const task = await readFile(files[index]);
        tasks.push(task);
      }
    }
  } catch (err) {
    console.log(err);
  }

  console.log(tasks);
};

resolveFileContent();
