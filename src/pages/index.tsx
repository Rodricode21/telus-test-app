import { Box, Button, SxProps, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getUser } from "@/services/getUser";
import Loading from "@/componentes/Loading";

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export default function Home() {
  const [user, setUser] = useState<User>();
  const [numberUser, setNumberUser] = useState(1);
  const [loading, SetLoading] = useState(false);

  const handleJumpUser = (direction: "next" | "previous") => {
    setNumberUser((prevNumber) => {
      if (direction === "next") {
        return prevNumber === 10 ? 1 : prevNumber + 1;
      } else {
        return prevNumber === 1 ? 10 : prevNumber - 1;
      }
    });
  };

  useEffect(() => {
    SetLoading(true);
    getUser(numberUser)
      .then((user) => {
        SetLoading(false);
        setUser(user);
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, [numberUser]);

  if (loading) return <Loading />;

  return (
    <Box sx={{ padding: 2 }}>
      {user ? (
        <Box sx={UserWrapper}>
          <Typography>ID: {user.id}</Typography>
          <Typography>Name: {user.name}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Phone: {user.phone}</Typography>
          <Typography>Username: {user.username}</Typography>
          <Typography>Website: {user.website}</Typography>
        </Box>
      ) : (
        <Typography>Loading user...</Typography>
      )}

      <Box sx={ButtonWrapper}>
        <Button onClick={() => handleJumpUser("previous")}>Previous</Button>
        <Button onClick={() => handleJumpUser("next")}>Next</Button>
      </Box>
    </Box>
  );
}

const UserWrapper: SxProps = {
  border: "1px solid gray",
  padding: "2px",
};

const ButtonWrapper: SxProps = {
  display: "flex",
  justifyContent: "center",
};
