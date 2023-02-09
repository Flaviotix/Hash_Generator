const express = require("express");
const app = express();
const crypto = require("crypto");
const fs = require("fs");
const algorithmes = ["MD5", "SHA256", "Keccak-512", "RipeMD160", "AES", "RSA"];
algorithmes.forEach((algo) => {
  app.get(`/${algo}`, (req, res) => {
    res.render(algo, { algorithme: algo });
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const file = form.elements.file.files[0];
  const text = form.elements.text.value;
  const input = file || text;

  if (!input) return;

  const data = new TextEncoder().encode(input);
  const hash = CryptoJS.SHA256(data).toString();
  result.textContent = "";
  result.textContent = hash;
  form.reset();
});
//Handle the form submissions for each algorithm
app.post("/hash/md5", (req, res) => {
  let input = req.body.input;
  let key = req.body.key || null;
  let result = null;

  // Hash the input using the MD5 algorithm
  if (key) {
    result = crypto
      .createHash("md5")
      .update(input + key)
      .digest("hex");
  } else {
    result = crypto.createHash("md5").update(input).digest("hex");
  }

  // Render the result page with the hashed output
  res.render("result", { algorithm: "MD5", result: result });
});

app.post("/hash/sha256", (req, res) => {
  let input = req.body.input;
  let key = req.body.key || null;
  let result = null;

  // Hash the input using the SHA256 algorithm
  if (key) {
    result = crypto
      .createHash("sha256")
      .update(input + key)
      .digest("hex");
  } else {
    result = crypto.createHash("sha256").update(input).digest("hex");
  }

  // Render the result page with the hashed output
  res.render("result", { algorithm: "SHA256", result: result });
});

// Similar code can be written for the other algorithms (Keccak-512, RipeMD160, AES, RSA)
app.post("/hash/keccak512", (req, res) => {
  let input = req.body.input;
  let key = req.body.key || null;
  let result = null;

  // Hash the input using the Keccak-512 algorithm
  if (key) {
    result = crypto
      .createHash("keccak512")
      .update(input + key)
      .digest("hex");
  } else {
    result = crypto.createHash("keccak512").update(input).digest("hex");
  }

  // Render the result page with the hashed output
  res.render("result", { algorithm: "Keccak-512", result: result });
});

app.post("/hash/ripemd160", (req, res) => {
  let input = req.body.input;
  let key = req.body.key || null;
  let result = null;

  // Hash the input using the RipeMD160 algorithm
  if (key) {
    result = crypto
      .createHash("ripemd160")
      .update(input + key)
      .digest("hex");
  } else {
    result = crypto.createHash("ripemd160").update(input).digest("hex");
  }

  // Render the result page with the hashed output
  res.render("result", { algorithm: "RipeMD160", result: result });
});

app.post("/encrypt/aes", (req, res) => {
  let input = req.body.input;
  let key = req.body.key;
  let result = null;

  // Encrypt the input using the AES algorithm
  let cipher = crypto.createCipher("aes-128-ecb", key);
  result = cipher.update(input, "utf8", "hex");
  result += cipher.final("hex");

  // Render the result page with the encrypted output
  res.render("result", { algorithm: "AES", result: result });
});

app.post("/encrypt/rsa", (req, res) => {
  let input = req.body.input;
  let key = req.body.key;
  let result = null;

  // Encrypt the input using the RSA algorithm
  let encrypt = crypto.publicEncrypt(key, Buffer.from(input, "utf8"));
  result = encrypt.toString("hex");

  // Render the result page with the encrypted output
  res.render("result", { algorithm: "RSA", result: result });
});

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/hash/file", upload.single("file"), (req, res) => {
  let file = req.file;
  let algorithm = req.body.algorithm;
  let key = req.body.key || null;
  let result = null;

  // Read the contents of the file
  let contents = fs.readFileSync(file.path, "utf8");

  // Hash the contents of the file using the specified algorithm
  switch (algorithm) {
    case "md5":
      if (key) {
        result = crypto
          .createHash("md5")
          .update(contents + key)
          .digest("hex");
      } else {
        result = crypto.createHash("md5").update(contents).digest("hex");
      }
      break;
    case "sha256":
      if (key) {
        result = crypto
          .createHash("sha256")
          .update(contents + key)
          .digest("hex");
      } else {
        result = crypto.createHash("sha256").update(contents).digest("hex");
      }
      break;
    case "keccak512":
      if (key) {
        result = crypto
          .createHash("keccak512")
          .update(contents + key)
          .digest("hex");
      } else {
        result = crypto.createHash("keccak512").update(contents).digest("hex");
      }
      break;
    case "ripemd160":
      if (key) {
        result = crypto
          .createHash("ripemd160")
          .update(contents + key)
          .digest("hex");
      } else {
        result = crypto.createHash("ripemd160").update(contents).digest("hex");
      }
      break;
    default:
      break;
  }

  // Render the result page with the hashed output
  res.render("result", { algorithm: algorithm, result: result });
});

app.listen(5500);
