import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Typography, TextField, Button, AppBar, Toolbar, FormControl, CircularProgress } from '@mui/material';
import { WbSunny, NightsStay } from '@mui/icons-material';
import axios from 'axios';

const App = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [imagePath, setImagePath] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [responseImageUrl, setResponseImageUrl] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [canvasVisible, setCanvasVisible] = useState(false);
    const [loading, setLoading] = useState(false); // State to manage loading

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: '#42b883',
            },
        },
    });

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagePath(file.name);
            setImageFile(file);
            setImageUrl(URL.createObjectURL(file));
            setResponseImageUrl(''); // Clear previous response image
            setCanvasVisible(false); // Hide canvas until the image is processed
        } else {
            setImagePath('');
            setImageUrl('');
        }
    };

    const handleSubmit = async () => {
        if (imageFile) {
            const base64String = await getBase64fromFile(imageFile);
            const api_key = "L5zWZFeAMpeoIgt3j3AZ"; // Tu clave de API

            setLoading(true); // Start loading

            try {
                const response = await axios({
                    method: "POST",
                    url: "https://detect.roboflow.com/yolov8-01/1",
                    params: {
                        api_key: api_key,
                        format: "image",
                        confidence: "40",
                        overlap: "30",
                        labels: "on",
                        stroke: "2"
                    },
                    data: base64String,
                    headers: {
                        "responseType": 'image/jpeg',
                    },
                    responseType: 'arraybuffer',
                });

                const arrayBufferView = new Uint8Array(response.data);
                const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
                const base64image = window.URL.createObjectURL(blob);
                setResponseImageUrl(base64image);
                setCanvasVisible(true); // Show canvas after receiving response
                setImageUrl(''); // Hide selected image
            } catch (error) {
                console.error('Error al enviar la imagen:', error);
                setResponseMessage('Error al enviar la imagen');
            } finally {
                setLoading(false); // Stop loading
            }
        } else {
            alert('Por favor, selecciona una imagen.');
        }
    };

    const getBase64fromFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6">Apio Detection</Typography>
                    <Button
                        color="inherit"
                        onClick={toggleDarkMode}
                        style={{ marginLeft: 'auto' }}
                    >
                        {darkMode ? <WbSunny /> : <NightsStay />}
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
                <FormControl fullWidth variant="outlined" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <TextField
                        value={imagePath}
                        label="Ruta de la imagen"
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                        style={{ flexGrow: 1 }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        id="file-upload"
                    />
                    <label htmlFor="file-upload">
                        <Button variant="outlined" component="span" color="primary" style={{ marginLeft: '10px' }}>
                            Subir imagen
                        </Button>
                    </label>
                </FormControl>

                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Enviar'}
                </Button>

                {/* Mostrar la imagen seleccionada antes de enviar */}
                {imageUrl && (
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <Typography variant="h6">Imagen seleccionada:</Typography>
                        <img
                            src={imageUrl}
                            alt="Vista previa"
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                )}
            </Container>

            {/* Mostrar la imagen de respuesta en un canvas */}
            {canvasVisible && responseImageUrl && (
                <div style={{ margin: '2rem', textAlign: 'center' }}>
                    <Typography variant="h6">Imagen de respuesta:</Typography>
                    <canvas
                        id="responseCanvas"
                        style={{
                            border: '1px solid #ccc',
                            margin: '1rem',
                            maxWidth: '100%', // Ajustar el tamaño máximo
                            height: 'auto', // Mantener la relación de aspecto
                        }}
                    />
                    <img
                        src={responseImageUrl}
                        alt="Respuesta"
                        style={{ display: 'none' }} // Ocultar imagen, solo usar canvas
                        onLoad={(e) => {
                            const canvas = document.getElementById('responseCanvas');
                            const context = canvas.getContext('2d');
                            canvas.width = e.target.width;
                            canvas.height = e.target.height;
                            context.drawImage(e.target, 0, 0);
                        }}
                    />
                </div>
            )}

            {/* Mostrar la respuesta del API */}
            {responseMessage && (
                <div style={{ marginTop: '20px' }}>
                    <Typography variant="h6">Respuesta de Roboflow:</Typography>
                    <pre>{JSON.stringify(responseMessage, null, 2)}</pre>
                </div>
            )}
        </ThemeProvider>
    );
};

export default App;
