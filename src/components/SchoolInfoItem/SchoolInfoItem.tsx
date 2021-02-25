import React from 'react';
import styled from 'styled-components';

interface SchoolInfoItemProps {
  category: string;
  content: string | string[];
}

function SchoolInfoItem({category, content}: SchoolInfoItemProps) {
  return (
    <li>
      <SchoolInfoCategory>{category}</SchoolInfoCategory>
      <InfoText>{Array.isArray(content) ? content.join(', ') : content}</InfoText>
    </li>
  );
}

export default SchoolInfoItem;

const SchoolInfoCategory = styled.p`
  margin-bottom: 3px;
  font-size: 14px;
  line-height: 17px;
  font-weight: 300;
  color: #667784;
`

const InfoText = styled.p`
  font-size: 16px;
  color: #667784;
  margin-bottom: 11px;
`