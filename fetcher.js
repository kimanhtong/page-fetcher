const request = require('request');
const fs = require('fs');
const link = process.argv[2];
const file = process.argv[3];
if (link === '' || link === undefined) {
  console.log('Cannot process as no link is provided');
  return;
}
if (file === '' || file === undefined) {
  console.log('Cannot process as no file name/ location is provided');
  return;
}

request(link, (error, response, body) => {
  if (error) {
    console.log('Error opening the link: ', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    return;
  }
  fs.writeFile(file, body, (err) => {
    if (err) {
      console.log(`Error opening file ${err}`);
      return;
    }
    console.log(`Downloaded and saved ${fs.statSync(file).size} bytes to ${file}`);
  })
});
