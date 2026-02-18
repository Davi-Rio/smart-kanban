import { useState, useEffect } from "react";
import styles from "./IssuesPage.module.css";
import CreateIssueModal from "./CreateIssueModal";
import { NotebookIcon } from "../../components/Icons/Icons";

export type Issue = {
  id: string;
  key: string;
  summary: string;
  type: "Bug" | "Task" | "Story";
  status: "To Do" | "In Progress" | "Done";
  assignee: string;
};

const STORAGE_KEY = "sk-issues";

export default function IssuesPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterType, setFilterType] = useState<string>("All");
  const [filterAssignee, setFilterAssignee] = useState<string>("All");



  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setIssues(JSON.parse(saved));
  }, []);

  function saveIssues(data: Issue[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setIssues(data);
  }


  function handleCreate(issue: Omit<Issue, "id" | "key">) {
    const newIssue: Issue = {
      ...issue,
      id: crypto.randomUUID(),
      key: `SK-${issues.length + 1}`,
    };

    const updated = [...issues, newIssue];
    saveIssues(updated);
    setIsOpen(false);
  }

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.summary.toLowerCase().includes(search.toLowerCase()) ||
      issue.key.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || issue.status === filterStatus;

    const matchesType =
      filterType === "All" || issue.type === filterType;

    const matchesAssignee =
      filterAssignee === "All" || issue.assignee === filterAssignee;

    return matchesSearch && matchesStatus && matchesType && matchesAssignee;
  });


  return (
    <div className={styles.container}>
      <div className={styles.topRight}>
        <button
          onClick={() => setIsOpen(true)}
          className={styles.createBtn}
        >
          + Create Issue
        </button>
      </div>

      <div className={styles.filtersBar}>
        <input
          placeholder="Search issues"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />

        <select
          value={filterAssignee}
          onChange={(e) => setFilterAssignee(e.target.value)}
        >
          <option value="All">All</option>
          {[...new Set(issues.map((i) => i.assignee))].map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Bug">Bug</option>
          <option value="Task">Task</option>
          <option value="Story">Story</option>
        </select>
      </div>


      <div className={styles.tableWrapper}>
        {issues.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Summary</th>
                <th>Type</th>
                <th>Status</th>
                <th>Assignee</th>
              </tr>
            </thead>

            <tbody>
              {filteredIssues.map((issue) => (
                <tr key={issue.id}>
                  <td className={styles.key}>{issue.key}</td>
                  <td>{issue.summary}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[issue.type]}`}>
                      {issue.type}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`${styles.status} ${styles[issue.status.replace(" ", "")]
                        }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td>{issue.assignee || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {issues.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <NotebookIcon size={40} stroke={1.4} />
            </div>

            <h3>No issues created</h3>

            <p>
              Start tracking work by creating your first issue.
            </p>

            <button
              onClick={() => setIsOpen(true)}
              className={styles.createBtn}
            >
              Create Issue
            </button>
          </div>
        )}
      </div>

      {isOpen && (
        <CreateIssueModal
          onClose={() => setIsOpen(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
