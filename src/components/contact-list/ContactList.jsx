import css from './ContactList.module.css';
import PropTypes from 'prop-types';

export const ContactList = props => {
  return (
    <div>
        <ul className={css.contactsList}>
          {props.contacts.map(contact => (
            <li className={css.contactItem} key={contact.id}>
              {`${contact.name}: `}
              <span className={css.contactItemNumer}>{contact.number}</span>
              <button
                className={css.contactItemDeleteBtn}
                onClick={() => props.deleteContact(contact.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
