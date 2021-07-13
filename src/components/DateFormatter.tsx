import React from 'react';
import { parseISO, format } from 'date-fns';

interface DateFormatterProp {
  dateString: string;
  formatString: string;
  className: string;
}

function DateFormatter({ dateString, formatString, className }: DateFormatterProp) {
  const date = parseISO(dateString);
  const formattedDateString = format(date, formatString);
  return <div className={className}>{formattedDateString}</div>;
}

export default DateFormatter;

