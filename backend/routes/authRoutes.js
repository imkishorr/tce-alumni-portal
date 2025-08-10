const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.post('/verify', async (req, res) => {
  try {
    const { idToken } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    if (!decodedToken.email.endsWith('@student.tce.edu')) {
      return res.status(403).json({ 
        success: false,
        message: 'Only TCE student emails are allowed'
      });
    }

    res.json({ 
      success: true,
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name || decodedToken.email.split('@')[0]
      }
    });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ 
      success: false,
      message: 'Authentication failed'
    });
  }
});

module.exports = router;