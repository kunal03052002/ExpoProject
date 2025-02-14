
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { Dialog, DialogContent, CircularProgress, Typography, Box,Stack, DialogContentText } from "@mui/material";

export default function WebLayout() {
  const router = useRouter();


  return (
    // <Dialog aria-labelledby="loading-dialog" maxWidth="xs" fullWidth>
  <DialogContent>
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        height="100%"
        minHeight="200px" 
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
  </DialogContent>
  // </Dialog>
  

  )
}
