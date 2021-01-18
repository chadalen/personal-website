import React from 'react';
import { parseISO, format } from 'date-fns';
import PropTypes from 'prop-types';

export default function DateFormatter({ dateString, formatString, className }) {
  const date = parseISO(dateString);
  const formattedDateString = format(date, formatString);
  return <time className={className}>{formattedDateString}</time>;
}

DateFormatter.propTypes = {
  dateString: PropTypes.string.isRequired,
  formatString: PropTypes.string.isRequired,
  className: PropTypes.string,
};

DateFormatter.defaultProps = {
  className: '',
};
