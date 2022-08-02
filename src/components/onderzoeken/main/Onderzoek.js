import React from 'react';
import { Link } from 'react-router-dom';

const Onderzoek = ({record}) => (
    <div className="onderzoek-hoofd hoeken_5">
        <table width="100%" cellSpacing="0" cellPadding="0" border="0">
            <tbody>
                <tr>
                    <td className="onderzoek-marker" width="20" align="center">
                        <ul><li></li></ul>
                    </td>
                    <td>
                        <Link to={`/onderzoeksbank/onderzoek/${record.uuid}`}>{ record.titel }</Link>
                    </td>
                    <td className="date" width="100">
                        { new Date(record.datumCreatie).getFullYear().toString() }
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default Onderzoek;
