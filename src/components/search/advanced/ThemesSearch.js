import React, { forwardRef } from 'react';

const Themes = forwardRef(({typeApp, themes, wooThemes}, themeRef) => (
    <tr>
        {typeApp == "ob" &&
            <td>
                <label htmlFor="themas">Thema's</label>
                <select id="themas" className="zoekselect" name="themes" ref={themeRef}>
                    <option value="all">- Alle thema's -</option>
                    {
                        themes?.map(theme =>
                            <option key={theme.id} value={theme.id}>{ theme.label }</option>
                        )
                    }
                </select>
            </td>
        }
        {typeApp == "woo" &&
            <td>
                <label htmlFor="wooThemas">WOO thema's</label>
                <select id="wooThemas" className="zoekselect" name="wooThemes" ref={themeRef}>
                    <option value="all">- Alle WOO thema's -</option>
                    {
                        wooThemes?.map(wooTheme =>
                            <option key={wooTheme.id} value={wooTheme.id}>{ wooTheme.label }</option>
                        )
                    }
                </select>
            </td>
        }
    </tr>
));

export default Themes;
