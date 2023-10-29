import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

// https://react.dev/reference/react/forwardRef
const RouterLink = forwardRef(({ href, ...other }, ref) => <Link ref={ref} to={href} {...other} />);

RouterLink.propTypes = {
  href: PropTypes.string,
};

export default RouterLink;
