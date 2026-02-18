import { useEffect, useMemo, useState } from "react";
import styles from "./TeamsPage.module.css";
import type { Task } from "../../types/task";

type Member = {
    id: string;
    name: string;
    role: string;
    area: string;
};

const STORAGE_KEY = "smart-kanban-board";

const initialMembers: Member[] = [
    { id: "1", name: "Davi", role: "Full Stack", area: "Frontend" },
    { id: "2", name: "Anna", role: "Backend Dev", area: "Backend" },
    { id: "3", name: "John", role: "QA Engineer", area: "QA" },
    { id: "4", name: "Lucas", role: "DevOps", area: "Devops" },
];

function loadTasks(): Task[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];

        const parsed = JSON.parse(raw);
        return parsed.flatMap((col: any) => col.tasks);
    } catch {
        return [];
    }
}

export default function TeamsPage() {
    const [members, setMembers] = useState<Member[]>(initialMembers);
    const [areaFilter, setAreaFilter] = useState<string | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        setTasks(loadTasks());
    }, []);

    const filteredMembers = useMemo(() => {
        if (!areaFilter) return members;
        return members.filter(m => m.area === areaFilter);
    }, [members, areaFilter]);

    function getTasksByMember(area: string) {
        return tasks.filter(t => t.area === area).length;
    }


    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <div className={styles.filters}>
                    {["All", "Frontend", "Backend", "QA", "Devops", "UX", "Product"].map(area => (
                        <button
                            key={area}
                            className={`${styles.filterBtn} ${(area === "All" && areaFilter === null) ||
                                    areaFilter === area
                                    ? styles.active
                                    : ""
                                }`}
                            onClick={() => setAreaFilter(area === "All" ? null : area)}
                        >
                            {area}
                        </button>
                    ))}
                </div>

                <button
                    className={styles.addBtn}
                    onClick={() =>
                        setMembers(prev => [
                            ...prev,
                            {
                                id: crypto.randomUUID(),
                                name: "New Member",
                                role: "Developer",
                                area: "Frontend",
                            },
                        ])
                    }
                >
                    + Add Member
                </button>
            </div>

            <div className={styles.grid}>
                {filteredMembers.map(member => (
                    <div key={member.id} className={styles.card}>
                        <div className={styles.avatar}>
                            {member.name.slice(0, 2).toUpperCase()}
                        </div>

                        <div className={styles.info}>
                            <h3>{member.name}</h3>
                            <span>{member.role}</span>
                            <span className={styles.area}>{member.area}</span>
                        </div>

                        <div className={styles.meta}>
                            <strong>{getTasksByMember(member.area)}</strong>
                            <span>Tasks</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
