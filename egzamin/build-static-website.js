import fs from 'fs/promises';

const IMAGE_PATH =
  process.env.NODE_ENV === 'prod'
    ? 'https://raw.githubusercontent.com/uj-applied-computer-science-2021/litm/main/egzamin/assets'
    : '../assets';

const readArgv = () => {
  return process.argv.slice(2).reduce((serialized, entry) => {
    const [key, value] = entry.split('=');
    return { ...serialized, [key]: value };
  }, {});
};

const createJsonParser = () => {
  const parse = (jsonData) => JSON.parse(jsonData);
  return { parse };
};

const createDatabase = (filepath, parser) => {
  let data = { entries: [] };

  const parseContent = (rawContent) => {
    return parser.parse(rawContent);
  };

  const handleOnContentParsed = (parsedContent) => {
    data = { ...data, entries: [...data.entries, ...parsedContent] };
  };

  const init = async () => {
    return fs.readFile(filepath).then(parseContent).then(handleOnContentParsed);
  };

  const getData = () => data;

  return { init, getData };
};

const createHtmlGenerator = (entries) => {
  const generateHead = () => {
    const recentChangeDate = new Date().toLocaleString('pl-PL', {
      timeZone: 'Poland',
    });
    return `<head>
      <meta charset='UTF-8' />
      <meta http-equiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <title>Baza pytan - LiTM - ost. aktu. ${recentChangeDate}</title>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-MZ91LWJWN5"></script>
      <script>function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","G-MZ91LWJWN5");</script>
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
      <link
        href='https://fonts.googleapis.com/css2?family=Fira+Code&display=swap'
        rel='stylesheet'
      />
      <link rel='stylesheet' href='./style.css' />
    </head>`;
  };

  const mapEntryToHtmlNode = (entry, index) => {
    return `<li data-id="${entry.id}" class="exam-questions__question question">
        <div class="question__header">
            <span class="question__counter">#${index + 1}</span>
            <span class="question__id">${entry.id}</span>
        </div>
            <div class="question__container">
            <img class="question__image" src="${IMAGE_PATH}/${
      entry.img
    }" alt="Zdjęcie przedstawiające pytanie wraz z udzielonymi odpowiedziami i ich poprawnością">
            <div class="question__searchable">${entry.question}</div>
            ${
              entry.notes.length
                ? `<div class="question__notes">${entry.notes}</div>`
                : '<span></span>'
            }
        </div>
    </li>`;
  };

  const generateList = () => {
    const stringifiedEntries = entries
      .map(mapEntryToHtmlNode)
      .reduce((str, entry) => `${str}${entry}`, '');
    return `<ul class="exam-questions">${stringifiedEntries}</ul>`;
  };

  const generateBody = () => {
    const recordsLength = entries.length;
    return `<body>
        <h1 class="details">
            ${
              recordsLength
                ? `Wczytano ${recordsLength} rekordów`
                : `Nie wczytano rekordów`
            }
        </h1>
        ${recordsLength ? generateList() : ''}
    </body>`;
  };

  const generate = () => {
    return `<!DOCTYPE html>
    <html lang="pl">
        ${generateHead()}
        ${generateBody()}
    </html>
    `;
  };

  return { generate };
};

const createBuildOutputStream = (buildDirPath) => {
  const publish = async (htmlContent) => {
    const htmlPathFile = `${buildDirPath}/index.html`;
    return fs.writeFile(htmlPathFile, htmlContent);
  };

  return { publish };
};

const runBuild = async () => {
  const { databaseFilePath, buildDirPath } = readArgv();
  const parser = createJsonParser();
  const database = createDatabase(databaseFilePath, parser);
  await database.init();
  const htmlGenerator = createHtmlGenerator(database.getData().entries);
  const html = htmlGenerator.generate();
  const buildOutputStream = createBuildOutputStream(buildDirPath);
  return buildOutputStream.publish(html);
};

const handleOnSuccess = (_) => {
  console.log('Website build successfully!');
};

const handleOnError = (err) => {
  console.error(
    'There was an error, while building a static website from the database: ',
    err
  );
};

runBuild().then(handleOnSuccess).catch(handleOnError);
