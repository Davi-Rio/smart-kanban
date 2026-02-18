import styles from "./CodePage.module.css";
import { CodeIcon } from "../../components/Icons/Icons";

type PullRequest = {
  id: string;
  title: string;
  branch: string;
  author: string;
  status: "Open" | "Merged";
};

const MOCK_PRS: PullRequest[] = [
  {
    id: "1",
    title: "SK-2 Fix login validation",
    branch: "feature/SK-2-login-fix",
    author: "Davi",
    status: "Open",
  },
  {
    id: "2",
    title: "SK-3 Improve mobile layout",
    branch: "feature/SK-3-mobile",
    author: "Davi",
    status: "Merged",
  },
];

export default function CodePage() {
  const hasRepo = true; 

  return (
    <div className={styles.container}>
      <div className={styles.metrics}>
        <div className={styles.metricCard}>
          <span className={styles.metricValue}>1</span>
          <span className={styles.metricLabel}>Open Pull Requests</span>
        </div>

        <div className={styles.metricCard}>
          <span className={styles.metricValue}>2</span>
          <span className={styles.metricLabel}>Active Branches</span>
        </div>

        <div className={styles.metricCard}>
          <span className={styles.metricValue}>1</span>
          <span className={styles.metricLabel}>Deployments</span>
        </div>
      </div>

      <div className={styles.repoSection}>
        {hasRepo ? (
          <>
            <div className={styles.repoHeader}>
              <CodeIcon size={20} />
              <span>smart-kanban-ui</span>
              <span className={styles.connected}>Connected</span>
            </div>

            <div className={styles.prList}>
              {MOCK_PRS.map((pr) => (
                <div key={pr.id} className={styles.prItem}>
                  <div>
                    <div className={styles.prTitle}>{pr.title}</div>
                    <div className={styles.prMeta}>
                      {pr.branch} • {pr.author}
                    </div>
                  </div>

                  <span
                    className={`${styles.prStatus} ${
                      pr.status === "Open"
                        ? styles.open
                        : styles.merged
                    }`}
                  >
                    {pr.status}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            <CodeIcon size={40} stroke={1.4} />
            <h3>No repositories connected</h3>
            <p>
              Connect your GitHub repository to track branches and pull
              requests linked to issues.
            </p>
            <button className={styles.connectBtn}>
              Connect Repository
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
