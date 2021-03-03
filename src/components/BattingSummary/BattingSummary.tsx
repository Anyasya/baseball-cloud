import React from 'react';
import styled from 'styled-components';

export type BattingObject = {
  id: null, 
  distance: number, 
  pitch_type: string, 
  launch_angle: number, 
  exit_velocity: number,
}

export interface BattingSummaryProps {
  average_values: BattingObject[];
  top_values: BattingObject[];
}

function BattingSummary(battingValues: BattingSummaryProps) {
  return (
    <>
      <Table>
        <TableCaption>Top Batting Values</TableCaption>
        <thead>
          <TableRow>
            <ColumnHeader>Pitch Type</ColumnHeader>
            <ColumnHeader>Distance</ColumnHeader>
            <ColumnHeader>Launch Angle</ColumnHeader>
            <ColumnHeader>Exit Velocity</ColumnHeader>
          </TableRow>
        </thead>
        <tbody>
          {battingValues.top_values.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableData>{item.pitch_type}</TableData>
                <TableData>{item.distance}</TableData>
                <TableData>{item.launch_angle}</TableData>
                <TableData>{item.exit_velocity}</TableData>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
      <Table>
        <TableCaption>Average Batting Values</TableCaption>
        <thead>
          <TableRow>
            <ColumnHeader>Pitch Type</ColumnHeader>
            <ColumnHeader>Distance</ColumnHeader>
            <ColumnHeader>Launch Angle</ColumnHeader>
            <ColumnHeader>Exit Velocity</ColumnHeader>
          </TableRow>
        </thead>
        <tbody>
          {battingValues.average_values.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableData>{item.pitch_type}</TableData>
                <TableData>{item.distance}</TableData>
                <TableData>{item.launch_angle}</TableData>
                <TableData>{item.exit_velocity}</TableData>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default BattingSummary;

const Table = styled.table`
  margin-bottom: 30px;
  width: 100%;
`

const TableCaption = styled.caption`
  font-size: 18px;
  line-height: 1.25;
  text-align: left;
`

const ColumnHeader = styled.th`
  margin-bottom: 6px;
  min-height: 44px;
  font-size: 14px;
  font-weight: 300;
  color: #667784;
  text-align: left;
  vertical-align: middle;
`

const TableRow = styled.tr`
  height: 44px;
  border-radius: 4px;
`

const TableData = styled.td`
  font-size: 14px;
  color: #414f5a;
  text-align: left;
  vertical-align: middle;
  background-color: #f7f8f9;
`