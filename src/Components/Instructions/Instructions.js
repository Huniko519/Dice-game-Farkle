import React, { useState, useEffect } from "react";
import "./instructions.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

const Instructions = () => {
  return (
    <div style={{ padding: "10px" }}>
      <h1 className="farkle-Facts"> Multi-Dice Game</h1>
      <ul className="ul-instruction">
        <li>Single 1s and 5s are worth points. </li>
        <li>
          Other numbers count if you get three or more of the same number in a
          single roll.
        </li>
        <li>
          Other combinations of numbers are worth points if you get them in a
          single roll.
          <br /> <strong>Note: </strong> Dice from multiple rolls cannot be
          added together. For example, if you set aside one 5 (50 points) on
          your first roll and two 5s (100 points) on your second roll, you have
          150 points. You cannot add them together to make three 5s (500 points){" "}
        </li>
        <li>
          {" "}
          <strong>Note: </strong> Each player must score a least{" "}
          <strong>1000 points </strong> during the first turn to get into the
          game and enable the start button{" "}
        </li>
      </ul>
      <h3 className="Scoring"> Winning the Game</h3>
      <ul>
        <li>play continues until one player scores over 10,000 points.</li>
      </ul>
      <h1 className="Scoring"> Scoring</h1>
      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr>
            <th>Dice Combo</th>
            <th>Points</th>
            <th>Dice Combo</th>
            <th>Points</th>
          </tr>
        </thead>

        <tr>
          <td>Each 5</td>
          <td>50</td>
          <td>Each 1</td>
          <td>100</td>
        </tr>
        <tr>
          <td>Three 1's</td>
          <td>300</td>
          <td>4 of a Kind</td>
          <td>1000</td>
        </tr>
        <tr>
          <td>Three 2's</td>
          <td>200</td>
          <td>5 of a Kind</td>
          <td>2000</td>
        </tr>
        <tr>
          <td>Three 3's</td>
          <td>300</td>
          <td>6 of a Kind</td>
          <td>3000</td>
        </tr>
        <tr>
          <td>Three 4's</td>
          <td>400</td>
          <td>Straight</td>
          <td>1500</td>
        </tr>
        <tr>
          <td>Three 5's</td>
          <td>500</td>
          <td>3 Pairs</td>
          <td>1500</td>
        </tr>
        <tr>
          <td>Three 6's</td>
          <td>600</td>
          <td>2 Triplets</td>
          <td>2500</td>
        </tr>
      </Table>
    </div>
  );
};
export default Instructions;
