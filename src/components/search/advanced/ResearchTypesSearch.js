import React, { forwardRef } from 'react';

const ResearchTypesSearch = forwardRef(({researchTypes}, researchTypeRef) => (
    <tr>
        <td>
            <label htmlFor="type-onderzoeken">Type onderzoeken</label>
            <select id="type-onderzoeken" className="zoekselect" name="researchTypes" ref={researchTypeRef}>
                <option value="all">- Alle typen onderzoek -</option>
                {
                    researchTypes?.map(researchType =>
                        <option key={researchType.id} value={researchType.id}>{ researchType.label }</option>
                    )
                }
            </select>
        </td>
    </tr>
));

export default ResearchTypesSearch;
