import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
