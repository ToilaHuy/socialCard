import React from 'react';
import './CardsEx.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import images from '../../assest/images';
import { useState } from 'react';
import EditForm from './EditFrom';
import RemoveFrom from './RemoveForm';
import { Link } from 'react-router-dom';
import image from '../../assest/images/Image 1.png';

const CardsExcerpt = ({ card }) => {
    // window.location.reload();
    const [edit, setEdit] = useState(false);
    const [remove, setRemove] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [editId, setEditId] = useState('');

    const handleRemove = (id) => {
        setRemove(true);
        setDeleteId(id);
    };
    const handleEdit = (id) => {
        setEdit(true);
        setEditId(id);
    };

    const date = new Date(card.createdAt);
    const dateAt = ` ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return (
        <Card sx={{ maxWidth: 370, borderRadius: '10px', boxShadow: '0px 3px 6px #00000029' }}>
            <CardHeader
                className="card-header"
                avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={card.avatar} />}
                action={
                    <div style={{ display: 'flex', marginTop: '4px', alignItems: 'center' }}>
                        <div style={{ marginRight: '17px', cursor: 'pointer' }} onClick={() => handleEdit(card._id)}>
                            <img src={images.pencil} alt="pencil" />
                        </div>
                        {editId && <EditForm edit={edit} handleClickClose={() => setEdit(false)} editId={editId} />}
                        <div style={{ cursor: 'pointer' }} onClick={() => handleRemove(card._id)}>
                            <img src={images.trash} alt="trash" />
                        </div>
                        {deleteId && (
                            <RemoveFrom remove={remove} handleClickClose={() => setRemove(false)} deleteId={deleteId} />
                        )}
                    </div>
                }
                title={card.name}
                subheader={dateAt}
            />
            <CardContent className={CardContent}>
                <Typography variant="body2" color="text.secondary" className={'description'}>
                    {card.description}
                </Typography>
            </CardContent>
            <Link to={`/single/${card._id}`}>
                <CardMedia component="img" height="194" image={card.image || image} alt="Paella dish" />
            </Link>
        </Card>
    );
};

export default CardsExcerpt;
