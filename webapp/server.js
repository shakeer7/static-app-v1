const express = require("express");
const AWS = require("aws-sdk");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

const s3 = new AWS.S3({
  region: "ap-south-1"
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy"
  });
});

app.get("/api/presigned-url", async (req, res) => {
  try {
    const { fileName, contentType } = req.query;

    if (!fileName || !contentType) {
      return res.status(400).json({
        message: "fileName and contentType are required"
      });
    }

    const key = `uploads/${Date.now()}-${fileName}`;

    const params = {
      Bucket: "unipiper-bucket-unique-name",
      Key: key,
      ContentType: contentType,
      Expires: 300
    };

    const uploadUrl = await s3.getSignedUrlPromise(
      "putObject",
      params
    );

    res.status(200).json({
      uploadUrl,
      fileKey: key
    });

  } catch (error) {
    console.error("Error generating presigned URL:", error);

    res.status(500).json({
      message: "Failed to generate upload URL",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
