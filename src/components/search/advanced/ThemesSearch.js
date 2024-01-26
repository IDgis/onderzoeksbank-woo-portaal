import React, { forwardRef } from 'react';

const Themes = forwardRef(({themes}, themeRef) => (
    <tr>
        <td>
            <label htmlFor="themas">Thema's</label>
            <select id="themas" className="zoekselect" name="documentTypes" ref={themeRef}>
                <option value="all">- Alle thema's -</option>
                {
                    themes?.map(theme =>
                        <option key={theme.id} value={theme.id}>{ theme.label }</option>
                    )
                }
            </select>
        </td>
    </tr>
));

export default Themes;
