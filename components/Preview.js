import React from "react";
import {
  Card,
  Box,
  Container,
  AppBar,
  Typography,
  Toolbar,
  Paper
} from "@material-ui/core";

import "/src/styles.css";

export default props => {
  return (
    <Container maxWidth="md">
      <Box boxShadow={3}>
        <Card>
          <AppBar position="static" color="secondary">
            <Toolbar>
              <Typography variant="h6" component="h2">
                Vista previa
              </Typography>
            </Toolbar>
          </AppBar>
          <Paper>
            <Container>
              <div
                id="preview"
                dangerouslySetInnerHTML={{ __html: props.preview }}
              />
            </Container>
          </Paper>
        </Card>
      </Box>
    </Container>
  );
};
