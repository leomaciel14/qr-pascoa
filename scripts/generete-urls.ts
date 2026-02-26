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

  let csv = "id,base,token,url,@image\n";

  snap.docs.forEach(doc => {
    const data = doc.data();
    const token = doc.id;

    const shortToken = token.slice(0, 6);

    const url = `https://qr-pascoa.vercel.app/pascoa?t=${token}`;
    const imagePath = `C:\\Users\\leonardo.maciel\\Desktop\\Pascoa\\qr-pascoa\\qrcodes\\png\\qr_${data.id}_${data.base}_${shortToken}.png`;

    csv += `${data.id},${data.base},${token},${url},${imagePath}\n`;
  });

  writeFileSync("qrs.csv", csv, "utf8");
  console.log("✅ CSV gerado com sucesso: qrs.csv");
}

exportQrs().catch(console.error);
