import React, { useState } from "react";

const SettingsPanel = ({ user, onUpdateSettings }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = () => {
    onUpdateSettings({ name, email });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <h3 className="font-semibold">Settings</h3>
      <div>
        <label className="block text-sm">Name</label>
        <input
          className="border rounded p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm">Email</label>
        <input
          className="border rounded p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-orange-500 text-white rounded-lg"
      >
        Save
      </button>
    </div>
  );
};

export default SettingsPanel;
