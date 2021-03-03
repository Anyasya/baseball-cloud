import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

interface PaginationProps {
  availableItems: number;
  profilesCount: number;
}

function Pagination({availableItems, profilesCount}: PaginationProps) {
  const ButtonsNumber = Math.ceil(availableItems/profilesCount);

  return (
    <List>
    </List>
  );
}

export default Pagination;

const List = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 16px 0;
  position: sticky;
  bottom: 0;
`

const Item = styled.li`
  padding: 6px 12px;
  line-height: 1.42857143;
  color: #414f5a;
  border-radius: 4px;
  margin: 0 2px;
  background-color: #f7f8f9;
`