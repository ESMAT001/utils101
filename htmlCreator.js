import fs from 'fs';

const createHtml = (html) => {
  fs.writeFileSync('html.html', html, 'utf8');
}

function createAttrTable(attributes) {
  let html = `<table border="2">
    <thead>
        <tr>
            <th>
                attribute
            </th>
            <th>
                description
            </th>
            </tr>
        </thead>
        <tbody>
        <tr>
            <td colspan="2">${attributes?.globalAttributes}
            </td>
          </tr>
        `
  for (let index = 0; index < attributes?.localAttributes.length; index++) {
    const element = attributes?.localAttributes[index];
    html += `<tr>
            <td>${element?.name}
            </td>
            <td>${element?.description}
            </td>
        </tr>`
  }
  html += `</tbody>
</table>`
  return html;

}

function createBcdTable(bcd) {

  const browserNames = ['chrome', 'chrome_android', 'edge', 'firefox', 'firefox_android', 'ie', 'opera', 'opera_android', 'safari', 'safari_ios', 'samsunginternet_android', `webview_android`];
  function createThead() {
    return browserNames.map(name => `<th>${name}</th>`).join('\n');
  }

  function createData() {
    let htmlVar = '';
    for (const key in bcd) {
      if (Object.hasOwnProperty.call(bcd, key)) {
        const element = bcd[key];
        htmlVar += '<tr>'
        htmlVar += `<td>${key}</td>`
        for (let index = 0; index < browserNames.length; index++) {
          const browserName = browserNames[index];
          const browserSupport = element.support[browserName]?.version_added;
          htmlVar += `<td>${browserSupport}</td>\n`
        }
        htmlVar += '</tr>'
      }
    }
    return htmlVar;
  }

  const html = `
  <table border="2">
  <thead>
  <tr>
      <th>
         
      </th>
      ${createThead()}
      </tr>
  </thead>
  <tbody>
  ${createData()}
  </tbody>
  </table>
  `

  return html;

}
const createTable = () => {
  let html = ''
  let dataJson = fs.readFileSync('./output/data.json', 'utf8');
  dataJson = JSON.parse(dataJson);
  for (let index = 0; index < dataJson.length; index++) {
    const element = dataJson[index];
    html += `<tr> `
    html += `<td> ${element.tag}</td> `
    html += `<td> ${element.description}</td > `
    html += `<td>${createAttrTable(element.attributes)}</td>`;
    html += `<td><pre>${element.tag}<pre></td>`;
    html += `<td><pre> ${element.tag + element.tag} <pre> </td> `;
    html += `<td>${createBcdTable(element.BrowserCompatibility)}</td>`;
    html += `</tr>`
    // console.log(html)
  }
  return html;
}

let htmlTop = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <table border="2">
        <thead>
            <tr>
                <th>
                    tag
                </th>
                <th>des</th>
                <th>attributes</th>
                <th>code</th>
                <th>example</th>
                <th>bcd</th>
            </tr>
        </thead>
        <tbody>
        ${createTable()}
        </tbody>
</table>

</body>
</html>
        `

function main() {

  createHtml(htmlTop);
}
main();
