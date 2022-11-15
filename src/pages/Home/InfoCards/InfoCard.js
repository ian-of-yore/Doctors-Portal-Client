import React from 'react';

const InfoCard = ({ card }) => {
    const { icon, title, desciption, bgClass } = card;
    return (
        <div className={`card card-side items-center pl-10 shadow-xl ${bgClass} text-white`}>
            <figure><img src={icon} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{desciption}</p>
            </div>
        </div>
    );
};

export default InfoCard;