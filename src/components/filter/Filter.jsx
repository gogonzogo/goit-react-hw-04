import css from './Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = (props) => {
    return (
      <div className={css.filterContainer}>
        <p className={css.filterTitle}>Find contacts by name or number</p>
        <input
          className={css.filterInput}
          type="text"
          onChange={props.filterContacts}
          value={props.filter}
        ></input>
      </div>
    );
  }

Filter.propTypes = {
  filterContacts: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
}