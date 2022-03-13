/* eslint-disable no-console */
import {useState, MouseEvent} from 'react';
import {SortOptions} from '../../settings/sort-options';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {changeSortOption} from '../../store/action';


function SortForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isOpened, setOpenedStatus] = useState(false);
  const handlerSortFormCLick = () => {
    setOpenedStatus(!isOpened);
 };

  const sortOption = useAppSelector((state) => state.sortOption);
  const placesOptions = Array.from(Object.values(SortOptions));
  const handlerOptionClick = (evt:MouseEvent<HTMLLIElement>) => {
    dispatch(changeSortOption(evt.currentTarget.id));
  };

  return (
    <form className="places__sorting" action="#" method="get" onClick={handlerSortFormCLick}>
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        {sortOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom places__options${isOpened ? '--opened' : ''}`}>
        {
          placesOptions.map((option) =>
            (
              <li id={option} className={`places__option ${sortOption === option ? 'places__option--active' : ''} `} tabIndex={0} onClick={handlerOptionClick} key={option}>{option}</li>
            ),
          )
        }
      </ul>
    </form>
  );
}

export default SortForm;