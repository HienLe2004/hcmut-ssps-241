export const WaitingDocsTable = ({waitingDocs}) => {

    return <div>
        <table className="bg-blue-2">
            <thead className="bg-blue-3">
                <tr>
                    <th className="min-w-[100px] py-4">MSSV</th>
                    <th className="min-w-[80px]">Máy in</th>
                    <th className="min-w-[100px]">Cỡ</th>
                    <th className="min-w-[100px]">Số bản</th>
                    <th className="min-w-[100px]">File</th>
                    <th className="min-w-[180px]">Thời gian bắt đầu</th>
                    <th className="min-w-[160px]">Trạng thái</th>
                </tr>
            </thead>
            <tbody className="text-white">
                {waitingDocs.map((waitingDoc) => {
                    return <tr>
                        <td className="text-center">{waitingDoc.id}</td>
                        <td className="text-center">{waitingDoc.printer}</td>
                        <td className="text-center">{waitingDoc.size}</td>
                        <td className="text-center">{waitingDoc.copy}</td>
                        <td className="text-center">{waitingDoc.file}</td>
                        <td className="text-center">{waitingDoc.start}</td>
                        <td>
                            <span>
                                <p>{waitingDoc.status}</p>
                                <p>icon</p>
                            </span>
                        </td>
                    </tr>
                })}  
            </tbody>
        </table>
    </div>
}