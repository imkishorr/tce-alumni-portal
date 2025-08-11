import React from 'react';
import {
  Container,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Fade,
  Grow,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const tceBlue = '#003366';
const tceLightBlue = '#4a6baf';
const tceAccent = '#ff6b6b';
const tceGradient = `linear-gradient(135deg, ${tceBlue} 0%, ${tceLightBlue} 100%)`;

const data = {
  images: [
    { 
      src: '/assets/placement-building.jpg', 
      alt: 'TCE Campus Placement Center',
      caption: 'Our students receiving placement offers'
    }
  ],
  headings: ['Placement Statistics'],
  tables: [
    {
      title: 'Annual Placement Reports',
      headers: ['S.No', 'Year', 'Download'],
      rows: [
        [{ text: '1' }, { text: '2024 - 2025' }, { href: '/assets/Placement-Statistics-2024-25.pdf' }],
        [{ text: '2' }, { text: '2023 - 2024' }, { href: '/assets/Placement-Details-2023-24.pdf' }],
        [{ text: '3' }, { text: '2022 - 2023' }, { href: '/assets/Placement-Details-2022-23.pdf' }],
        [{ text: '4' }, { text: '2021 - 2022' }, { href: '/assets/Placement-Details-2021-22.pdf' }],
        [{ text: '5' }, { text: '2020 - 2021' }, { href: '/assets/Placement-Details-2020-21.pdf' }],
        [{ text: '6' }, { text: '2019 - 2020' }, { href: '/assets/Placement-Details-s-2019-20.pdf' }],
        [{ text: '7' }, { text: '2018 - 2019' }, { href: '/assets/Placement-Details-2018-2019.pdf' }],
      ]
    },
    {
      title: 'Detailed Placement Data',
      headers: ['S.No', 'Year', 'No. of Offers', 'No. of Students Placed', 'Download'],
      rows: [
        [{ text: '1' }, { text: '2018 - 2019' }, { text: '619' }, { text: '711' }, { href: '/assets/Placement-Data-2018-2019.pdf' }],
        [{ text: '2' }, { text: '2017 - 2018' }, { text: '584' }, { text: '823' }, { href: '/assets/Placement-Data-2017-2018.pdf' }],
        [{ text: '3' }, { text: '2016 - 2017' }, { text: '652' }, { text: '1117' }, { href: '/assets/Placement-Data-2016-17.pdf' }],
        [{ text: '4' }, { text: '2015 - 2016' }, { text: '730' }, { text: '1588' }, { href: '/assets/Placement-Data-2015-16.pdf' }],
        [{ text: '5' }, { text: '2014 - 2015' }, { text: '684' }, { text: '784' }, { href: '/assets/Placement-Data-2014-15.pdf' }],
        [{ text: '6' }, { text: '2013 - 2014' }, { text: '607' }, { text: '759' }, { text: '-' }],
        [{ text: '7' }, { text: '2012 - 2013' }, { text: '680' }, { text: '894' }, { text: '-' }],
      ]
    }
  ]
};

const renderCell = (cell) => {
  if (!cell) return '-';
  if (cell.href) {
    return (
      <Button
        component={motion.div}
        variant="contained"
        size="small"
        onClick={() => window.open(cell.href, '_blank')}
        sx={{
          background: tceGradient,
          color: 'white',
          borderRadius: '20px',
          textTransform: 'none',
          boxShadow: '0 2px 10px rgba(0,51,102,0.2)',
          minWidth: 100,
          '&:hover': {
            boxShadow: '0 4px 14px rgba(0,51,102,0.4)',
          }
        }}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        Download
      </Button>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {cell.text ?? '-'}
    </motion.div>
  );
};

const FloatingBubble = ({ size, left, top, delay, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.15, 0],
      scale: [0.5, 1, 1.2],
      y: [0, -100],
      x: [0, Math.random() * 40 - 20]
    }}
    transition={{
      duration: 15 + Math.random() * 10,
      delay,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "linear"
    }}
    style={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, rgba(74,107,175,0) 70%)`,
      left: `${left}%`,
      top: `${top}%`,
      zIndex: -1
    }}
  />
);

const PlacementStatistics = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/assets/tce-logo.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: isMobile ? '80%' : '50%',
          opacity: 0.03,
          zIndex: -1
        }
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating bubbles background */}
      {[...Array(12)].map((_, i) => (
        <FloatingBubble
          key={i}
          size={`${30 + Math.random() * 70}px`}
          left={Math.random() * 100}
          top={Math.random() * 100}
          delay={Math.random() * 3}
          color={i % 2 === 0 ? tceLightBlue : tceBlue}
        />
      ))}

      {/* Animated floating element */}
      <Box
        component={motion.div}
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 8 + Math.random() * 4, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
        sx={{
          position: 'absolute',
          top: '12%',
          left: '6%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${tceLightBlue} 0%, ${tceBlue} 100%)`,
          opacity: 0.1,
          zIndex: -1,
          filter: 'blur(2px)'
        }}
      />

      {/* Main heading */}
      <Fade in timeout={600}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant={isMobile ? "h4" : "h3"}
            sx={{
              mb: 2,
              fontWeight: '700',
              background: tceGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '50%',
                height: 4,
                background: tceAccent,
                borderRadius: 2
              }
            }}
            component={motion.div}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Placement Statistics
          </Typography>
        </Box>
      </Fade>

      {/* Enhanced Image with Slower, More Pronounced Zoom */}
      <AnimatePresence>
        {data.images.map((img, i) => (
          <Grow in timeout={500 + (i * 100)} key={i}>
            <Box 
              sx={{ 
                mb: 4, 
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0,51,102,0.1)',
                height: isMobile ? '250px' : '400px',
                '&:hover .placement-image': {
                  transform: 'scale(1.1)'
                }
              }}
              component={motion.div}
              whileHover="hover"
            >
              <motion.img
                className="placement-image"
                src={img.src}
                alt={img.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.1,
                  transition: {
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }}
              />
              {img.caption && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '12px',
                    textAlign: 'center',
                    pointerEvents: 'none'
                  }}
                >
                  <Typography variant="body2">{img.caption}</Typography>
                </motion.div>
              )}
            </Box>
          </Grow>
        ))}
      </AnimatePresence>

      {/* Tables with enhanced animations */}
      {data.tables.map((tbl, idx) => (
        <Grow in timeout={700 + (idx * 150)} key={idx}>
          <Box
            sx={{
              mb: 6,
              overflow: 'hidden',
              borderRadius: 3,
              boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
              backgroundColor: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.3)',
              p: 1
            }}
            component={motion.div}
            whileHover={{ 
              boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
              y: -4
            }}
          >
            {tbl.title && (
              <Typography 
                variant="h5" 
                sx={{ 
                  p: 2, 
                  color: tceBlue,
                  fontWeight: '600'
                }}
              >
                {tbl.title}
              </Typography>
            )}
            <Table size={isMobile ? 'small' : 'medium'}>
              <TableHead>
                <TableRow 
                  sx={{ 
                    background: tceGradient,
                    '& th': {
                      color: 'white',
                      fontWeight: '700',
                      fontSize: isMobile ? '0.875rem' : '1rem'
                    }
                  }}
                  component={motion.tr}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {(tbl.headers || []).map((h, i) => (
                    <TableCell
                      key={i}
                      align={i === 0 ? 'center' : 'left'}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {(tbl.rows || []).map((r, rIdx) => (
                  <TableRow
                    key={rIdx}
                    sx={{
                      '&:nth-of-type(odd)': { backgroundColor: 'rgba(0,51,102,0.03)' },
                      '&:hover': { backgroundColor: 'rgba(0,51,102,0.05)' }
                    }}
                    component={motion.tr}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: rIdx * 0.05 }}
                  >
                    {r.map((c, cIdx) => (
                      <TableCell 
                        key={cIdx} 
                        align={cIdx === 0 ? 'center' : 'left'}
                        sx={{
                          fontSize: isMobile ? '0.875rem' : '1rem',
                          py: isMobile ? 1 : 1.5
                        }}
                      >
                        {renderCell(c)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Grow>
      ))}
    </Container>
  );
};

export default PlacementStatistics;
