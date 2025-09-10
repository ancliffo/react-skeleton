import { Routes, Route } from 'react-router-dom';
import { Nav } from './Nav';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Demo from './pages/demo';
import '@mantine/core/styles.css';
import { Box, Container, MantineProvider } from '@mantine/core';
import { ColorSchemeProvider, useColorScheme } from './assets/contexts/ColorSchemeContext';

export default function App() {
  return (
    <ColorSchemeProvider>
      <AppWithTheme />
    </ColorSchemeProvider>
  );
}

function AppWithTheme() {
  const { colorScheme } = useColorScheme();
  return (
    <MantineProvider theme={{ colorScheme } as any}>
      <Container
        style={{
          display: 'grid',
          gridTemplateColumns: 'min-content auto',
          minHeight: '100vh',
        }}
      >
        <Box>
          <Nav />
        </Box>
        <Box p="md">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/demo" element={<Demo />} />
          </Routes>
        </Box>
      </Container>
    </MantineProvider>
  );
}
