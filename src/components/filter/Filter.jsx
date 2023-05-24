import css from './Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({filter, filterContacts, contacts}) => {
  return (
    <>
      {contacts.length > 1 && (
        <div className={css.filterContainer}>
          <p className={css.filterTitle}>Find contacts by name or number</p>
          <input
            className={css.filterInput}
            type="text"
            onChange={filterContacts}
            value={filter}
          ></input>
        </div>
      )}
    </>
  );
};

Filter.propTypes = {
  filterContacts: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  contacts: PropTypes.array.isRequired,
};
