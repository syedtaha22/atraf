'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  TextField,
  Box,
  Stack,
  Modal,
  Backdrop,
  Fade,
  CircularProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LanguageIcon from '@mui/icons-material/Language';
import BrushIcon from '@mui/icons-material/Brush';
import CampaignIcon from '@mui/icons-material/Campaign';

// Icons
function MountainIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"  // Ensures the stroke color can be inherited
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}  // Pass down props to allow `sx` usage
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export default function Page() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [responseMessage, setResponseMessage] = useState('');
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [privacyContent, setPrivacyContent] = useState('');
  const [termsContent, setTermsContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 200) {
        const data = await res.json();
        setResponseMessage(data.success);
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await res.json();
        setResponseMessage(errorData.error);
      }
    } catch (error) {
      setResponseMessage('An unexpected error occurred.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetch('/privacy-policy.txt')
      .then((res) => res.text())
      .then((text) => setPrivacyContent(text));
    fetch('/terms-of-service.txt')
      .then((res) => res.text())
      .then((text) => setTermsContent(text));
  }, []);

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f4f8', color: '#333', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ backgroundColor: '#e0f2f1' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" gap={2}>
            <MountainIcon style={{ color: '#1e3a8a' }} />
            <Typography variant="h6" fontWeight="bold" color="#1e3a8a">
              Atraf
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#1e3a8a', color: 'white' }}
              onClick={handleScrollToContact}
            >
              Contact Us
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center', backgroundColor: '#e0f2f1' }}>
        <Container>
          <Typography
            variant="h2"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, color: '#1e3a8a' }}
          >
            Atraf - Empowering Your Business with Websites, Logos, and Marketing
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: '#333' }}>
            Atraf specializes in creating visually compelling websites, crafting unique and memorable logos, and developing effective marketing strategies. Our mission is to empower your business by providing tailored solutions that drive engagement, build brand identity, and achieve your online goals. Explore how our comprehensive services can enhance your digital presence and help you stand out from the competition.
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#1e3a8a', color: 'white' }}
            onClick={handleScrollToContact}
            endIcon={<ArrowForwardIcon />}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
            <Box
              textAlign="center"
              sx={{
                backgroundColor: '#f9fafb',
                padding: '16px',
                borderRadius: '15px',
                flex: 1,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <LanguageIcon sx={{ fontSize: 44, color: '#1e3a8a' }} />
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Custom Websites
              </Typography>
              <Typography variant="body1" sx={{ color: '#333' }}>
                We design and develop bespoke websites tailored to your business needs. Our team ensures your website stands out with a unique and engaging design.
              </Typography>
            </Box>
            <Box
              textAlign="center"
              sx={{
                backgroundColor: '#f9fafb',
                padding: '16px',
                borderRadius: '15px',
                flex: 1,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <BrushIcon sx={{ fontSize: 44, color: '#1e3a8a' }} />
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Unique Logos
              </Typography>
              <Typography variant="body1" sx={{ color: '#333' }}>
                Our expert designers create logos that capture the essence of your brand. We focus on creating memorable and visually appealing logos that leave a lasting impression.
              </Typography>
            </Box>
            <Box
              textAlign="center"
              sx={{
                backgroundColor: '#f9fafb',
                padding: '16px',
                borderRadius: '15px',
                flex: 1,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <CampaignIcon sx={{ fontSize: 44, color: '#1e3a8a' }} />
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Effective Marketing
              </Typography>
              <Typography variant="body1" sx={{ color: '#333' }}>
                We craft targeted marketing campaigns that drive results. From digital advertising to social media strategies, we help you reach your audience and achieve your goals.
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box id="contact" sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#e0f2f1', color: '#333' }}>
        <Container maxWidth="sm">
          <Box display="flex" justifyContent="center">
            <Box width="100%">
              <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
                Contact Us
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: '#666' }} textAlign="center">
                We’d love to hear from you! Fill out the form below, and we’ll get back to you as soon as possible.
              </Typography>
              <Box component="form" display="grid" gap={3} onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="John Doe"
                  InputLabelProps={{ style: { color: '#333' } }}
                  InputProps={{
                    style: { color: '#333', borderColor: '#1e3a8a' },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#1e3a8a' },
                      '&:hover fieldset': { borderColor: '#1e3a8a' },
                      '&.Mui-focused fieldset': { borderColor: '#1e3a8a' },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="john.doe@example.com"
                  InputLabelProps={{ style: { color: '#333' } }}
                  InputProps={{
                    style: { color: '#333', borderColor: '#1e3a8a' },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#1e3a8a' },
                      '&:hover fieldset': { borderColor: '#1e3a8a' },
                      '&.Mui-focused fieldset': { borderColor: '#1e3a8a' },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={4}
                  placeholder="Your message..."
                  InputLabelProps={{ style: { color: '#333' } }}
                  InputProps={{
                    style: { color: '#333', borderColor: '#1e3a8a' },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#1e3a8a' },
                      '&:hover fieldset': { borderColor: '#1e3a8a' },
                      '&.Mui-focused fieldset': { borderColor: '#1e3a8a' },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#1e3a8a', color: 'white' }}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Submit'}
                </Button>
                <Typography variant="body2" sx={{ color: '#666', textAlign: 'center' }}>
                  {responseMessage}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 1, backgroundColor: '#ffffff', color: '#333' }}>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2">&copy; 2024 Atraf Private Limited. All rights reserved.</Typography>
            <Box display="flex" gap={2}>
              <Button onClick={() => setOpenPrivacy(true)} sx={{ color: '#1e3a8a' }}>
                Privacy Policy
              </Button>
              <Button onClick={() => setOpenTerms(true)} sx={{ color: '#1e3a8a' }}>
                Terms of Service
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Modals for Privacy Policy and Terms of Service */}

      <Modal
        open={openPrivacy}
        onClose={() => setOpenPrivacy(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={openPrivacy}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: 600,
              maxHeight: '80vh',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography variant="h6" component="h2">
              Privacy Policy
            </Typography>
            <Typography variant="body2" component="div" sx={{ whiteSpace: 'pre-wrap', color: 'text.primary' }}>
              {privacyContent}
            </Typography>
          </Box>
        </Fade>
      </Modal>

      <Modal
        open={openTerms}
        onClose={() => setOpenTerms(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={openTerms}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: 600,
              maxHeight: '80vh',
              bgcolor: 'background.paper',
              boxShadow: 24,
              // p: 4,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              // gap: 2,
            }}
          >
            <Typography variant="h6" component="h2">
              Terms of Service
            </Typography>
            <Typography variant="body2" component="div" sx={{ whiteSpace: 'pre-wrap', color: 'text.primary' }}>
              {termsContent}
            </Typography>
          </Box>
        </Fade>
      </Modal>


    </div>
  );
}
