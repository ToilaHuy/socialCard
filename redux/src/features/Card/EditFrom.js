import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

import images from '../../assest/images';
import { useDispatch } from 'react-redux';
import { editCard } from './cardsSlice';
import cardsApi from '../api/cardsApi';

const EditForm = ({ edit, handleClickClose, editId }) => {
    // const AddForm = ({ expanded }) => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const Input = styled('input')({
        display: 'none',
    });

    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [srcimg, setSrcimg] = useState(images.upload);
    const [hidden, setHidden] = useState('');
    const [hidden2, setHidden2] = useState('');
    const [hidden3, setHidden3] = useState('');
    const canSave = [avatar, name, description].every(Boolean);

    const [getAvatar, setGetAvatar] = useState('');
    const [getImage, setgetImage] = useState('');
    const [firtAvatar, setFirtAvatar] = useState('');
    const [firtImage, setFirtImage] = useState('');
    const [firtName, setFirtName] = useState('');
    const [firtDescription, setFirtDescription] = useState('');

    useEffect(() => {
        cardsApi
            .get(editId)
            .then((response) => {
                setName(response.name);
                setAvatar(response.avatar);
                setFirtAvatar(response.avatar);
                setDescription(response.description);
                setImage(response.image);
                setFirtImage(response.image);
                setFirtName(response.name);
                setFirtDescription(response.description);
            })
            // .then((response) => console.log(response))
            .catch((error) => console.log(error));
    }, []);

    const handleChangeAvatar = (file) => {
        setHidden('');
        setSrcimg(images.upload);
        const fileType = file.type;
        console.log(fileType);
        if (fileType === 'image/jpeg' || fileType === 'image/png') {
            setGetAvatar(file);
            setAvatar(file.name);
            console.log(getAvatar);
        } else {
            setGetAvatar('');
            setAvatar('');
            alert('file không hỗ trợ');
        }
    };

    const handleChangeImage = (file) => {
        const fileType = file.type;
        if (fileType === 'image/jpeg' || fileType === 'image/png') {
            setgetImage(file);
            setImage(file.name);
            console.log(getImage);
        } else {
            setgetImage('');
            setImage('');
            alert('file không hỗ trợ');
        }
    };

    const handleInputChange = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value);
            setHidden2('');
        }
        if (e.target.name === 'description') {
            setDescription(e.target.value);
            setHidden3('');
        }
    };
    console.log(canSave);
    async function handleOnsubmit(event) {
        console.log(canSave);
        if (canSave) {
            try {
                event.preventDefault();
                // const form = event.currentTarget;
                // const avatarFile = form.avatar.files[0];
                // const imageFile = form.image.files[0];

                const formData1 = new FormData();
                formData1.append('upload_preset', 'upload');
                formData1.append('file', getAvatar);

                const formData2 = new FormData();
                formData2.append('upload_preset', 'upload');
                formData2.append('file', getImage);
                const [res1, res2] = await Promise.all([
                    getAvatar
                        ? axios.post('https://api.cloudinary.com/v1_1/dbwudkncb/upload', formData1, {
                              headers: {
                                  'Content-Type': 'multipart/form-data',
                              },
                          })
                        : '',
                    getImage
                        ? axios.post('https://api.cloudinary.com/v1_1/dbwudkncb/upload', formData2, {
                              headers: {
                                  'Content-Type': 'multipart/form-data',
                              },
                          })
                        : '',
                ]);
                const newCard = {
                    id: editId,
                    avatar: getAvatar ? res1.data.url : avatar,
                    name: name,
                    description: description,
                    image: getImage ? res2.data.url : image,
                };
                await dispatch(editCard(newCard));
                setGetAvatar('');
                setgetImage('');
                handleClickClose();
                console.log('Sửa thành công');
            } catch (error) {
                console.log(error);
            }
        } else {
            name ? setHidden2('') : setHidden2('hidden');
            avatar ? setHidden('') : setHidden('hidden');
            avatar ? setSrcimg(images.upload) : setSrcimg(images.uploadRed);
            description ? setHidden3('') : setHidden3('hidden');
            event.preventDefault();
            // avatar ? setSrcimg(images.upload) : setSrcimg(images.uploadRed);
        }
    }

    const handleClickCloseAdd = () => {
        handleClickClose();
        setHidden2('');
        setHidden('');
        setHidden3('');
        setSrcimg(images.upload);
        setAvatar(firtAvatar);
        setImage(firtImage);
        setName(firtName);
        setDescription(firtDescription);
    };

    return (
        <Dialog
            id="popup-dialog"
            open={edit}
            onClose={() => {
                handleClickClose();
                setHidden2('');
                setHidden('');
                setHidden3('');
                setSrcimg(images.upload);
                setAvatar(firtAvatar);
                setImage(firtImage);
                setName(firtName);
                setDescription(firtDescription);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <form onSubmit={handleOnsubmit}>
                <DialogTitle id="alert-dialog-title" className="dialog-title">
                    {'Edit card'}
                </DialogTitle>
                <DialogContent sx={{ fontSize: '16px', paddingBottom: '16px' }}>
                    <Stack direction="row" alignItems="center" spacing={6.25} className={hidden}>
                        <div>
                            Avatar <i>*</i>
                        </div>
                        <label htmlFor="contained-button-file">
                            <Input
                                accept="image/*"
                                id="contained-button-file"
                                type="file"
                                name="avatar"
                                onChange={(e) => handleChangeAvatar(e.target.files[0])}
                            />

                            <div style={{ height: '20px', display: 'flex' }}>
                                <img src={srcimg} alt="" />
                                <div
                                    style={{
                                        marginLeft: '11px',
                                        lineHeight: '20px',
                                        width: '250px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {avatar || 'Upload image'}
                                </div>
                            </div>
                        </label>
                    </Stack>
                    <Stack mt={2} direction="row" alignItems="center" spacing={6.625} className={hidden2}>
                        <div>
                            Name <i>*</i>
                        </div>
                        <input
                            spellCheck={false}
                            type="text"
                            className="inputadd "
                            onChange={handleInputChange}
                            name="name"
                            value={name}
                        />
                    </Stack>
                    <Stack mt={2} direction="row" alignItems="center" spacing={1.875} className={hidden3}>
                        <div>
                            Description <i>*</i>
                        </div>
                        <textarea
                            value={description}
                            spellCheck={false}
                            className="inputadd"
                            onChange={handleInputChange}
                            name="description"
                        />
                    </Stack>
                    <Stack mt={2} direction="row" alignItems="center" spacing={7.75}>
                        <div> Image</div>
                        <label htmlFor="contained-button-file-img">
                            <Input
                                accept="image/*"
                                id="contained-button-file-img"
                                type="file"
                                name="image"
                                onChange={(e) => handleChangeImage(e.target.files[0])}
                            />
                            <div style={{ height: '20px', display: 'flex' }} component="span">
                                <img src={images.upload} alt="" />
                                <span
                                    style={{
                                        marginLeft: '11px',
                                        lineHeight: '20px',
                                        width: '250px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {image || 'Upload image'}
                                </span>
                            </div>
                        </label>
                    </Stack>
                    <span className="hr"></span>
                </DialogContent>

                <DialogActions mb={10}>
                    <Button id="btn_save" variant="contained" type="submit">
                        Save
                    </Button>
                    <Button id="btn_cancel" variant="contained" onClick={handleClickCloseAdd} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditForm;
