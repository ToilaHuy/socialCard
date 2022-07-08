import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import './Header.css';
import Stack from '@mui/material/Stack';
import images from '../assest/images';
import AddForm from '../features/Card/AddForm';
import { Link } from 'react-router-dom';
import { postAdded } from '../features/filter/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectRevert } from '../features/revert/revertSlice';
import cardsApi from '../features/api/cardsApi';
import { fetchCards } from '../features/Card/cardsSlice';
import { selectAllCards } from '../features/Card/cardsSlice';
import { addRevert, removeRevert } from '../features/revert/revertSlice';

const Header = () => {
    const [expanded, setExpanded] = useState(false);
    const [check, setCheck] = useState(false);
    const cards = useSelector(selectAllCards);
    const revert = useSelector(selectRevert);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const revertItem = revert[0];
    console.log(revertItem);
    const test = cards.length > 0 ? cards.slice(-1)[0]._id : [];
    if (check) {
        dispatch(addRevert(test));
        setCheck(false);
    }
    const handleClickOpen = () => {
        setExpanded(true);
        setCheck(false);
    };

    // const test = revert.length>1  ? revert.pop() : 'không có gì';
    // console.log('revert nè', test);

    const handleSearch = () => {
        dispatch(postAdded(search));
    };
    useEffect(() => {
        dispatch(postAdded(search));
    }, [search]);
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };
    const handleRevertClick = async () => {
        if (revert.length > 0) {
            await cardsApi.revertCard(revertItem);
            dispatch(removeRevert());
            dispatch(fetchCards());
        } else  alert('Bạn đã ở trạng thái ban đầu')
    };
    return (
        <div className="Header">
            <p style={{ fontSize: '35px', fontWeight: 'bold', marginTop: '50px', marginBottom: '30px' }}>
                LIST SOCIAL CARD
            </p>
            <Stack spacing={2} direction="row" justifyContent="flex-end">
                <Button variant="contained" id="btn-revert" onClick={handleRevertClick}>
                    {/* <Link style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }} to="/revert"> */}
                    Revert
                    {/* </Link> */}
                </Button>

                <Button onClick={handleClickOpen} variant="contained" id="btn-add">
                    Add New
                </Button>

                <AddForm
                    expanded={expanded}
                    handleClickClose={() => setExpanded(false)}
                    handleClickAdd={() => setCheck(true)}
                />
                <div className="search">
                    <input
                        placeholder="Search name... "
                        spellCheck={false}
                        className="search-input"
                        type="text"
                        onChange={handleSearchChange}
                    />
                    <div className="btn-search" onClick={handleSearch}>
                        <img src={images.search} alt="" />
                    </div>
                </div>
            </Stack>
            {/* <CardsList style={{ display: 'none' }} /> */}
        </div>
    );
};

export default Header;
