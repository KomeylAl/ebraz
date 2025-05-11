import Navbar from "./Navbar";

export default function Sidebar() {
  return (
    <div className="hidden fixed right-0 top-0 w-80 h-screen bg-white dark:bg-gray-900 p-8 border-l border-gray-300 dark:border-gray-700 lg:flex flex-col justify-between">
      <h1 className="text-2xl font-bold text-right">کلینیک ابراز</h1>
      <Navbar />
      <p>ebraz-admin</p>
    </div>
  );
}
