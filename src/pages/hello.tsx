import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import { HelloData } from "./api/hello";

const Sample: NextPage = () => {
  type Person = {
    name: string;
  };
  const [person, setPerson] = useState<Person | undefined>(undefined);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch("api/hello")
      .then((res) => res.json())
      .then((data: HelloData) => {
        const person = {
          name: data.name,
        };
        setPerson(person);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!person) return <p>No profile data</p>;

  return (
    <>
      <Container component="main" maxWidth="xs">
        <h1>Hello</h1>
        <p>person name: {person.name}</p>
      </Container>
    </>
  );
};

export default Sample;
