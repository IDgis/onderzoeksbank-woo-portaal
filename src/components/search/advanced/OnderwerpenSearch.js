import React, { forwardRef } from 'react';

const Onderwerpen = forwardRef(({onderwerpen}, onderwerpRef) => (
    <tr>
        <td>
            <label htmlFor="onderwerpen">Onderwerpen</label>
            <select id="onderwerpen" className="zoekselect" name="onderwerpen" ref={onderwerpRef}>
                <option value="all">Alle onderwerpen</option>
                {
                    onderwerpen?.map(onderwerp =>
                        <option key={onderwerp.id} value={onderwerp.id}>{ onderwerp.label }</option>
                    )
                }
            </select>
        </td>
    </tr>
));

export default Onderwerpen;
