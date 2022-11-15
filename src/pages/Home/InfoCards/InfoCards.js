import React from 'react';
import clock from '../../../assets/icons/clock.svg';
import marker from '../../..//assets/icons/marker.svg';
import phone from '../../../assets/icons/phone.svg';
import InfoCard from './InfoCard';

const InfoCards = () => {

    const cardData = [
        {
            id: 1,
            icon: clock,
            title: 'Opening Hours',
            desciption: '10am to 8pm for everyday of the week except Sunday',
            bgClass: 'bg-gradient-to-r from-primary to-secondary'
        },
        {
            id: 2,
            icon: marker,
            title: 'Out Location',
            desciption: 'Brooklyn, NY 10036, United States',
            bgClass: 'bg-accent'
        },
        {
            id: 3,
            icon: phone,
            title: 'Contact Us',
            desciption: '+000 123 456789',
            bgClass: 'bg-gradient-to-r from-secondary to-primary'
        },
    ]

    return (
        <div>
            <div className='grid gap-6 mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:mx-10'>
                {
                    cardData.map(card => <InfoCard
                        key={card.id}
                        card={card}
                    ></InfoCard>)
                }
            </div>
        </div>
    );
};

export default InfoCards;