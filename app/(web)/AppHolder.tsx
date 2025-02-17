/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  IconButton,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Modal,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AppsIcon from "@mui/icons-material/Apps";
import SettingIcon from "@mui/icons-material/SettingsApplications";
import NotificationsIcon from "@mui/icons-material/CircleNotifications";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { LayoutsList } from "../../data";
import { useRouter } from "expo-router";

const AppHolder: FC = () => {
  
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [newAppName, setNewAppName] = useState("");
  const [newAppIcon, setNewAppIcon] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);

  // const userData = JSON.parse(sessionStorage.getItem("user")).data;
  // console.log(userData);
  const router = useRouter();
  useEffect(() => {
    axios.get(`${"http://52.183.132.161/backend"}/api/apps`).then((listResponse) => {
      setList(listResponse.data);
    });
  }, []);

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const filteredList = list.filter((item:any) =>
    item.app_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const editHandler = (itemId: any) => {
    const editedList = list.find((e: any) => e.id === itemId);
    console.log("editedList >>", editedList)
    // localStorage.setItem("pageConfig", JSON.stringify(editedList.config));
    // navigate(`/builder/${editedList.app_name}`);
    router.push("/App");
  };
const deleteHandler = (itemId :any) => {
  // axios.delete(`"http://52.183.132.161/backend"/api/apps/${itemId}`).then(() => {
  //  const filterList = list.filter((e)=>{
  //   return e.id != itemId
  //  })
  //  setList(filterList)
  // });
};
  const handleNew = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewAppName("");
    // setNewAppIcon(null);
  };

  const handleSubmit = async () => {
    const newApp = {
      app_name: newAppName,
      icon_name: newAppIcon,
      config: LayoutsList.none,
    };
    try {
      const postData: any = await axios.post(
        `${"http://52.183.132.161/backend"}/api/apps`,
        newApp
      );
      // localStorage.setItem("pageConfig", JSON.stringify(postData.data.config));
      // navigate(`/builder/${postData.data.app_name}`);
      router.push(`/builder/${postData.data.app_name}`);
    } catch (er) {
      console.log(er);
    }
    handleCloseModal();
  };

  const handleIconChange = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const imageUrlData = await axios.post(
        `${"http://52.183.132.161/backend"}/api/uploads/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setNewAppIcon(
        `${"http://52.183.132.161/backend"}/api/uploads/image/${imageUrlData.data.id}`
      );
    } catch (err) {
      console.log(err);
    }
    const previewUrl = URL.createObjectURL(file);
    setIconPreview(previewUrl);
  };

  return (
    <Box
      sx={{
        // padding: "20px",
        maxWidth: "1200px",
        // margin: "20px auto",
        // backgroundColor: "#f8f9fa",
        background: "#f5f7f7",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: "20%",
          paddingLeft: "0px",
          backgroundColor: "#f5f7f7",
          paddingTop: "40px",
        }}
      >
        {/* User Profile */}
        <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Avatar
              sx={{ width: 60, height: 60, marginBottom: "10px" }}
              alt="User Profile"
              // src="/path/to/user/profile.jpg"
            >
              {/* {userData.user_name[0]} */}
            </Avatar>
          </Box>
          <Box component={"div"} sx={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
              {/* {userData.user_name} */}
            </Typography>
          </Box>
          <Box component={"div"} sx={{ textAlign: "center" }}>
            <Typography
              sx={{ fontSize: "10px" }}
              variant="body2"
              color="textSecondary"
            >
              {/* {userData.email} */}
            </Typography>
          </Box>
        </Box>

        {/* Menu */}
        <Box sx={{ marginBottom: "20px" }}>
          <List>
            <ListItem
              sx={{
                marginBottom: "-10px",
                color: "#0fafaf", // Primary color
                "&:hover": { color: "#0fafaf" },
              }}
            >
              <AppsIcon
                sx={{ fontSize: "20px", marginLeft: "5px", marginRight: "8px" }}
              />
              <ListItemText sx={{ fontSize: "16px" }} primary="Application" />
            </ListItem>
            <ListItem sx={{ marginBottom: "-10px" }}>
              <SettingIcon
                sx={{ fontSize: "20px", marginLeft: "5px", marginRight: "8px" }}
              />
              <ListItemText sx={{ fontSize: "16px" }} primary="Settings" />
            </ListItem>
            <ListItem sx={{ marginBottom: "-10px" }}>
              <NotificationsIcon
                sx={{ fontSize: "20px", marginLeft: "5px", marginRight: "8px" }}
              />
              <ListItemText sx={{ fontSize: "16px" }} primary="Notifications" />
            </ListItem>
            <ListItem sx={{ marginBottom: "-10px" }}>
              <AssignmentIndIcon
                sx={{ fontSize: "20px", marginLeft: "5px", marginRight: "8px" }}
              />
              <ListItemText sx={{ fontSize: "16px" }} primary="Proile" />
            </ListItem>
          </List>
        </Box>

        {/* Company About Section */}
        <Box
          sx={{
            padding: "10px",
            borderRadius: "8px",
            marginTop: "80px",
          }}
        >
          <Typography variant="body1" sx={{ marginBottom: "2px" }}>
            About Our Company
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Empowering Leading Banking & Financial Institutions With 360 Degrees
            Business Automation Solutions!
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: "80%",
          background: "white",
          marginTop: "20px",
          marginRight: "20px",
          padding: "24px",
          paddingTop: "36px",
          borderRadius: "20px",
          boxShadow: "1px 1px 2px white",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontWeight: 600, fontSize: "24px", width: "60%" }}>
            Apps
          </div>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            sx={{
              flex: 1,
              marginRight: "10px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#0fafaf", // Primary color
                },
                "&:hover fieldset": {
                  borderColor: "#0fafaf", // Primary color
                },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleNew}
            sx={{
              backgroundColor: "#0fafaf", // Primary color
              "&:hover": { backgroundColor: "#0c8c8c" }, // Darker shade on hover
            }}
          >
            New
          </Button>
        </Box>

        <Grid container spacing={2}>
          {filteredList.map((item:any, index) => (
            <Grid
              sx={{ padding: "1px" }}
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
            >
              <Card
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  height: "100px",
                  padding: "none",
                  boxShadow: "2px 1px 2px 2px 6px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#333",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.app_name}
                  </Typography>
                  <Box
                    sx={{
                      justifyContent: "center",
                      dispaly: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div>
                      <IconButton
                        color="primary"
                        onClick={() => editHandler(item.id)}
                        sx={{
                          color: "#0fafaf", // Primary color
                          "&:hover": { color: "#0c8c8c" }, // Darker shade on hover
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </div>
                    <div>
                      <IconButton
                        color="error"
                        onClick={() => deleteHandler(item.id)}
                        sx={{
                          // color: "#0fafaf", // Primary color
                          // "&:hover": { color: "#0c8c8c" }, // Darker shade on hover
                        }}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </div>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {filteredList.length === 0 && (
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              textAlign: "center",
              marginTop: "20px",
              color: "#0fafaf", // Primary color
              "&:hover": { color: "#0fafaf" },
            }}
          >
            No apps found. Try searching with a different term or add a new app.
          </Typography>
        )}
      </Box>

      {/* Modal for Adding New App */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
            margin: "50px auto",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Add New App
          </Typography>
          <TextField
            label="App Name"
            variant="outlined"
            size="small"
            value={newAppName}
            onChange={(e) => setNewAppName(e.target.value)}
            sx={{ marginBottom: "10px" }}
          />
          <Button
            variant="outlined"
            color="primary"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{
              marginBottom: "20px",
              borderColor: "#0fafaf",
              color: "#0fafaf",
            }}
          >
            Upload App Icon
            <input
              type="file"
              accept="image/*"
              onChange={handleIconChange}
              hidden
            />
          </Button>
          {iconPreview && (
            <Box sx={{ marginBottom: "20px", textAlign: "center" }}>
              <img
                src={iconPreview}
                alt="App Icon Preview"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "contain",
                }}
              />
            </Box>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              alignSelf: "flex-start",
              backgroundColor: "#0fafaf", // Primary color
              "&:hover": { backgroundColor: "#0c8c8c" },
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AppHolder;
