import React, { useEffect } from 'react';
import './CardsEx.css';
import { useDispatch, useSelector } from 'react-redux';
import CardsExcerpt from './CardsExcerpt';
import { selectAllCards, fetchCards } from './cardsSlice';
import { selectSearchPosts } from '../filter/filterSlice';
import { FilterList } from '../filter/FilterList';
import { selectRevert } from '../revert/revertSlice';
// import images from '../../assest/images';

const CardsList = () => {
    const search = useSelector(selectSearchPosts);
    const cards = useSelector(selectAllCards);

    console.log('card ở list', cards);
    let searchByName = cards.filter(
        (card) =>
            (card?.name?.toLowerCase().includes(search.filter) ||
                card?.description?.toLowerCase().includes(search.filter)) &&
            card.deleted === false,
    );
    let ListData = [];
    if (search.filter === '') {
        ListData = cards;
    } else if (searchByName.length === 0) {
        return <FilterList />;
    } else {
        ListData = searchByName;
    }
    let content = ListData.map((card) => (card.deleted === false ? <CardsExcerpt key={card._id} card={card} /> : ''));

    // let content = ListData.map((card) => <CardsExcerpt key={card._id} card={card} />);
    return <section className="container">{content}</section>;
};

export default CardsList;
