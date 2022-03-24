import { React, useEffect, useState } from 'react';
import { TeamTile } from '../components/TeamTile';

import './HomePage.scss';


export const HomePage = () => {

    let [teams, setTeams] = useState([]);
    useEffect(
        () => {
         (async () => {
             //
            let response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/`);
            let data = await response.json();
            setTeams(data);

         })();
        //  fetchAllTeams();
            


        }, []
    );



    return (
        <div className="HomePage">
            <div className="header-section">
                <h1 className="app-name"> IPL Dashboard</h1>
            </div>

            <div className="team-grid">

                { teams.map(team => (
                <TeamTile key={team.id} teamName={team.teamName} />

                ))}
            
            </div>
        </div>
        
    );
}