import React from 'react';
import images from '../../assest/images';
export const FilterList = () => {
    const styles = {
        filterList: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '1366px',
            margin: 'auto',
            marginTop: '70px',
        },
        text: {
            marginTop: '20px',
            color: '#064EBC',
            fontSize: '25px',
            fontWeight: 'bold',
        },
        text1: {
            marginTop: '10px',
            fontSize: '18px',
            color: '#000000',
            fontWeight: 'bold',
        },
    };

    return (
        <div style={styles.filterList}>
            <img src={images.search1} alt="" />
            <div style={styles.text}>No Results Found</div>
            <div style={styles.text1}>No content matched your criteria. Try searching for something else.</div>
        </div>
    );
};
