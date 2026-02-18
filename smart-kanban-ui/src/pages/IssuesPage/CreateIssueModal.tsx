import { useState } from "react";
import styles from "./IssuesPage.module.css";
import type { Issue } from "./IssuesPage";

type Props = {
    onClose: () => void;
    onCreate: (issue: Omit<Issue, "id" | "key">) => void;
};

export default function CreateIssueModal({ onClose, onCreate }: Props) {
    const [summary, setSummary] = useState("");
    const [type, setType] = useState<Issue["type"]>("Task");
    const [status, setStatus] = useState<Issue["status"]>("To Do");
    const [assignee, setAssignee] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!summary.trim()) return;

        onCreate({ summary, type, status, assignee });
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Create Issue</h2>

                <form onSubmit={handleSubmit}>
                    <label>Summary</label>
                    <input
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        required
                    />

                    <label>Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as Issue["type"])}
                    >
                        <option value="Bug">Bug</option>
                        <option value="Task">Task</option>
                        <option value="Story">Story</option>
                    </select>

                    <label>Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as Issue["status"])}
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>

                    <label>Assignee</label>
                    <input
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                    />

                    <div className={styles.modalActions}>
                        <button
                            type="button"
                            onClick={onClose}
                            className={styles.cancel}
                        >
                            Cancel
                        </button>

                        <button type="submit" className={styles.createBtn}>
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
