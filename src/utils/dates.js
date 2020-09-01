import moment from "moment";
import twix from "twix";

// month
// const startOfMonth = (date) =>
//   formatDate((moment(date) || moment()).startOf("month"));
// const endOfMonth = (date) =>
//   formatDate((moment(date) || moment()).endOf("month"));
//
// const getPrevMonth = (date) => formatDate(moment(date).subtract(1, "months"));
// const getNextMonth = (date) => formatDate(moment(date).add(1, "months"));

// const formatDate = (date) => moment(date).format("YYYY-MM-DD");

// const dateStrFormatted = (date) => {
//   const endDate = moment(date).endOf("week");
//   return moment(date).twix(endDate, { allDay: true }).format();
// };

const dateUtil = {
  formatDate: (date) => {
    return moment(date).format("YYYY-MM-DD");
  },
  formatPeriod: (date, period) => {
    // const periodFormat = period === "month" ? "MMMM y" : "";
    if (period === "month") {
      return moment(date).format("MMMM 'YY");
    } else {
      const endDate = moment(date).endOf(period);
      return moment(date).twix(endDate, { allDay: true }).format();
    }
  },
  startOf: (date, period) => {
    const d = (moment(date) || moment()).startOf(period);
    return dateUtil.formatDate(d);
  },
  endOf: (date, period) => {
    const d = (moment(date) || moment()).endOf(period);
    return dateUtil.formatDate(d);
  },
  getPrev: (date, period) => {
    const d = moment(date).subtract(1, period);
    return dateUtil.formatDate(d);
  },
  getNext: (date, period) => {
    const d = moment(date).add(1, period);
    return dateUtil.formatDate(d);
  },
};

export { dateUtil };
