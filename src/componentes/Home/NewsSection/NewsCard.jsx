import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/styles/componentes/Home/NewsSection/NewsCard.scss'

export default function NewsCard ({title,content,image, date}) {
    return (
    <div className='newsCard'>
      <img src={image} alt={`imagen noticia ${title}`} />
      <div className="newsCard__info">
        <div className="newsCard__date">{date}</div>
        <div className="newsCard__title">{title}</div>
        <div className="newsCard__content">{content}</div>
        <Link to='/'>Leer más</Link>
      </div>
    </div>
);
};