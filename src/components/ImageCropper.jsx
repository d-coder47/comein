import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import Cropper from "react-easy-crop";

const ImageCropper = ({
  image,
  handleSaveMinimizedImage,
  isOpened,
  handleClose,
  ...props
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  return (
    <Dialog open={isOpened} maxWidth="sm" fullWidth>
      <DialogTitle>Recortar Imagem</DialogTitle>
      <DialogTitle sx={{ padding: "0 24px 8px 24px" }} fontSize="1rem">
        Este recorte será utilizado para a apresentação do seu cartaz na página
        inicial e na página do seu perfil.
      </DialogTitle>
      <DialogTitle sx={{ padding: "0 24px 8px 24px" }} fontSize="1rem">
        A dimensão original da imagem será mantida.
      </DialogTitle>

      <DialogContent>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 300,
            background: "#333",
          }}
        >
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={16 / 9}
            onCropChange={setCrop}
            onCropComplete={(_, croppedAreaPixels) => {
              setCroppedAreaPixels(croppedAreaPixels);
            }}
            onZoomChange={setZoom}
            {...props}
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClose}
          sx={{ textTransform: "unset" }}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "unset",
          }}
          onClick={() => handleSaveMinimizedImage(croppedAreaPixels)}
        >
          Guardar Recorte
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropper;
