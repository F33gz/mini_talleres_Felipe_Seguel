<script setup>
import { ref } from "vue";

const nombre = ref('');
const nivel = ref('');
const grade1 = ref(0);
const grade2 = ref(0);
const grade3 = ref(0);
const grade4 = ref(0);
const grade5 = ref(0);
const grade6 = ref(0);
const promedio = ref(0);

const agregar = async () => {
  try {
    const response = await fetch('http://localhost:3000/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nombre.value,
        level: nivel.value,
        grade1: parseFloat(grade1.value),
        grade2: parseFloat(grade2.value),
        grade3: parseFloat(grade3.value),
        grade4: parseFloat(grade4.value),
        grade5: parseFloat(grade5.value),
        grade6: parseFloat(grade6.value)
      })
    });
    if (response.ok) {
      console.log('Alumno agregado correctamente');
      // Asegúrate de definir obtenerAlumnos() si lo estás usando
    } else {
      throw new Error('Error al agregar alumno: ' + response.status);
    }
  } catch (error) {
    console.error(error);
  }
};

const calcular = () => {
  promedio.value = (
      parseFloat(grade1.value) * 0.2 +
      parseFloat(grade2.value) * 0.2 +
      parseFloat(grade3.value) * 0.2 +
      parseFloat(grade4.value) * 0.2 +
      parseFloat(grade5.value) * 0.1 +
      parseFloat(grade6.value) * 0.1
  );
  console.log(`El promedio es: ${promedio.value}`);
};
</script>

<template>
  <div>
    <input v-model="nombre" placeholder="Nombre del Alumno" />
    <input v-model="nivel" placeholder="Nivel" />
    <div class="notas">
      <label>Nota 1</label>
      <input v-model.number="grade1" placeholder="Nota 1" />
      <label>Nota 2</label>
      <input v-model.number="grade2" placeholder="Nota 2" />
      <label>Nota 3</label>
      <input v-model.number="grade3" placeholder="Nota 3" />
      <label>Nota 4</label>
      <input v-model.number="grade4" placeholder="Nota 4" />
      <label>Nota 5</label>
      <input v-model.number="grade5" placeholder="Nota 5" />
      <label>Nota 6</label>
      <input v-model.number="grade6" placeholder="Nota 6" />
    </div>
    <button @click="agregarAlumno">Agregar Alumno</button>
  </div>
</template>


<style scoped>
input {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin: 5px 0;
  width: 100%;
  box-sizing: border-box;
}

.notas {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 10px 0;
}

label {
  display: block;
  margin: 10px 0 5px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
  width: 100%;
}

button:hover {
  background-color: #45a049;
}
</style>


