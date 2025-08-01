
import React, { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    proyecto: '',
    empresa: '',
    resistenciaHormigon: '',
    resistenciaAcero: '',
    coefMayCarga: '',
    excentricidad: '',
    numeroColumna: '',
    largo: '',
    ancho: '',
    alto: '',
    recubrimiento: '',
    momentoX: '',
    momentoY: '',
    coefPandeo: '',
    cargaAxial: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensaje('Procesando...');

    try {
      const response = await fetch("https://cirsoc-backend.onrender.com/api/verificar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Error en el servidor");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Informe-Columna.docx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setMensaje("✅ Informe generado correctamente");
    } catch (error) {
      setMensaje("❌ Error al generar el informe");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Verificador de Columnas CIRSOC 201-82</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        {[
          { label: "Nombre del Proyecto", name: "proyecto" },
          { label: "Nombre de la Empresa", name: "empresa" },
          { label: "Resistencia del Hormigón (MPa)", name: "resistenciaHormigon" },
          { label: "Resistencia del Acero (MPa)", name: "resistenciaAcero" },
          { label: "Coeficiente de Mayoración de Cargas", name: "coefMayCarga" },
          { label: "Excentricidad (cm)", name: "excentricidad" },
          { label: "Número de Columna", name: "numeroColumna" },
          { label: "Largo (cm)", name: "largo" },
          { label: "Ancho (cm)", name: "ancho" },
          { label: "Alto (cm)", name: "alto" },
          { label: "Recubrimiento (cm)", name: "recubrimiento" },
          { label: "Momento en X (kg·cm)", name: "momentoX" },
          { label: "Momento en Y (kg·cm)", name: "momentoY" },
          { label: "Coeficiente de Pandeo", name: "coefPandeo" },
          { label: "Carga Axial (kg)", name: "cargaAxial" }
        ].map(({ label, name }) => (
          <label key={name}>
            {label}
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.2rem" }}
            />
          </label>
        ))}
        <button type="submit" disabled={enviando} style={{ padding: "0.75rem", fontWeight: "bold" }}>
          {enviando ? "Generando..." : "Generar Informe"}
        </button>
      </form>
      <p style={{ marginTop: "1rem" }}>{mensaje}</p>
    </div>
  );
}
