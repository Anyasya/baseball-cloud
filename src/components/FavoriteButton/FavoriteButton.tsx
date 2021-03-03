import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as SolidHeart} from '@fortawesome/free-solid-svg-icons';
import { faHeart as RegularHeart} from '@fortawesome/free-regular-svg-icons';

interface FavoriteButtonProps {
  id: string;
  favorite: boolean;
  onClick: (id: string, favorite: boolean) => void;
}

function FavoriteButton({favorite, id, onClick}: FavoriteButtonProps) {
  return (
    <button type='button' onClick={() => onClick(id, !favorite)}>
      {favorite ? <FontAwesomeIcon icon={SolidHeart} color={'#48bbff'}/> : <FontAwesomeIcon icon={RegularHeart} color={'#48bbff'}/>}
    </button>
  );
}

export default FavoriteButton;