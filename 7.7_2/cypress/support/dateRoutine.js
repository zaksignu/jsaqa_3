
module.exports = {
  getMeRightJsonToPost: function (id,name) {

    let jsonFile = `
    {
          "id": ${id},
          "category": {
            "id": 0,
            "name": "string"
          },
          "name": "doggie",
          "photoUrls": [
            "string"
          ],
          "tags": [
            {
              "id": 0,
              "name": "${name}"
            }
          ],
          "status": "available"
        }`   ;
      return jsonFile;
      
  },

  getDateFromStamp: function (datestamp) {
    let date = new Date(datestamp * 1000);
    return date.getUTCDate();
  },
  getRandomInt: function (maxValue) {
    return Math.floor(Math.random() * maxValue)+1;
  },




};
