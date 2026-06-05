const readFile = (path) => Deno.readTextFile(path);

const readSerialTask = (filePath) => readFile(filePath);

const readParallelTask = (filesPath, tasks) => {
  Promise.all(filesPath.map((file) => readFile(file)))
    .then((x) => tasks.push(x));
};

const readTasks = async (files) => {
  const tasks = [];

  for (let index = 0; index < files.length; index++) {
    const filesPath = files[index].split(",");

    if (filesPath.length > 1) readParallelTask(filesPath, tasks);
    else tasks.push(await readSerialTask(filesPath[0]));
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
