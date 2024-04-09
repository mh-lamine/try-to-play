import PropTypes from "prop-types";

export default function ValidationText({ loading, hasFeated }) {
  return (
    <div className="absolute">
      {loading ? (
        <h2>checking featuring...</h2>
      ) : hasFeated ? (
        <h2>Le feat existe</h2>
      ) : (
        <h2>ah batard tu mens</h2>
      )}
    </div>
  );
}

ValidationText.propTypes = {
  loading: PropTypes.bool.isRequired,
  hasFeated: PropTypes.bool.isRequired,
};
