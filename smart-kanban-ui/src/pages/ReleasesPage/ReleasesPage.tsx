import styles from "./ReleasesPage.module.css";

type ReleaseStatus = "Released" | "In Progress" | "Planned";

type Release = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  releaseDate: string;
  progress: number; 
  status: ReleaseStatus;
  issues: number;
};

const MOCK_RELEASES: Release[] = [
  {
    id: "1",
    name: "v1.0.0",
    description: "Initial production release",
    startDate: "01 Jan 2026",
    releaseDate: "10 Jan 2026",
    progress: 100,
    status: "Released",
    issues: 12,
  },
  {
    id: "2",
    name: "v1.1.0",
    description: "Authentication improvements and UI fixes",
    startDate: "12 Jan 2026",
    releaseDate: "28 Jan 2026",
    progress: 65,
    status: "In Progress",
    issues: 8,
  },
  {
    id: "3",
    name: "v2.0.0",
    description: "Major redesign and performance upgrade",
    startDate: "01 Feb 2026",
    releaseDate: "20 Feb 2026",
    progress: 10,
    status: "Planned",
    issues: 15,
  },
];

export default function ReleasesPage() {
  const released = MOCK_RELEASES.filter(r => r.status === "Released").length;
  const inProgress = MOCK_RELEASES.filter(r => r.status === "In Progress").length;
  const planned = MOCK_RELEASES.filter(r => r.status === "Planned").length;

  return (
    <div className={styles.container}>
      <div className={styles.metrics}>
        <div className={styles.metricCard}>
          <span className={styles.metricValue}>{released}</span>
          <span className={styles.metricLabel}>Released</span>
        </div>

        <div className={styles.metricCard}>
          <span className={styles.metricValue}>{inProgress}</span>
          <span className={styles.metricLabel}>In Progress</span>
        </div>

        <div className={styles.metricCard}>
          <span className={styles.metricValue}>{planned}</span>
          <span className={styles.metricLabel}>Planned</span>
        </div>
      </div>

      <div className={styles.releaseList}>
        {MOCK_RELEASES.map((release) => (
          <div key={release.id} className={styles.releaseCard}>
            <div className={styles.releaseHeader}>
              <div>
                <h3>{release.name}</h3>
                <p>{release.description}</p>
              </div>

              <span
                className={`${styles.status} ${styles[release.status.replace(" ", "")]}`}
              >
                {release.status}
              </span>
            </div>

            <div className={styles.meta}>
              <span>Start: {release.startDate}</span>
              <span>Release: {release.releaseDate}</span>
              <span>{release.issues} issues</span>
            </div>

            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${release.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
