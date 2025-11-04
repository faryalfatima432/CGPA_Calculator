import React from "react";

function ResultSection({ result }) {
  return (
    <div className="result-box">
      <h2> Results</h2>
      <p>Total Credit Hours: <b>{result.totalCredits}</b></p>
      <p>Total Grade Points: <b>{result.totalPoints}</b></p>
      <h3>Final CGPA: <b>{result.cgpa}</b></h3>
    </div>
  );
}

export default ResultSection;

