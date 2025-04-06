async function handleSubmit() {
  const fileInput = document.getElementById("fileInput");
  const promptInput = document.getElementById("promptInput");
  const output = document.getElementById("output");

  if (!fileInput.files.length || !promptInput.value) {
    alert("Envie um arquivo e escreva o prompt.");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = async () => {
    const base64 = reader.result.split(",")[1];
    const response = await fetch("SUA_URL_DA_WEBAPP_DO_APPS_SCRIPT", {
      method: "POST",
      headers: {
        "Content-Type": file.type
      },
      body: base64,
    });

    const data = await response.json();
    output.textContent = data.output || data.error || "Erro ao gerar criativo.";
  };
  reader.readAsDataURL(file);
}