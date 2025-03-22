import React, { useState } from "react";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme CSS
import "primereact/resources/primereact.min.css"; // PrimeReact CSS
import "primeicons/primeicons.css"; // PrimeIcons CSS

const AboutUs = () => {
  const [text, setText] = useState("");

  // Save button click handler
  const handleSave = () => {
    console.log("Saved Text:", text);
    alert("Text saved successfully!");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-xl font-semibold mb-4">About Us</h1>
      <Editor
        placeholder="Type here..."
        value={text}
        onTextChange={(e) => setText(e.htmlValue)}
        style={{ height: "320px" }}
      />
    <div className="flex items-center justify-end">
    <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-secondary text-[16px] text-white rounded "
      >
        Save
      </button>
    </div>
    </div>
  );
};

export default AboutUs;
