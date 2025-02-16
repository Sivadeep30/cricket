import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

const LiveScores = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(
          "https://api.cricapi.com/v1/currentMatches?apikey=d488910a-42c9-4e1a-84f1-24fe986592d6&offset=0"
        );
  
        console.log("API Response:", response.data); // Debugging
  
        if (!response.data || !response.data.data) {
          console.error("Invalid API response structure:", response.data);
          return;
        }
  
        const pastMatches = response.data.data
          .filter((match) => match.matchEnded === true)
          .map((match) => ({
            ...match,
            teamFlags: {
              [match.teams[0]]: match.teamInfo?.find((t) => t.name === match.teams[0])?.img || "",
              [match.teams[1]]: match.teamInfo?.find((t) => t.name === match.teams[1])?.img || "",
            },
          }));
  
        setMatches(pastMatches);
      } catch (error) {
        console.error("Error fetching match data:", error);
      }
    };
  
    fetchMatches();
    const interval = setInterval(fetchMatches, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-scores-container">
      <h2 className="live-scores-title">Live Cricket Scores</h2>
      <div className="matches-grid">
        {matches.length > 0 ? (
          matches.map((match) => (
            <div key={match.id} className="match-card">
              <h3 className="match-title">{match.name}</h3>
              <p className="match-details">
                <img src={match.teamFlags[match.teams[0]]} alt={match.teams[0]} className="team-flag" />
                {match.teams[0]} vs 
                <img src={match.teamFlags[match.teams[1]]} alt={match.teams[1]} className="team-flag" />
                {match.teams[1]}
              </p>
              {match.score && match.score.length > 1 && (
                <p className="match-score">
                  {match.teams[0]}: {match.score[0].r}/{match.score[0].w} in {match.score[0].o} overs
                  <br />
                  {match.teams[1]}: {match.score[1].r}/{match.score[1].w} in {match.score[1].o} overs
                </p>
              )}
            </div>
          ))
        ) : (
          <p>No live matches available.</p>
        )}
      </div>
    </div>
  );
};

export default LiveScores;