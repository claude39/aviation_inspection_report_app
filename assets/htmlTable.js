
export const inspectionReportHead = (
    { date,
        controlnumber,
        actionnumber,
        recordnumber,
        location,
        orgIdentifier,
        destination,
        projectnumber,
        actiontaken,
        aircraftmms,
        mainrep,
        aircraftregistrationnumber,
        mgmtrep,
        pelnumber,
        otherpelnumber }
) => `
<table style="width: 350.5px; margin-left: auto; margin-right: auto; height: 133px;">
<tbody>
<tr style="height: 72px;">
<td style="width: 67px; height: 72px;"><img src="data:image/png;base64,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" alt="" width="66" height="48" /></td>
<td style="width: 282.5px; height: 72px;">
<p>&nbsp; &nbsp; &nbsp; Republic of the Philippines Civil</p>
<p>&nbsp; &nbsp; &nbsp;Aviation&nbsp;Authority of the Philippines</p>
</td>
</tr>
</tbody>
</table>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;">&nbsp;&nbsp;</p>
<p style="text-align: center;"><strong>INSPECTION REPORT</strong></p>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;">&nbsp;</p>
<table style="height: 495px; margin-left: auto; margin-right: auto;" border="1" width="648">
<tbody>
<tr style="height: 21px;">
<td style="width: 154px; height: 21px;">&nbsp; Date</td>
<td style="width: 159px; height: 21px;">&nbsp; ${date}</td>
<td style="width: 156px; height: 21px;">&nbsp; Control #</td>
<td style="width: 178px; height: 21px;">&nbsp; ${controlnumber}</td>
</tr>
<tr style="height: 21px;">
<td style="width: 154px; height: 21px;">&nbsp; Action #</td>
<td style="width: 159px; height: 21px;">&nbsp; ${actionnumber}</td>
<td style="width: 156px; height: 21px;">&nbsp; Record #</td>
<td style="width: 178px; height: 21px;">&nbsp; ${recordnumber}</td>
</tr>
<tr style="height: 21px;">
<td style="width: 154px; height: 21px;">&nbsp; Location</td>
<td style="width: 159px; height: 21px;">&nbsp; ${location}</td>
<td style="width: 156px; height: 21px;">&nbsp; Org Identifier</td>
<td style="width: 178px; height: 21px;">&nbsp; ${orgIdentifier}</td>
</tr>
<tr style="height: 21px;">
<td style="width: 154px; height: 21px;">&nbsp; Destination</td>
<td style="width: 159px; height: 21px;">&nbsp; ${destination}</td>
<td style="width: 156px; height: 21px;">&nbsp; Project #</td>
<td style="width: 178px; height: 21px;">&nbsp; ${projectnumber}</td>
</tr>
<tr style="height: 21px;">
<td style="width: 154px; height: 21px;">&nbsp; Action Taken</td>
<td style="width: 159px; height: 21px;">&nbsp; ${actiontaken}</td>
<td style="width: 156px; height: 21px;">&nbsp; Aircraft MMS</td>
<td style="width: 178px; height: 21px;">&nbsp; ${aircraftmms}</td>
</tr>
<tr style="height: 21px;">
<td style="width: 154px; height: 21px;">&nbsp; Main Rep</td>
<td style="width: 159px; height: 21px;">&nbsp; ${mainrep}</td>
<td style="width: 156px; height: 21px;">&nbsp; Aircraft Reg #</td>
<td style="width: 178px; height: 21px;">&nbsp; ${aircraftregistrationnumber}</td>
</tr>
<tr style="height: 21px;">
<td style="width: 154px; height: 21px;">&nbsp; Mgmt Rep</td>
<td style="width: 159px; height: 21px;">&nbsp; ${mgmtrep}</td>
<td style="width: 156px; height: 21px;">&nbsp; PEL #</td>
<td style="width: 178px; height: 21px;">&nbsp; ${pelnumber}</td>
</tr>
<tr style="height: 21px;">
<td style="width: 154px; height: 21px;">&nbsp; Other PEL #</td>
<td style="width: 159px; height: 21px;">&nbsp; ${otherpelnumber}</td>
<td style="width: 156px; height: 21px;">&nbsp;</td>
<td style="width: 178px; height: 21px;">&nbsp;</td>
</tr>
<tr style="height: 21px;">
<td style="width: 154px; height: 21px;">&nbsp;</td>
<td style="width: 159px; height: 21px;">&nbsp;</td>
<td style="width: 156px; height: 21px;">&nbsp;</td>
<td style="width: 178px; height: 21px;">&nbsp;</td>
</tr>
</tbody>
</table>`

export const table = list => 
`<p style="text-align: center;"><strong>LEGEND: S =&nbsp;</strong>Satisfactory&nbsp; &nbsp;<strong>U </strong>= Unsatisfactory&nbsp; &nbsp;<strong>NS&nbsp;</strong>= Not Seen&nbsp; &nbsp;<strong>NA&nbsp;</strong>= Not Applicable</p>
<table style="width: 675px; margin-left: auto; margin-right: auto;" border="1">
    <tbody>
        ${
    list.map(item => 
        `<tr style="height: 21px;">
                <td style="width: 35px; height: 21px;">&nbsp; S</td>
                <td style="width: 35px; height: 21px;">&nbsp; U</td>
                <td style="width: 36px; height: 21px;">&nbsp; NS</td>
                <td style="width: 36px; height: 21px;">&nbsp; NA</td>
                <td style="width: 36px; height: 21px;"><strong>${item.number}</strong></td>
                <td style="width: 496px; height: 21px;"><strong>${item.category}</strong></td>
            </tr>
            ${
        item.subCategories.map(sub => 
            `<tr style="height: 21px;">
                    <td style="width: 35px; height: 21px;">&nbsp; ${sub.selected === 'Satisfactory' ? '&#10004;' : ''}</td>
                    <td style="width: 35px; height: 21px;">&nbsp; ${sub.selected === 'Unsatisfactory' ? '&#10004;' : ''}</td>
                    <td style="width: 36px; height: 21px;">&nbsp; ${sub.selected === 'Not Seen' ? '&#10004;' : ''}</td>
                    <td style="width: 36px; height: 21px;">&nbsp; ${sub.selected === 'Not Applicable' ? '&#10004;' : ''}</td>
                    <td style="width: 36px; height: 21px;">${item.number}.${sub.index}</td>
                    <td style="width: 496px; height: 21px;">&nbsp; ${sub.content}</td>
                </tr>   
                `)
        }
            `)
    }
    </tbody>
</table>
`

export const additionalInfo = (flightcrewlicense, medicallicense) => `
<p style="text-align: center;"><strong>ADDITIONAL INFORMATION</strong></p>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;">&nbsp;</p>
<table style="height: 191px; margin-left: auto; margin-right: auto;" border="1" width="472">
<tbody>
<tr style="height: 67px;">
<td style="width: 223px; height: 67px;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Description</strong></td>
<td style="width: 248px; height: 67px;">
<p><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Checked</strong></p>
</td>
</tr>
<tr style="height: 45px;">
<td style="width: 223px; height: 45px;">Flight Crew License</td>
<td style="width: 248px; height: 45px;">&nbsp; ${flightcrewlicense}</td>
</tr>
<tr style="height: 28px;">
<td style="width: 223px; height: 28px;">Medical License</td>
<td style="width: 248px; height: 28px;">&nbsp; ${medicallicense}</td>
</tr>
</tbody>
</table>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: left;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; REMARKS</p>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: right;">Inspector Signature&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
`