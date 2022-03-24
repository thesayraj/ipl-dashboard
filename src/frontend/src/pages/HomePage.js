import { React, useEffect, useState } from 'react';
import { TeamTile } from '../components/TeamTile';

import './HomePage.scss';


export const HomePage = () => {

    let [teams, setTeams] = useState([]);
    useEffect(
        () => {
         (async () => {
             // ${process.env.REACT_APP_API_ROOT_URL}/team
            let response = await fetch(`http://localhost:8080/team/`);
            let data = await response.json();
            setTeams(data);

         })();
        //  fetchAllTeams();
            


        }, []
    );


    // if (teams.length === 0) {
    //     return <h1>Team Not Found!</h1>;
    //   }
    

    return (
        <div className="HomePage">
            <div className="header-section">
                <h1 className="app-name"> IPL Dashboard</h1>
            </div>
            {/* {console.log(teams)} */}

            <div className="team-grid">

                { teams.map(team => (
                <TeamTile key={team.id} teamName={team.teamName} />

                ))}
            
            </div>
        </div>
        
    );
}