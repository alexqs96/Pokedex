# Pokedex Challenge

Realizar un listado de pokemons en forma de galería.

Utilizar un estado global para el manejo de la data, se recomienda Redux o Context.

Cada pokemon debe ser plasmado en una card la cual deberá contar con los siguientes datos: Name, Image, Weight y Abilities.

Debe contar con dos inputs para realizar el filtrado de pokemons, uno que me permita buscar según su nombre y otro que me permita filtrar por una o más habilidades. (Se puede realizar en un único input si lo desea).

Debe contar con un selector múltiple que te permita eliminar uno o varios pokemons. (Esto debe ser simulado de manera local ya que la api solo permite peticiones de tipo GET). 

## Desarrollado con 

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

## Funcionalidades

- #### Buscador de Pokemons - Habilidades
- #### Borrado y Restauración de Pokemons
- #### Filtrado de Pokemons por tipo
- #### Paginado
- #### Carga y Lectura de manera Local
- #### Diseño Adaptativo para cualquier plataforma.

## Instalación

```sh
cd pokedex
npm i
npm run dev
```