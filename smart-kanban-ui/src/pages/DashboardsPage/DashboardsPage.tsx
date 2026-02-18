import { useEffect, useMemo, useState } from "react";
import styles from "./DashboardsPage.module.css";
import type { Task } from "../../types/task";

const STORAGE_KEY = "smart-kanban-board";

type ColumnType = {
    id: string;
    title: string;
    tasks: Task[];
};

const AREAS = [
    "Frontend",
    "Backend",
    "QA",
    "Devops",
    "UX",
    "Product",
];

export default function DashboardsPage() {
    const [columns, setColumns] = useState<ColumnType[]>([]);
    const [selectedArea, setSelectedArea] = useState<string | null>(null);

    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            setColumns(JSON.parse(raw));
        }
    }, []);

    const filteredColumns = useMemo(() => {
        if (!selectedArea) return columns;

        return columns.map(col => ({
            ...col,
            tasks: col.tasks.filter(
                task =>
                    task.area?.toLowerCase() === selectedArea.toLowerCase()
            ),
        }));
    }, [columns, selectedArea]);

    const totalIssues = filteredColumns.reduce(
        (acc, col) => acc + col.tasks.length,
        0
    );

    const done =
        filteredColumns.find(c => c.id === "done")?.tasks.length || 0;

    const inProgress =
        filteredColumns.find(c => c.id === "progress")?.tasks.length || 0;

    const backlog =
        filteredColumns.find(c => c.id === "todo")?.tasks.length || 0;

    const sprintProgress =
        totalIssues === 0 ? 0 : Math.round((done / totalIssues) * 100);

    const maxValue = Math.max(done, inProgress, backlog, 1);

    return (
        <div className={styles.container}>

            <div className={styles.areaFilter}>
                <button
                    className={!selectedArea ? styles.activeArea : ""}
                    onClick={() => setSelectedArea(null)}
                >
                    All
                </button>

                {AREAS.map(area => (
                    <button
                        key={area}
                        className={
                            selectedArea === area ? styles.activeArea : ""
                        }
                        onClick={() =>
                            setSelectedArea(
                                selectedArea === area ? null : area
                            )
                        }
                    >
                        {area}
                    </button>
                ))}
            </div>

            <div className={styles.kpiGrid}>
                <div className={styles.kpiCard}>
                    <span>Total Issues</span>
                    <strong>{totalIssues}</strong>
                </div>

                <div className={styles.kpiCard}>
                    <span>Backlog</span>
                    <strong>{backlog}</strong>
                </div>

                <div className={styles.kpiCard}>
                    <span>In Progress</span>
                    <strong>{inProgress}</strong>
                </div>

                <div className={styles.kpiCard}>
                    <span>Completed</span>
                    <strong>{done}</strong>
                </div>

                {totalIssues === 0 && (
                    <div className={styles.warningCard}>
                        <strong>Aviso</strong>
                        <p>
                            Para visualizar gráficos, atividades recentes e progresso
                            do sprint, crie tasks na página de Board.
                        </p>
                    </div>
                )}
            </div>


            <div className={styles.mainGrid}>

                <div className={styles.chartCard}>
                    <h3>Issues by Status</h3>

                    <div className={styles.chartMock}>
                        <div
                            className={styles.bar}
                            style={{
                                height: `${(done / maxValue) * 100}%`,
                            }}
                        >
                            <span>Done</span>
                        </div>

                        <div
                            className={styles.bar}
                            style={{
                                height: `${(inProgress / maxValue) * 100}%`,
                            }}
                        >
                            <span>In Progress</span>
                        </div>

                        <div
                            className={styles.bar}
                            style={{
                                height: `${(backlog / maxValue) * 100}%`,
                            }}
                        >
                            <span>Backlog</span>
                        </div>
                    </div>
                </div>

                <div className={styles.activityCard}>
                    <h3>Recent Activity</h3>

                    <div className={styles.activityItem}>
                        <span className={styles.user}>System</span>
                        <p>
                            {totalIssues} total issues currently tracked
                        </p>
                    </div>

                    <div className={styles.activityItem}>
                        <span className={styles.user}>System</span>
                        <p>
                            {done} tasks completed
                        </p>
                    </div>

                    <div className={styles.activityItem}>
                        <span className={styles.user}>System</span>
                        <p>
                            {inProgress} tasks in progress
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.sprintCard}>
                <h3>Sprint Progress</h3>

                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{ width: `${sprintProgress}%` }}
                    />
                </div>

                <span>{sprintProgress}% completed</span>
            </div>
        </div>
    );
}
