import { FilterFn } from '@tanstack/react-table';

export const dateBetweenFilterFn: FilterFn<any> = (row, columnId, value) => {
  const date = row.getValue(columnId) as Date;

  const start = new Date(value.from);
  const end = new Date(value.to);

  console.log(start.getTime());

  //If one filter defined and date is null filter it
  if ((start || end) && !date) return false;
  if (start && !end) {
    return date.getTime() >= start.getTime();
  } else if (!start && end) {
    return date.getTime() <= end.getTime();
  } else if (start && end) {
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
  } else return true;
};

dateBetweenFilterFn.autoRemove;

export default dateBetweenFilterFn;
