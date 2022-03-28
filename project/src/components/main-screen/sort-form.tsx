/* eslint-disable no-console */
import {useState, MouseEvent} from 'react';
import {SortOption} from '../../settings/sort-options';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import { changeSortOption } from '../../store/interface-process/interface-process';
import React from 'react';


function SortForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isOpened, setOpenedStatus] = useState(false);

  const handlerOptionClick = React.useCallback((evt:MouseEvent<HTMLLIElement>) => dispatch(changeSortOption(evt.currentTarget.id)), []);
  const handlerSortFormCLick = React.useCallback(() => setOpenedStatus(!isOpened), []);

  const sortOption = useAppSelector(({INTERFACE}) => INTERFACE.sortOption);
  const placesOptions = Array.from(Object.values(SortOption));

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
