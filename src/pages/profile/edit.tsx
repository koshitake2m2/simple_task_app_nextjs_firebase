import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "ui/components/atoms/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { getMaybeCurrentUser, signInWithEmailAndPassword } from "usecase/auth";
import {
  NewUser,
  NotAuthenticatedUser,
  UnregisteredUser,
  User,
} from "domain/user";
import { dependencies } from "di/dependencies";
import Header from "ui/components/molecules/Header";

const ProfileCreate: NextPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [maybeUser, setMaybeUser] = useState<
    User | UnregisteredUser | NotAuthenticatedUser | undefined
  >(undefined);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getMaybeCurrentUser()
      .then((maybeCurrentUser) => {
        if (maybeCurrentUser instanceof NotAuthenticatedUser) {
          router.push("/login");
        }
        if (maybeCurrentUser instanceof UnregisteredUser) {
          router.push("/profile/create");
        }
        setMaybeUser(maybeCurrentUser);
      })
      .then(() => setLoading(false));
  }, [router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!(maybeUser instanceof User)) return;

    const maybeName = data.get("name")?.toString();

    if (maybeName == undefined) {
      console.log(`no name`);
    } else {
      const user = new User({
        id: maybeUser.id,
        email: maybeUser.email,
        name: maybeName,
        role: maybeUser.role,
      });
      console.log(user);
      dependencies.userRepository
        .update(user)
        .then(() => {
          router.push("/profile");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  };

  /**
   * JSX
   */

  if (isLoading || maybeUser == undefined) return <p>Loading...</p>;
  if (maybeUser instanceof UnregisteredUser || maybeUser instanceof NotAuthenticatedUser) {
    console.log(new Error("Unexpected"));
    return <><p>Unexpected</p></>;
  }

  return (
    <>
      <Header></Header>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <p>Email: {maybeUser.email}</p>
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="text"
              id="name"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ProfileCreate;
