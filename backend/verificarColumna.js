const generateReport = require("./exportador/generateReport");

module.exports = async (req, res) => {
  try {
    const buffer = await generateReport(req.body);
    res.set({
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": "attachment; filename=Informe-Columna.docx"
    });
    res.send(buffer);
  } catch (err) {
    res.status(500).send("Error generando el informe");
  }
};
