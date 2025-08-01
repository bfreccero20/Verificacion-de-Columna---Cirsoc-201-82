module.exports = async (req, res) => {
  try {
    const buffer = await generateReport(req.body);
    res.set({
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": "attachment; filename=Informe-Columna.docx"
    });
    res.send(buffer);
  } catch (err) {
    console.error("❌ Error generando el informe:", err);  // 👈 Agregá esto
    res.status(500).send("Error generando el informe");
  }
};
