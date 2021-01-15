import React from 'react';
import { parseISO, format } from 'date-fns';

export default function DateFormatter({ dateString, formatString, ...props }) {
  const date = parseISO(dateString)
  const formattedDateString = format(date, formatString)
  return (
    <time {...props}>
      {formattedDateString}
    </time>
  )
}
