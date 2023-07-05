import React from "react";
import NavBar from "../../../components/NavBar";
import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { RadioButtonUncheckedOutlined } from "@mui/icons-material";

const Adicionar = () => {
  return (
    <>
      <NavBar />
      <Grid container m="2rem" width="unset">
        <Grid item xs={12}>
          <Typography fontSize={28}>Adicione um novo evento</Typography>
        </Grid>
        <Grid item xs={4} height={200}>
          <List>
            <ListItem>
              <Button variant="contained">Dados básicos</Button>
            </ListItem>
            <ListItem>
              <Button variant="contained">Programa</Button>
            </ListItem>
            <ListItem>
              <Button variant="contained">Imagens</Button>
            </ListItem>
            <ListItem>
              <Button variant="contained">Dados básicos</Button>
            </ListItem>
          </List>
        </Grid>
        <Divider orientation="vertical" />
        <Grid item xs={8} height={200}></Grid>
      </Grid>
    </>
  );
};

export default Adicionar;
