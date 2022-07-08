import React, { useEffect, useState } from 'react';
import './SinglPage.css';
import heart from '../../assest/images/heart-solid@2x.png';
import message from '../../assest/images/message-solid@2x.png';
import { useParams } from 'react-router-dom';
import cardsApi from '../api/cardsApi';
import commentsApi from '../api/commentsApi';
import image from '../../assest/images/Image 1@2x.png';
import { useNavigate } from 'react-router-dom';
import { fetchCards } from './cardsSlice';
import { useDispatch } from 'react-redux';

const SingleCardPage = () => {
    const path = useParams();
    const dispatch = useDispatch();

    const [huy, setHuy] = useState('');
    const [comments, setComments] = useState([]);
    const [saveComment, setSaveComment] = useState('');
    const [hidden, setHidden] = useState();
    const [count, setCount] = useState(0);

    let navigate = useNavigate();
    useEffect(() => {
        getData();
        getDataCmt();

        function getDataCmt() {
            commentsApi
                .getAll(path.id)
                .then((response) => setComments(response))
                .catch((error) => console.log(error));
        }
        async function getData() {
            cardsApi
                .get(path.id)
                .then((response) =>
                    response.deleted === false ? setHuy(response) : dispatch(fetchCards()) && navigate('/'),
                )
                .catch((error) => console.log(error));
        }
    }, [saveComment, huy.heart]);

    // useEffect(() => {
    //     commentsApi
    //         .getAll(path.id)
    //         .then((response) => setComments(response))
    //         .catch((error) => console.log(error));
    // }, [saveComment]);

    const handleChangeInput = (e) => {
        setHidden('');
        setSaveComment(e.target.value);
    };
    const handleSubmit = async () => {
        if (!saveComment) {
            setHidden('hiddenS');
        } else {
            const Data = {
                cardId: path.id,
                description: saveComment,
            };
            await commentsApi.addCard(Data);
            setHidden('');
            huy ? setSaveComment('') : navigate('/');
        }
    };
    const convertDate = (day) => {
        const date = new Date(day);
        const dateAt = ` ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return dateAt;
    };

    const listComments = comments.map((comment, index) => (
        <li className="list-commnet-item" key={index}>
            <div className="date-list">{convertDate(comment?.createdAt)}</div>
            <div> {comment.description}</div>
        </li>
    ));

    // const content = comments.find((user) => user.cardId === path.id);

    const handleCounter = async () => {
        try {
            await cardsApi.updateHeart(path.id);
            setHuy({ ...huy, heart: huy.heart + 1 });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container-single">
            <div className="text-header">SOCIAL CARD DETAIL</div>

            <div className="avatar-container">
                <div>
                    <img src={huy.avatar} className="avatar" alt="" />
                </div>
                <div style={{ marginLeft: '15px' }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{huy.name}</div>
                    <div style={{ fontSize: '15px', color: '#5B7083', marginTop: '5px' }}>
                        {convertDate(huy.createdAt)}
                    </div>
                </div>
            </div>

            <div className="des-single">{huy.description}</div>

            <div>
                <img className="img-single" src={huy.image || image} alt="hehe" />
            </div>
            <div className="reactions-single">
                <div className="reactions-item" onClick={handleCounter}>
                    <img src={heart} alt="" />
                    <div className="counter-reactions">{huy.heart}</div>
                </div>
                <div className="reactions-item">
                    <img src={message} alt="" />
                    <div className="counter-reactions">{comments.length}</div>
                </div>
            </div>
            <div className="hr-single"></div>

            <div className="list-comment">
                <ul className="list-commnet-ul"> {listComments}</ul>
            </div>
            <div className="hr-single"></div>

            <div className="input-group">
                <div className="input-title">Post a new coment</div>

                <div style={{ position: 'relative' }}>
                    <form>
                        <textarea
                            type="text"
                            className={`fname1 ${hidden}`}
                            name="fname"
                            value={saveComment}
                            placeholder="Add comment..."
                            onChange={handleChangeInput}
                        />
                        <button type="button" className="inputbtn" onClick={handleSubmit}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SingleCardPage;
