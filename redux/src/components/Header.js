import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import './Header.css';
import Stack from '@mui/material/Stack';
import images from '../assest/images';
import AddForm from '../features/Card/AddForm';
import { Link } from 'react-router-dom';
import { postAdded } from '../features/filter/filterSlice';
import { useDispatch } from 'react-redux';

const Header = () => {
    const [expanded, setExpanded] = useState(false);
    const handleClickOpen = () => {
        setExpanded(true);
    };

    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const handleSearch = () => {
        dispatch(postAdded(search));
    };
    useEffect(() => {
        dispatch(postAdded(search));
    }, [search]);
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };
    return (
        <div className="Header">
            <p style={{ fontSize: '35px', fontWeight: 'bold', marginTop: '50px', marginBottom: '30px' }}>
                LIST SOCIAL CARD
            </p>
            <Stack spacing={2} direction="row" justifyContent="flex-end">
                <Button variant="contained" id="btn-revert">
                    <Link style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }} to="/revert">
                        Revert
                    </Link>
                </Button>

                <Button onClick={handleClickOpen} variant="contained" id="btn-add">
                    Add New
                </Button>

                <AddForm expanded={expanded} handleClickClose={() => setExpanded(false)} />
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
