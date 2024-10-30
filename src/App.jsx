import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Typography, TextField, Button, AppBar, Toolbar, FormControl } from '@mui/material';
import { WbSunny, NightsStay } from '@mui/icons-material';

const App = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [imagePath, setImagePath] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

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
            setImageUrl(URL.createObjectURL(file)); // Crear URL para mostrar la imagen
        } else {
            setImagePath('');
            setImageUrl('');
        }
    };

    const handleSubmit = () => {
        if (imageFile) {
            console.log({ imageFile });
        } else {
            alert('Por favor, selecciona una imagen.');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6">Apio Detection</Typography> {/* Título actualizado */}
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
                            readOnly: true, // Hacer el input de solo lectura
                        }}
                        style={{ flexGrow: 1 }} // Para que el TextField ocupe el espacio restante
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }} // Oculta el input file
                        id="file-upload"
                    />
                    <label htmlFor="file-upload">
                        <Button variant="outlined" component="span" color="primary" style={{ marginLeft: '10px' }}>
                            Subir imagen
                        </Button>
                    </label>
                </FormControl>

                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Enviar
                </Button>

                {/* Mostrar la imagen seleccionada */}
                {imageUrl && (
                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                        <Typography variant="h6">Imagen seleccionada:</Typography>
                        <img src={imageUrl} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '0.5rem' }} />
                    </div>
                )}
            </Container>
        </ThemeProvider>
    );
};

export default App;
