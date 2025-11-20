import React from "react";

const grades = ["A+", "A", "B+", "B", "C+", "C", "D", "F"];

function CourseRow({ index, data, onChange, onRemove, showRemove }) {
  return (
    <div className="course-row">
      <input
        type="text"
        placeholder="Course Name"
        value={data.courseName}
        onChange={(e) => onChange(index, "courseName", e.target.value)}
      />
      <input
        type="number"
        placeholder="Credit Hours"
        value={data.creditHours}
        onChange={(e) => onChange(index, "creditHours", e.target.value)}
      />
      <select
        value={data.grade}
        onChange={(e) => onChange(index, "grade", e.target.value)}
      >
        <option value="">Select Grade</option>
        {grades.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      {showRemove && (
        <button className="remove-btn" onClick={() => onRemove(index)}>
          Remove
        </button>
      )}
    </div>
  );
}

export default CourseRow;
