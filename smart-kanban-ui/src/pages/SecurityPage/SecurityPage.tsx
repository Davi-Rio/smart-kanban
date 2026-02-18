import styles from "./SecurityPage.module.css";
import { Link } from "react-router-dom";

type Vulnerability = {
  id: string;
  title: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "Fixed";
  issue?: string;
};

const MOCK_VULNS: Vulnerability[] = [
  {
    id: "1",
    title: "Outdated dependency: axios 0.21",
    severity: "High",
    status: "Open",
    issue: "SK-4",
  },
  {
    id: "2",
    title: "Missing CSP header",
    severity: "Medium",
    status: "Open",
    issue: "SK-5",
  },
  {
    id: "3",
    title: "XSS vulnerability in comment input",
    severity: "Critical",
    status: "Fixed",
    issue: "SK-1",
  },
];

export default function SecurityPage() {
  const total = MOCK_VULNS.length;
  const open = MOCK_VULNS.filter(v => v.status === "Open").length;
  const fixed = MOCK_VULNS.filter(v => v.status === "Fixed").length;

  return (
    <div className={styles.container}>
      <div className={styles.metrics}>
        <div className={styles.metricCard}>
          <div className={styles.metricNumber}>{total}</div>
          <div className={styles.metricLabel}>Total Vulnerabilities</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricNumber}>{open}</div>
          <div className={styles.metricLabel}>Open</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricNumber}>{fixed}</div>
          <div className={styles.metricLabel}>Fixed</div>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <div className={styles.headerRow}>
          <span>Vulnerability</span>
          <span>Severity</span>
          <span>Status</span>
          <span>Linked Issue</span>
        </div>

        {MOCK_VULNS.map((vuln) => (
          <div key={vuln.id} className={styles.row}>
            <div className={styles.titleCell}>
              {vuln.title}
            </div>

            <div className={`${styles.badge} ${styles[vuln.severity]}`}>
              {vuln.severity}
            </div>

            <div
              className={`${styles.badge} ${
                vuln.status === "Open"
                  ? styles.open
                  : styles.fixed
              }`}
            >
              {vuln.status}
            </div>

            <Link
              to={`/issues?issue=${vuln.issue}`}
              className={styles.issueLink}
            >
              {vuln.issue}
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
}
