import React from "react";
import {
  Card,
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  AppBar,
  Toolbar
} from "@material-ui/core";

export default props => {
  return (
    <Container maxWidth="md">
      <Box boxShadow={2} mb="2rem">
        <Paper>
          <Card>
            <AppBar position="static" color="secondary">
              <Toolbar>
                <Typography variant="h6" component="h2">
                  Editor
                </Typography>
              </Toolbar>
            </AppBar>
            <Container>
              <TextField
                id="editor"
                label="Markdown previewer"
                variant="outlined"
                color="secondary"
                margin="dense"
                type="text"
                value={props.defaultText}
                multiline={true}
                onChange={e => {
                  props.onChangePreview(e.target.value);
                }}
                placeholder="Escribe una entrada."
                fullWidth={true}
              />
            </Container>
          </Card>
        </Paper>
      </Box>
    </Container>
  );
};
