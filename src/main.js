const readFile = (path) => {
  const data = Deno.readTextFile(path);
  return data;
};

const readSerialTask = (filePath) => {
  return readFile(filePath);
};

const readParallelTask = (filesPath, tasks) => {
  Promise.all(filesPath.map((file) => readFile(file)))
    .then((x) => {
      tasks.push(x);
    });
};

const readTasks = async (files) => {
  const tasks = [];

  for (let index = 0; index < files.length; index++) {
    const totalFiles = files[index].split(",");

    if (totalFiles.length > 1) {
      readParallelTask(totalFiles, tasks);
    } else {
      tasks.push(await readSerialTask(totalFiles[0]));
    }
  }

  return tasks;
};

const resolveFileContent = async () => {
  const files = (await readFile("./files/file_order")).split("\n");
  return readTasks(files);
};

const main = async () => {
  const tasks = await resolveFileContent();
  console.log(tasks);
};

main();
