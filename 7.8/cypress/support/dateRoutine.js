
module.exports = {
  getNeededDatestamp: function (daysToApproach) {
    let currentTimestamp = new Date();
    let zeroDayTimeStamp = currentTimestamp.setHours(0, 0, 0, 0) / 1000;
    return zeroDayTimeStamp + 86400 * daysToApproach;
  },

  getDateFromStamp: function (datestamp) {
    let date = new Date(datestamp * 1000);
    return date.getUTCDate();
  },
  getRandomInt: function (maxValue) {
    return Math.floor(Math.random() * maxValue)+1;
  },

};
