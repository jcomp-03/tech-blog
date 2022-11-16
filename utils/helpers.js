module.exports = {
  // format dates
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },

  // format plural words differently
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }
  },

  // format URLs
  format_url: (url) => {
    return url
      .replace("http://", "")
      .replace("https://", "")
      .replace("www.", "")
      .split("/")[0]
      .split("?")[0];
  },
};
