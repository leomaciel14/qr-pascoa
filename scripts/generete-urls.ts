import admin from "firebase-admin";
import { readFileSync, writeFileSync } from "fs";

const serviceAccount = JSON.parse(
  readFileSync("./serviceAccount.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function exportQrs() {
  const snap = await db.collection("qrs").get();

  let csv = "id,base,token,url\n";

  snap.docs.forEach(doc => {
    const data = doc.data();
    const token = doc.id;

    const url = `https://qr-pascoa.vercel.app/pascoa?t=${token}`;

    csv += `${data.id},${data.base},${token},${url}\n`;
  });

  writeFileSync("qrs.csv", csv, "utf8");
  console.log("✅ CSV gerado com sucesso: qrs.csv");
}

exportQrs().catch(console.error);
