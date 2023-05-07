import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { dependencies } from "di/dependencies";
import { NotAuthenticatedUser, UnregisteredUser, User } from "domain/user";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Header from "ui/components/molecules/Header";
import { getMaybeCurrentUser } from "usecase/auth";

const Profile: NextPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [idToken, setIdToken] = useState<string | undefined>(undefined);
  const [maybeUser, setMaybeUser] = useState<
    User | UnregisteredUser | NotAuthenticatedUser | undefined
  >(undefined);

  useEffect(() => {
    setLoading(true);
    getMaybeCurrentUser()
      .then((maybeCurrentUser) => setMaybeUser(maybeCurrentUser))
      .then(() => dependencies.userRepository.findIdToken())
      .then((t) => setIdToken(t))
      .then(() => setLoading(false));
  }, []);

  if (isLoading || maybeUser == undefined) return <p>Loading...</p>;
  if (maybeUser instanceof NotAuthenticatedUser)
    return (
      <>
        <Header></Header>
        <Container>
          <p>Not authenticated...</p>
          <p>Please create profile.</p>
        </Container>
      </>
    );
  if (maybeUser instanceof UnregisteredUser)
    return (
      <>
        <Header></Header>
        <Container>
          <p>Not registered</p>
          <p>email: {maybeUser.email}</p>
        </Container>
      </>
    );
  const user = maybeUser;

  return (
    <>
      <Header></Header>
      <Container component="main">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <p>name: {user.name}</p>
          <p>email: {user.email}</p>
          <p>idToken: {idToken ?? ""}</p>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
