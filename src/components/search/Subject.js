import React from 'react';

const Subject = ({subjectId, subjectTitle, isChecked, handleChange}) => (
    <div>
        <label className="checkbox-inline">
            <input className="js-data-subject" data-md-subject={subjectId} type="checkbox" checked={isChecked} onChange={() => handleChange(subjectId)} />
            <span>{ subjectTitle }</span>
        </label>
    </div>
)

export default Subject;
