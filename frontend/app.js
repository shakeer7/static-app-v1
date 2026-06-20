import React, { useState } from "react";
import { getUploadUrl } from "./api";

function App() {

  const [file, setFile] = useState(null);

  const uploadFile = async () => {

    if (!file) return;

    const uploadUrl = await getUploadUrl(file.name);

    await fetch(uploadUrl, {
      method: "PUT",
      body: file
    });

    alert("Upload Successful");
  };

  return (
    <div>
      <h1>AWS DevOps Capstone</h1>

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button onClick={uploadFile}>
        Upload Image
      </button>
    </div>
  );
}

export default App;
