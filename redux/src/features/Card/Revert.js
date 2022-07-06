import React from 'react';
import { selectAllCards } from './cardsSlice';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';

import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import images from '../../assest/images';

import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { revertUndo, deleteCard, fetchCards } from './cardsSlice';
import { useDispatch } from 'react-redux';
const Revert = () => {
    const dispatch = useDispatch();
    const cards = useSelector(selectAllCards);
    const handleRemove = async (id) => {
        await dispatch(deleteCard(id));
        await dispatch(fetchCards());
    };
    const handleRevert = async (id) => {
        await dispatch(revertUndo(id));
        await dispatch(fetchCards());
    };
    console.log(cards);
    const convertDate = (day) => {
        const date = new Date(day);
        const dateAt = ` ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        return dateAt;
    };
    const cardArray = Array.isArray(cards) ? cards.slice() : [];

    const renderedPosts = cardArray.map((card, index) =>
        card.deleted ? (
            <Card key={index} sx={{ maxWidth: 370, borderRadius: '10px', boxShadow: '0px 3px 6px #00000029' }}>
                <CardHeader
                    className="card-header"
                    avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={card.avatar} />}
                    action={
                        <div style={{ display: 'flex', marginTop: '4px', alignItems: 'center' }}>
                            <div
                                style={{ marginRight: '17px', cursor: 'pointer' }}
                                onClick={() => handleRevert(card._id)}
                            >
                                <img src={images.pencil} alt="pencil" />
                            </div>

                            <div style={{ cursor: 'pointer' }} onClick={() => handleRemove(card._id)}>
                                <img src={images.trash} alt="trash" />
                            </div>
                        </div>
                    }
                    title={card.name}
                    subheader={convertDate(card.createdAt)}
                />
                <CardContent className={CardContent}>
                    <Typography variant="body2" color="text.secondary" className={'description'}>
                        {card.description}
                    </Typography>
                </CardContent>
                <Link to={`/single/${card._id}`}>
                    <CardMedia component="img" height="194" image={card.image} alt="Paella dish" />
                </Link>
            </Card>
        ) : (
            ''
        ),
    );

    return <section className="container">{renderedPosts}</section>;
};

export default Revert;
