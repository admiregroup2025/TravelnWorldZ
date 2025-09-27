import React from "react";
import { getUser } from "../utils/auth";

export default function SuperAdminDashboard() {
  const user = getUser();
  const name = user?.name || "Super Admin";
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Welcome, {name}</h1>
      <p className="text-gray-600 mb-8">Super Admin Control Panel</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">User Management</h2>
          <p className="text-sm text-gray-600 mb-4">Create, disable, and promote users.</p>
          <button className="px-3 py-2 text-sm bg-indigo-600 text-white rounded">Open</button>
        </section>

        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Reports</h2>
          <p className="text-sm text-gray-600 mb-4">View platform-wide metrics and health.</p>
          <button className="px-3 py-2 text-sm bg-indigo-600 text-white rounded">Open</button>
        </section>

        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Settings</h2>
          <p className="text-sm text-gray-600 mb-4">Global configuration and feature flags.</p>
          <button className="px-3 py-2 text-sm bg-indigo-600 text-white rounded">Open</button>
        </section>
      </div>
    </div>
  );
}


