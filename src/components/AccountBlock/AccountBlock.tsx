import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as api from 'api/api';
import { useSelector } from 'react-redux';
import { selectors } from 'store';
import Spinner from 'components/Spinner';
import {BattingObject, BattingSummaryProps} from 'components/BattingSummary';
import BattingSummary from 'components/BattingSummary';

enum Tab {
  BATTING = 'batting',
  REPORTS = 'reports',
  COMPARISON = 'comparison',
}

enum BattingTab {
  SUMMARY = 'summary',
  CHARTS = 'charts',
  LOG = 'log',
}

function AccountBlock() {
  const [activeTab, setActiveTab] = useState(Tab.BATTING);
  const [battingTab, setBattingTab] = useState(BattingTab.SUMMARY);
  const [battingSummary, setBattingSummary] = useState<BattingSummaryProps>();
  const user = useSelector(selectors.auth.selectUser);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user.id) {
      switch (activeTab) {
        case Tab.BATTING:
          setIsLoading(true);
          switch (battingTab) {
            case BattingTab.SUMMARY:
              api.getBattingSummary(user.id.toString()).then((response) => {
                setBattingSummary(response.data.data.batting_summary);
                setIsLoading(false);
              });
              break;
            case BattingTab.CHARTS:
              
              break;
            case BattingTab.LOG:
  
              break;
            default: return;
          }
          break;
        case Tab.REPORTS:
  
          break;
        case Tab.COMPARISON:
  
          break;
        default: return;
      }
    }
  }, [activeTab, battingTab, user.id]);

  function getMaxValueByPropName(array: Record<string, string | number | null>[] = [], prop: string) {
    return array.reduce((acc, item) => {
      const value = Number(item[prop as keyof typeof item]);
      return value > acc ? value : acc;
    }, 0);
  }

  return (
    <Root>
      <Wrapper>
        <Block>
          <BlockHeader>Top Batting Values</BlockHeader>
          <FlexContainer>
            <BattingCategoryWrapper>
              <BattingCategoryHeader>
                <BattingCategory>Exit Velocity</BattingCategory>
                <BattingValue>{getMaxValueByPropName(battingSummary?.top_values, 'exit_velocity') || 'N/A'}</BattingValue>
              </BattingCategoryHeader>
              <ProgressBar></ProgressBar>
            </BattingCategoryWrapper>
            <BattingCategoryWrapper>
              <BattingCategoryHeader>
                <BattingCategory>Carry Distance</BattingCategory>
                <BattingValue>{getMaxValueByPropName(battingSummary?.top_values, 'distance') || 'N/A'}</BattingValue>
              </BattingCategoryHeader>
              <ProgressBar></ProgressBar>
            </BattingCategoryWrapper>
            <BattingCategoryWrapper>
              <BattingCategoryHeader>
                <BattingCategory>Launch Angle</BattingCategory>
                <BattingValue>{getMaxValueByPropName(battingSummary?.top_values, 'launch_angle') || 'N/A'}</BattingValue>
              </BattingCategoryHeader>
              <ProgressBar></ProgressBar>
            </BattingCategoryWrapper>
          </FlexContainer>
        </Block>
        <Block>
          <BlockHeader>Recent Session Reports</BlockHeader>
          <BlockText>No data currently linked to this profile</BlockText>
        </Block>
      </Wrapper>
      <Block>
        <TabList>
          <TabItem>
            <ChangeBtn $isActive={activeTab === Tab.BATTING} onClick={() => setActiveTab(Tab.BATTING)}>Batting</ChangeBtn>
            <BattingOptions>
              <li>
                <BattingOptionBtn onClick={() => setBattingTab(BattingTab.SUMMARY)}>Summary</BattingOptionBtn>
              </li>
              <li>
                <BattingOptionBtn onClick={() => setBattingTab(BattingTab.CHARTS)}>Charts</BattingOptionBtn>
              </li>
              <li>
                <BattingOptionBtn onClick={() => setBattingTab(BattingTab.LOG)}>Log</BattingOptionBtn>
              </li>
            </BattingOptions>
          </TabItem>
          <TabItem>
            <ChangeBtn $isActive={activeTab === Tab.REPORTS} onClick={() => setActiveTab(Tab.REPORTS)}>Session Reports</ChangeBtn>
          </TabItem>
          <TabItem>
            <ChangeBtn $isActive={activeTab === Tab.COMPARISON} onClick={() => setActiveTab(Tab.COMPARISON)}>Сomparison</ChangeBtn>
          </TabItem>
        </TabList>
        <Content>
          {activeTab === Tab.BATTING && battingSummary ?
            <BattingSummary {...battingSummary}/>
            :
            <ContentEmptyText>There's no info yet!</ContentEmptyText> 
           }
           {isLoading && <Spinner />}
          {/* <ContentEmptyText>There's no info yet!</ContentEmptyText> */}
        </Content>
      </Block>
    </Root>
  );
}

