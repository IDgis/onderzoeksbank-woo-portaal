import React, { forwardRef } from 'react';

const DocumentTypesSearch = forwardRef(({documentTypes}, documentTypeRef) => (
    <tr>
        <td>
            <label htmlFor="type-documents">Type documenten</label>
            <select id="type-documents" className="zoekselect" name="documentTypes" ref={documentTypeRef}>
                <option value="all">- Alle type documenten -</option>
                {
                    documentTypes?.map(documentType =>
                        <option key={documentType.id} value={documentType.id}>{ documentType.label }</option>
                    )
                }
            </select>
        </td>
    </tr>
));

export default DocumentTypesSearch;
