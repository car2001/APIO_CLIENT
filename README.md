# Apio Detection - Detección de Plagas de la Mosca Minadora

## Descripción

**Apio Detection** es una aplicación web desarrollada en React que permite a los usuarios cargar imágenes de apios y detectar la presencia de plagas, específicamente la mosca minadora (Liriomyza spp.). La aplicación utiliza un modelo de detección de objetos basado en YOLOv5 para identificar y clasificar las plagas en las imágenes.

## Características

- Carga de imágenes desde el sistema local.
- Detección de imágenes en tiempo real de la mosca minadora en apios.
- Visualización de resultados con cuadros delimitadores que indican la ubicación de las plagas detectadas.
- Interfaz de usuario amigable y fácil de usar.

## Tecnologías Utilizadas

- [React](https://reactjs.org/) - Biblioteca de JavaScript para construir interfaces de usuario.
- [YOLOv5](https://github.com/ultralytics/yolov5) - Modelo de detección de objetos de alta precisión.
- [Node.js](https://nodejs.org/) - Entorno de ejecución para JavaScript en el lado del servidor (si se utiliza para el backend).
- [Express](https://expressjs.com/) - Framework web para Node.js (si se utiliza para el backend).

## Requisitos

Antes de ejecutar la aplicación, asegúrate de tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/) (v14 o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)

## Instalación

1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu_usuario/apio-detection.git
