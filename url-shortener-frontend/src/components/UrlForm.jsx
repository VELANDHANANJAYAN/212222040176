import { TextField, Button, Grid } from '@mui/material';
import React, { useState } from 'react';
export default function UrlForm({ onShorten }) {
  const [inputs, setInputs] = useState([{ url: '', validity: '', shortcode: '' }]);
  const handleChange = (i, field, value) => {
    const updated = [...inputs];
    updated[i][field] = value;
    setInputs(updated);
  };
  const addInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: '', validity: '', shortcode: '' }]);
    }
  };
  const handleSubmit = () => {
    onShorten(inputs);
  };
  return (
    <Grid container spacing={2} direction="column">
      {inputs.map((input, i) => (
        <Grid item xs={12} key={i}>
          <TextField
            label="Long URL"
            value={input.url}
            onChange={(e) => handleChange(i, 'url', e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Validity (minutes)"
            value={input.validity}
            onChange={(e) => handleChange(i, 'validity', e.target.value)}
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Custom Shortcode"
            value={input.shortcode}
            onChange={(e) => handleChange(i, 'shortcode', e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
      ))}
      <Button onClick={addInput}>Add More</Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Shorten URLs
      </Button>
    </Grid>
  );
}
