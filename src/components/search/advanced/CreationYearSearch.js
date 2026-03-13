import React, { forwardRef } from 'react';

const CreationYearSearch = forwardRef(({}, creationYearRef) => (
    <tr>
        <td>
            <label htmlFor="creation-year">Creatiejaar</label>
            <input id="creation-year" className="inputtable" name="creatiejaar" type="number" ref={creationYearRef} defaultValue="2020"/>
        </td>
    </tr>
));

export default CreationYearSearch;
