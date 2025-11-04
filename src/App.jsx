import React, { useState } from "react";
import CourseRow from "./components/CourseRow";
import ResultSection from "./components/ResultSection";
import "./App.css";

const gradePoints = {
  "A+": 4.0,
  A: 3.7,
  "B+": 3.3,
  B: 3.0,
  "C+": 2.7,
  C: 2.3,
  D: 2.0,
  F: 0.0,
};

function App() {
  const [courses, setCourses] = useState([{ courseName: "", creditHours: "", grade: "" }]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const addCourse = () => {
    setCourses([...courses, { courseName: "", creditHours: "", grade: "" }]);
  };

  const removeCourse = (index) => {
    const updated = [...courses];
    updated.splice(index, 1);
    setCourses(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...courses];
    updated[index][field] = value;
    setCourses(updated);
  };

  const calculateCGPA = () => {
    setError("");
    let totalCredits = 0;
    let totalPoints = 0;

    for (let c of courses) {
      if (!c.courseName || !c.creditHours || !c.grade) {
        setError(" Please fill in all fields before calculating.");
        return;
      }

      const ch = parseFloat(c.creditHours);
      const gp = gradePoints[c.grade];

      if (isNaN(ch) || ch <= 0) {
        setError(" Credit hours must be a positive number.");
        return;
      }

      if (gp === undefined) {
        setError(" Invalid grade entered.");
        return;
      }

      totalCredits += ch;
      totalPoints += gp * ch;
    }

    const cgpa = (totalPoints / totalCredits).toFixed(2);
    setResult({ totalCredits, totalPoints: totalPoints.toFixed(2), cgpa });
  };

  const resetForm = () => {
    setCourses([{ courseName: "", creditHours: "", grade: "" }]);
    setResult(null);
    setError("");
  };

  return (
    <div className="app-container">
      <h1>🎓 CGPA Calculator</h1>

      {courses.map((course, index) => (
        <CourseRow
          key={index}
          index={index}
          data={course}
          onChange={handleChange}
          onRemove={removeCourse}
          showRemove={courses.length > 1}
        />
      ))}

      <div className="btn-group">
        <button onClick={addCourse}>➕ Add Course</button>
        <button onClick={calculateCGPA}>📘 Calculate CGPA</button>
        <button onClick={resetForm}>🔄 Reset</button>
      </div>

      {error && <p className="error">{error}</p>}
      {result && <ResultSection result={result} />}
    </div>
  );
}

export default App;
