import React from 'react';
import { Link } from 'react-router-dom';

const Document = ({record}) => (
    <div className="document-hoofd hoeken_5">
        <table width="100%" cellSpacing="0" cellPadding="0" border="0">
            <tbody>
                <tr>
                    <td className="document-marker" width="20" align="center">
                        <ul><li></li></ul>
                    </td>
                    <td>
                        <Link to={`/list/document/${record.uuid}`}>{ record.titel }</Link>
                    </td>
                    <td className="date" width="100">
                        { new Date(record.datumCreatie).getFullYear().toString() }
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default Document;
