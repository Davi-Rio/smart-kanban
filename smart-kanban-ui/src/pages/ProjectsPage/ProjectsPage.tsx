import { useState } from "react";
import styles from "./ProjectsPage.module.css";

type Project = {
    id: number;
    name: string;
    key: string;
    description: string;
    issues: number;
    members: number;
};

const initialProjects: Project[] = [
    {
        id: 1,
        name: "Smart Kanban",
        key: "SK",
        description: "Internal task and sprint management platform.",
        issues: 128,
        members: 6,
    },
    {
        id: 2,
        name: "Mobile App",
        key: "APP",
        description: "Customer facing mobile application.",
        issues: 54,
        members: 4,
    },
    {
        id: 3,
        name: "Infrastructure",
        key: "INF",
        description: "DevOps and cloud architecture management.",
        issues: 32,
        members: 3,
    },
];

export default function ProjectsPage() {
    const [projects] = useState(initialProjects);
    const [activeModal, setActiveModal] = useState<"create" | "edit" | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    function openCreate() {
        setSelectedProject(null);
        setActiveModal("create");
    }

    function openEdit(project: Project) {
        setSelectedProject(project);
        setActiveModal("edit");
    }

    function closeModal() {
        setActiveModal(null);
        setSelectedProject(null);
    }

    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <button className={styles.createBtn} onClick={openCreate}>
                    + Create Project
                </button>
            </div>

            <div className={styles.grid}>
                {projects.map(project => (
                    <div key={project.id} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.avatar}>{project.key}</div>
                            <div>
                                <h3>{project.name}</h3>
                                <span className={styles.key}>{project.key}</span>
                            </div>
                        </div>

                        <p className={styles.description}>{project.description}</p>

                        <div className={styles.stats}>
                            <div>
                                <strong>{project.issues}</strong>
                                <span>Issues</span>
                            </div>
                            <div>
                                <strong>{project.members}</strong>
                                <span>Members</span>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <button className={styles.openBtn}>Open Project</button>
                            <button
                                className={styles.editBtn}
                                onClick={() => openEdit(project)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {activeModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>
                            {activeModal === "create"
                                ? "Create Project"
                                : "Edit Project"}
                        </h2>

                        <input
                            placeholder="Project Name"
                            defaultValue={selectedProject?.name || ""}
                        />
                        <input
                            placeholder="Project Key"
                            defaultValue={selectedProject?.key || ""}
                        />
                        <textarea
                            placeholder="Description"
                            defaultValue={selectedProject?.description || ""}
                        />

                        <div className={styles.modalActions}>
                            <button onClick={closeModal} className={styles.cancelBtn}>
                                Cancel
                            </button>
                            <button onClick={closeModal} className={styles.confirmBtn}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
