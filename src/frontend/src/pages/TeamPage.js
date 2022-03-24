import { React, useEffect, useState } from "react";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";
import { useParams, Link } from "react-router-dom";
import {PieChart} from 'react-minimal-pie-chart';

import "./TeamPage.scss";

export const TeamPage = () => {
  const [team, setTeam] = useState({ matches: [] }); // if left empty like useState()  we'll get undefined error when data is not fetched
  const { teamName } = useParams();

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch(`http://localhost:8080/team/${teamName}`);
      const data = await response.json();
      // console.log(data);
      setTeam(data);
    };
    fetchMatches();
  }, [teamName]);

  //useEffect(.., [])   passing empty array []   call this useEffect only when one of these things inside array change..
  // we have empty arr [] so it initializes this useEffect only when the component loads for the first time

  if (!team || !team.teamName) {
    return <h1>Team Not Found!</h1>;
  }

  return (
    <div className="TeamPage">
      <div className="team-name-section">
        <h1>{team.teamName}</h1>
      </div>

      <div className="win-loss-section">
          Wins / Losses
          <PieChart
            data={[
              { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#a34d5d' },
              { title: 'Wins', value: team.totalWins, color: '#4da375' },
            ]}
          />

      </div>

      <div className="match-detail-section">
        <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />
      </div>

      {team.matches.slice(1).map((match) => (
        <MatchSmallCard teamName={team.teamName} match={match} />
      ))}

<div className="more-link">
        <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>More ></Link>
        </div>
    </div>
  );
};
