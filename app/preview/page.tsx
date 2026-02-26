import PascoaSuccess from "@/app/pascoa/PascoaSuccess";

export default function PreviewPage() {
  return (
    <PascoaSuccess
      qrId={999}
      base="POA"
      preview={true}
    />
  );
}