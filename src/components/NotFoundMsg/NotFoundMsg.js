import PropTypes from 'prop-types';

export default function NotFoundMsg({ msg }) {
  return <h2>{msg}</h2>;
}

NotFoundMsg.propTypes = {
  msg: PropTypes.string.isRequired,
};
