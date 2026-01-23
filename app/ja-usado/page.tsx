export default function JaUsado() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-red-950">
      <div className="flex flex-col justify-center items-center bg-white p-8 rounded-xl text-black">
        <h1 className="text-2xl font-bold p-2">😕 QR já utilizado</h1>
        <p>Esse QR Code já foi lido anteriormente.</p>
      </div>
    </main>
  );
}
