
export const getRecentMonths = (num: number): string[] => {
    const curDate = new Date();
    const result: string[] = [];
    for (let i = num - 1; i >= 0; i --) {
      const date = new Date(curDate.getFullYear(), curDate.getMonth() - i, 1);
      const yy = date.getFullYear();
      const mm = date.getMonth() + 1;
      const formattedMonth = mm < 10 ? `0${mm}` : `${mm}`;
      const formattedDate = `${yy}-${formattedMonth}`;
      result.push(formattedDate);
    }
    return result;
}
  
export const getStartAndEndDateFromMonthStr = (month: string) : {startDate: Date, endDate: Date} => {
    const [year, monthNumber] = month.split('-').map(Number);
    const startDate = new Date(year, monthNumber - 1, 1);
    const endDate = new Date(year, monthNumber, 0);
    return { startDate, endDate };
}