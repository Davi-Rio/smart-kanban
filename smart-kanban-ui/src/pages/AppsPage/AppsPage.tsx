import { useState } from "react";
import styles from "./AppsPage.module.css";

type AppIntegration = {
    id: string;
    name: string;
    description: string;
    connected: boolean;
};

const initialApps: AppIntegration[] = [
    {
        id: "1",
        name: "GitHub",
        description: "Sync commits, pull requests and issues.",
        connected: true,
    },
    {
        id: "2",
        name: "Slack",
        description: "Receive notifications in your Slack channels.",
        connected: true,
    },
    {
        id: "3",
        name: "Figma",
        description: "Attach design files to tasks.",
        connected: false,
    },
    {
        id: "4",
        name: "Google Drive",
        description: "Attach documents and share files.",
        connected: false,
    },
];

export default function AppsPage() {
    const [apps, setApps] = useState(initialApps);

    function toggleConnection(id: string) {
        setApps(prev =>
            prev.map(app =>
                app.id === id
                    ? { ...app, connected: !app.connected }
                    : app
            )
        );
    }

    const connectedApps = apps.filter(a => a.connected);
    const availableApps = apps.filter(a => !a.connected);

    return (
        <div className={styles.container}>

            <div className={styles.section}>
                <h2>Connected Apps</h2>

                {connectedApps.length === 0 ? (
                    <div className={styles.empty}>
                        No connected apps yet.
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {connectedApps.map(app => (
                            <div key={app.id} className={styles.card}>
                                <div>
                                    <h3>{app.name}</h3>
                                    <p>{app.description}</p>
                                </div>

                                <button
                                    className={styles.disconnectBtn}
                                    onClick={() => toggleConnection(app.id)}
                                >
                                    Disconnect
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>


            <div className={styles.section}>
                <h2>Available Integrations</h2>

                <div className={styles.grid}>
                    {availableApps.map(app => (
                        <div key={app.id} className={styles.card}>
                            <div>
                                <h3>{app.name}</h3>
                                <p>{app.description}</p>
                            </div>

                            <button
                                className={styles.connectBtn}
                                onClick={() => toggleConnection(app.id)}
                            >
                                Connect
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