export default AccountBlock;

const Root = styled.div`
  padding: 16px;
  flex-grow: 1;
  overflow: auto;
`

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Block = styled.div`
  margin-bottom: 32px;
  padding: 16px;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  flex-grow: 1;
  box-sizing: border-box;
  @media(min-width: 1660px) {
    flex-wrap: nowrap;
    width: auto;
    &:first-child {
      margin-right: 32px;
      flex-grow: 20;
    }
    &:nth-child(2) {
      flex-grow: 1;
    }
  }
`

const BlockHeader = styled.h2`
  margin-bottom: 16px;
  line-height: 1.25;
  font-size: 18px;
  font-weight: 900;
  color: #414f5a;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: stretch;
  flex-grow: 1;
`

const BattingCategoryWrapper = styled.div`
  max-width: 324px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-grow: 1;
  &:not(:last-child) {
    margin-right: 24px;
  }
`

const BattingCategoryHeader = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
`

const BattingCategory = styled.p`
  font-size: 16px;
  color: #667784;
`

const BattingValue = styled.p`
  font-size: 16px;
  color: #667784;
  font-weight: 700;
`

const ProgressBar = styled.div`
  max-width: 100%;
  height: 4px;
  background-color: #eff1f3;
`

const BlockText = styled.p`
  color: #667784;
  font-size: 16px;
`

const TabList = styled.ul`
  margin-bottom: 15px;
  display: flex;
  list-style: none;
`

const TabItem = styled.li`
  margin: 8px;
  position: relative;
  &:hover ul {
    display: block;
  }
  &::after {
    content: '';
    position: absolute;
    height: 3px;
    left: 0;
    right: 0;
    bottom: -3px;
  }
`

const ChangeBtn = styled.button<{$isActive?: boolean}>`
  padding: 8px;
  font-size: 14px;
  line-height: 17px;
  font-weight: 700;
  ${({ $isActive }) => $isActive
    ? `color: #fff;
      background-color: #788b99;` 
    : `color: #667784; `
  }
  border: 2px solid #788b99;
  border-radius: 40px;
  &:hover {
    color: #788b99;
    background: rgba(120,139,153,.4);
  }
`

const BattingOptions = styled.ul`
  padding: 8px 0;
  min-width: 178px;
  display: none;
  list-style: none;
  position: absolute;
  left: 0;
  top: 40px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 3px 8px 0 rgb(0 0 0 / 15%);
  border: solid 1px #ebebeb;
`

const BattingOptionBtn = styled.button`
  padding: 8px 16px;
  width: 100%;
  text-align: left;
  color: #788b99;
  &:hover {
    background-color: rgba(72, 187, 255, 0.1);
  }
`

const Content = styled.div`
  width: 100%;
  // min-height: 420px;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  // color: #667784;
  // font-size: 16px;
  position: relative;
`
 
const ContentEmptyText = styled.p`
  color: #667784;
  font-size: 16px;
`