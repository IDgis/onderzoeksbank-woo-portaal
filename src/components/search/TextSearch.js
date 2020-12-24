import React, { forwardRef } from 'react';

const TextSearch = forwardRef(({}, textRef) => (
    <tr>
        <td>
            <label htmlFor="trefwoord">Zoekwoord</label>
            <input id="trefwoord" className="inputtable" type="text" name="trefwoord" ref={textRef} />
        </td>
    </tr>
));

export default TextSearch;
