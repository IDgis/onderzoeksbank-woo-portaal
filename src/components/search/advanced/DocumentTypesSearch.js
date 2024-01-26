import React, { forwardRef } from 'react';

const ResearchTypesSearch = forwardRef(({researchTypes}, researchTypeRef) => (
    <tr>
        <td>
            <label htmlFor="type-documents">Type documenten</label>
            <select id="type-documents" className="zoekselect" name="researchTypes" ref={researchTypeRef}>
                <option value="all">- Alle typen document -</option>
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
