import { useState } from "react";
import styles from "./SettingsPage.module.css";

type ModalType =
  | "general"
  | "members"
  | "issues"
  | "integrations"
  | "notifications"
  | "danger"
  | null;

export default function SettingsPage() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className={styles.container}>

      <div className={styles.grid}>
        <Card title="General" desc="Project name, key and description" onClick={() => setActiveModal("general")} label="Edit" />
        <Card title="Members" desc="Manage team members and permissions" onClick={() => setActiveModal("members")} label="Manage" />
        <Card title="Issue Types" desc="Configure issue types and workflows" onClick={() => setActiveModal("issues")} label="Configure" />
        <Card title="Integrations" desc="Connect external tools and services" onClick={() => setActiveModal("integrations")} label="Setup" />
        <Card title="Notifications" desc="Email alerts and automation rules" onClick={() => setActiveModal("notifications")} label="Adjust" />
        <Card title="Danger Zone" desc="Delete project or transfer ownership" onClick={() => setActiveModal("danger")} label="Delete Project" danger />
      </div>

      {activeModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            
            {activeModal === "general" && (
              <ModalLayout
                title="General Settings"
                onClose={closeModal}
              >
                <div className={styles.formGroup}>
                  <label>Project Name</label>
                  <input defaultValue="Smart Kanban" />
                </div>

                <div className={styles.formGroup}>
                  <label>Project Key</label>
                  <input defaultValue="SK" />
                </div>

                <div className={styles.formGroup}>
                  <label>Description</label>
                  <textarea defaultValue="Internal project management tool" />
                </div>
              </ModalLayout>
            )}

            {activeModal === "members" && (
              <ModalLayout title="Manage Members" onClose={closeModal}>
                <div className={styles.memberList}>
                  <div className={styles.memberItem}>Davi <span>Admin</span></div>
                  <div className={styles.memberItem}>John <span>Developer</span></div>
                  <div className={styles.memberItem}>Anna <span>QA</span></div>
                </div>

                <button className={styles.btnPrimary}>Invite Member</button>
              </ModalLayout>
            )}

            {activeModal === "issues" && (
              <ModalLayout title="Issue Types" onClose={closeModal}>
                <div className={styles.memberList}>
                  <div className={styles.memberItem}>Bug</div>
                  <div className={styles.memberItem}>Task</div>
                  <div className={styles.memberItem}>Story</div>
                </div>

                <button className={styles.btnPrimary}>Add Issue Type</button>
              </ModalLayout>
            )}

            {activeModal === "integrations" && (
              <ModalLayout title="Integrations" onClose={closeModal}>
                <div className={styles.integrationRow}>
                  <span>GitHub</span>
                  <button className={styles.btnPrimary}>Connect</button>
                </div>

                <div className={styles.integrationRow}>
                  <span>Slack</span>
                  <button className={styles.btnPrimary}>Connect</button>
                </div>
              </ModalLayout>
            )}

            {activeModal === "notifications" && (
              <ModalLayout title="Notifications" onClose={closeModal}>
                <div className={styles.toggleRow}>
                  <span>Email Alerts</span>
                  <input type="checkbox" defaultChecked />
                </div>

                <div className={styles.toggleRow}>
                  <span>Automation Rules</span>
                  <input type="checkbox" />
                </div>
              </ModalLayout>
            )}

            {activeModal === "danger" && (
              <ModalLayout
                title="Delete Project"
                onClose={closeModal}
                danger
              >
                <p>This action cannot be undone.</p>
                <input placeholder="Type DELETE to confirm" />
              </ModalLayout>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

function ModalLayout({
  title,
  children,
  onClose,
  danger,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  danger?: boolean;
}) {
  return (
    <>
      <div className={styles.modalHeader}>
        <h2 style={danger ? { color: "#ef4444" } : {}}>
          {title}
        </h2>
      </div>

      <div className={styles.modalContent}>
        {children}
      </div>

      <div className={styles.modalFooter}>
        <button
          className={styles.btnSecondary}
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          className={`${styles.btnPrimary} ${danger ? styles.danger : ""}`}
          onClick={onClose}
        >
          {danger ? "Permanently Delete" : "Save Changes"}
        </button>
      </div>
    </>
  );
}

function Card({
  title,
  desc,
  label,
  onClick,
  danger,
}: {
  title: string;
  desc: string;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <div className={styles.card}>
      <div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <button
        className={`${styles.btn} ${danger ? styles.danger : ""}`}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}
