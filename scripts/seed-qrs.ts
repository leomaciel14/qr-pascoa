import admin from "firebase-admin";
import { readFileSync } from "fs";
import { nanoid } from "nanoid";

// 🔐 serviceAccount.json (NUNCA subir isso pro git)
const serviceAccount = JSON.parse(
  readFileSync("./serviceAccount.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

type Base = "POA" | "CANOAS" | "SL";

function getBaseById(id: number): Base {
  if (id < 50) return "POA";
  if (id < 100) return "CANOAS";
  return "SL";
}

async function seed() {
  const batch = db.batch();

  for (let i = 0; i < 150; i++) {
    const token = nanoid(16); // 🔐 token aleatório forte

    const ref = db.collection("qrs").doc(token);
    // 👆 docId já é o token (lookup rápido e seguro)

    batch.set(ref, {
      id: i,
      token,
      base: getBaseById(i),
      used: false,
      usedAt: null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  await batch.commit();
  console.log("✅ 300 QR Codes criados com token seguro");
}

seed().catch(console.error);
