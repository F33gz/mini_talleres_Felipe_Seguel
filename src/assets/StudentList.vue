<script setup>
import { ref, onMounted } from 'vue';

const selectedStudentId = ref('');
const student = ref(null);
const students = ref([]);
const aprobados = ref([]);

const calcularPromedio = (student) => {
  if (!student) return 0;
  return (
      student.grade1 * 0.2 +
      student.grade2 * 0.2 +
      student.grade3 * 0.2 +
      student.grade4 * 0.2 +
      student.grade5 * 0.1 +
      student.grade6 * 0.1
  );
}

const obtenerAlumnos = async () => {
  try {
    const response = await fetch('http://localhost:3000/students');
    if (response.ok) {
      students.value = await response.json();
    } else {
      throw new Error('Error al obtener estudiantes: ' + response.status);
    }
  } catch (error) {
    console.error(error);
  }
}

const obtenerAprobados = () => {
  aprobados.value = students.value.filter(student => {
    const promedio = calcularPromedio(student);
    return promedio >= 4.0;
  });
}

const obtenerAlumno = async () => {
  try {
    const response = await fetch(`http://localhost:3000/students/${selectedStudentId.value}`);
    if (response.ok) {
      student.value = await response.json();
    } else {
      throw new Error('Error al obtener la nota del alumno: ' + response.status);
    }
  } catch (error) {
    console.error(error);
  }
}

const eliminarAlumno = async () => {
  try {
    const response = await fetch(`http://localhost:3000/students/${selectedStudentId.value}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      console.log('Alumno eliminado correctamente');
      await obtenerAlumnos();
    } else {
      throw new Error('Error al eliminar alumno: ' + response.status);
    }
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  obtenerAlumnos();
});
</script>

<template>
  <div>
    <select v-model="selectedStudentId">
      <option v-for="student in students" :key="student.id" :value="student.id">
        {{ student.name }}
      </option>
    </select>
    <button @click="obtenerAlumno">Obtener Alumno</button>
    <button @click="eliminarAlumno">Eliminar Alumno</button>

    <span v-if="student">
      Nombre: {{ student.name }} - Promedio: {{ calcularPromedio(student) }}
    </span>

    <ul v-if="student">
      <li>
        Nota 1: {{ student.grade1 }}
        Nota 2: {{ student.grade2 }}
        Nota 3: {{ student.grade3 }}
        Nota 4: {{ student.grade4 }}
        Nota 5: {{ student.grade5 }}
        Nota 6: {{ student.grade6 }}
      </li>
    </ul>

    <h3>Lista de Estudiantes:</h3>
    <ul>
      <li v-for="student in students" :key="student.id">
        {{ student.name }} - Promedio: {{ calcularPromedio(student) }}
      </li>
    </ul>

    <button @click="obtenerAprobados">Obtener Estudiantes Aprobados</button>

    <h3>Estudiantes Aprobados:</h3>
    <ul>
      <li v-for="aprobado in aprobados" :key="aprobado.id">
        {{ aprobado.name }} - Promedio: {{ calcularPromedio(aprobado) }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
h3 {
  margin-top: 20px;
}

select {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin: 5px 0;
  width: auto;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
  margin: 10px 0;
  width: 100%;
}

button:hover {
  background-color: #45a049;
}

span {
  display: block;
  margin: 10px 0;
  color: #333;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: #fff;
  border: 1px solid #ddd;
  margin: 5px 0;
  padding: 10px;
  border-radius: 4px;
  color: #333;
}
</style>

