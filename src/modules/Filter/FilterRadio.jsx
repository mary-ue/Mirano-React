export const FilterRadio = ({handleTypeChange, data, type}) => {
  return (
    <>
      <input
        className="filter__radio"
        type="radio"
        name="type"
        defaultValue={data.value}
        id={data.value}
        checked={type === data.value}
        onChange={handleTypeChange}
      />
      <label className={`filter__label filter__label_${data.value}`} htmlFor={data.value}>
        {data.title}
      </label>
    </>
  );
};
