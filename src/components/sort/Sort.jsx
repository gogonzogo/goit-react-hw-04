import css from './Sort.module.css';

export const Sort = ({
  title,
  value,
  isChecked,
  margin,
  optionOne,
  optionTwo,
  handleSortChange,
  contacts,
}) => {
  const onChange = event => {
    const value = event.target.dataset.value;
    const checked = event.target.checked;

    // if checked is false then make it

    handleSortChange(value, checked);
  };

  return (
    <>
      {contacts.length > 1 && (
        <div
          className={css.sortContainer}
          style={margin ? { marginLeft: margin } : null}
        >
          {title && <p className={css.sortTitle}>{title}</p>}
          <div className={css.sortOptionContainer}>
            <p className={css.sortOption}>{optionOne}</p>
            <div className={css.sortWrapper}>
              <label className={css.switch}>
                <input
                  onChange={onChange}
                  data-value={value}
                  checked={isChecked}
                  type="checkbox"
                ></input>
                <span className={css.sliderRound}></span>
              </label>
            </div>
            <p className={css.sortOption}>{optionTwo}</p>
          </div>
        </div>
      )}
    </>
  );
};
