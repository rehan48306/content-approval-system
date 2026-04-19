import {
    approveContent,
    rejectContent,
    getApprovals,
} from "../../../services/api";
import { useState } from "react";
import TableHeader from "../../Common/Table/TableHeader";
import TableBody from "../../Common/Table/TableBody";
import ActionModal from "./ActionModal";
import HistoryModal from "./HistoryModal";

export default function ContentTable({ data, role, refresh, openModal }) {
    const [actionType, setActionType] = useState(null); // "approve" | "reject"
    const [selectedId, setSelectedId] = useState(null);
    const [comment, setComment] = useState("");
    const [historyOpen, setHistoryOpen] = useState(false);
    const [historyData, setHistoryData] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);


    const columns = [
        { label: "Title" },
        { label: "Description" },
        { label: "Status" },
        { label: "Actions", align: "right" },
    ];

    return (
        <div className="bg-gray-100 p-4 rounded-xl">
            <div className="bg-white rounded-xl shadow border overflow-hidden">

                <table className="w-full text-sm">

                    <TableHeader columns={columns} />
                    <TableBody
                        data={data}
                        role={role}
                        openModal={openModal}
                        refresh={refresh}
                        setActionType={setActionType}
                        setSelectedId={setSelectedId}
                        setHistoryOpen={setHistoryOpen}
                        setHistoryData={setHistoryData}
                        setLoadingHistory={setLoadingHistory}
                        getApprovals={getApprovals}
                    />
                </table>
            </div>

            <ActionModal
                actionType={actionType}
                comment={comment}
                setComment={setComment}
                onClose={() => {
                    setActionType(null);
                    setComment("");
                }}
                onSubmit={async () => {
                    if (actionType === "reject" && !comment) {
                        return alert("Comment is required");
                    }

                    if (actionType === "approve") {
                        await approveContent(selectedId, role, comment);
                    } else {
                        await rejectContent(selectedId, role, comment);
                    }

                    setActionType(null);
                    setComment("");
                    refresh();
                }}
            />

            <HistoryModal
                open={historyOpen}
                data={historyData}
                loading={loadingHistory}
                onClose={() => setHistoryOpen(false)}
            />
        </div>


    );
}
