import React from 'react';
import './CardsEx.css';
import { useSelector } from 'react-redux';
import CardsExcerpt from './CardsExcerpt';
import { selectAllCards } from './cardsSlice';
import { selectSearchPosts } from '../filter/filterSlice';
import { FilterList } from '../filter/FilterList';
// import images from '../../assest/images';

const CardsList = () => {
    const search = useSelector(selectSearchPosts);
    const cards = useSelector(selectAllCards);
    let searchByName = cards.filter(
        (card) =>
            (card?.name?.includes(search.filter) || card?.description?.includes(search.filter)) &&
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
